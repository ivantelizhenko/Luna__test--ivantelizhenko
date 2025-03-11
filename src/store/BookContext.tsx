import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  BooksContextValue,
  AppState,
  BooksContextProviderProps,
  Book,
} from './BookContextType';
import {
  addBook as addBookApi,
  deleteBook,
  getBooks,
  updateBook,
  updateBookStatus,
} from '../services/booksAPI';
import { toggleBookStatus as toggleBookStatusHelper } from '../utils/helpers';

const BooksContext = createContext<BooksContextValue | null>(null);

const initialState: AppState = {
  books: [],
  page: 'dashboard',
  formStatus: 'add',
  editingBook: null,
};

function booksReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'books/loaded': {
      return {
        ...state,
        books: action.payload,
      };
    }
    case 'book/add': {
      return {
        ...state,
        books: [...state.books, action.payload],
        page: 'dashboard',
      };
    }
    case 'book/remove': {
      return {
        ...state,
        books: [...state.books.filter(book => book.id !== action.payload)],
      };
    }
    case 'book/edit': {
      const editedBooks: Book[] = state.books.map(book =>
        book.id === action.payload.id ? action.payload : book
      );
      return {
        ...state,
        books: editedBooks,
      };
    }
    case 'book/toggleStatus': {
      const editedBooks: Book[] = state.books.map(book =>
        book.id === action.payload
          ? {
              ...book,
              status: toggleBookStatusHelper(book.status),
            }
          : book
      );
      return {
        ...state,
        books: editedBooks,
      };
    }
    case 'editingBook/set': {
      return {
        ...state,
        editingBook: state.books.find(book => book.id === action.payload)!,
      };
    }
    case 'editingBook/clear': {
      return {
        ...state,
        editingBook: null,
      };
    }
    case 'form/addStatus': {
      return {
        ...state,
        formStatus: 'add',
      };
    }
    case 'form/editStatus': {
      return {
        ...state,
        formStatus: 'edit',
      };
    }

    case 'page/toDashboard': {
      return { ...state, page: 'dashboard' };
    }
    case 'page/toForm': {
      return { ...state, page: 'form' };
    }

    default:
      throw new Error('Unknown action type');
  }
}

function BooksProvider({ children }: BooksContextProviderProps) {
  const [booksState, dispatch] = useReducer(booksReducer, initialState);

  useEffect(() => {
    async function get() {
      try {
        const books = await getBooks();

        dispatch({ type: 'books/loaded', payload: books });
      } catch (err) {
        console.error(err);
      }
    }

    get();
  }, []);

  const ctx: BooksContextValue = {
    ...booksState,
    async addBook(newBook) {
      dispatch({ type: 'book/add', payload: newBook });
      await addBookApi(newBook);
    },
    async removeBook(id) {
      dispatch({ type: 'book/remove', payload: id });
      await deleteBook(id);
    },
    async editBook(editedBook) {
      dispatch({ type: 'book/edit', payload: editedBook });
      await updateBook(editedBook.id, editedBook);
    },
    async toggleBookStatus(id, newStatus) {
      dispatch({ type: 'book/toggleStatus', payload: id });
      await updateBookStatus(id, newStatus);
    },
    setEditingBook(id: string) {
      dispatch({ type: 'editingBook/set', payload: id });
    },
    clearEditingBook() {
      dispatch({ type: 'editingBook/clear' });
    },
    setAddFormStatus() {
      dispatch({ type: 'form/addStatus' });
    },
    setEditFormStatus() {
      dispatch({ type: 'form/editStatus' });
    },
    toDashboard() {
      dispatch({ type: 'page/toDashboard' });
    },
    toForm() {
      dispatch({ type: 'page/toForm' });
    },
  };

  return <BooksContext.Provider value={ctx}>{children}</BooksContext.Provider>;
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error('BooksContext was used outside of the BooksProvider');

  return context as BooksContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooksProvider, useBooks };
