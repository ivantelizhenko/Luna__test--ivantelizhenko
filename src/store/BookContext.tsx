import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  BooksContextValue,
  AppState,
  BooksContextProviderProps,
} from './BookContextType';
import { addBook as addBookApi, getBooks } from '../services/booksAPI';

const BooksContext = createContext<BooksContextValue | null>(null);

const initialState: AppState = {
  books: [],
  page: 'dashboard',
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
        books: [...state.books.filter(book => book.isbn !== action.payload)],
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
    addBook(newBook) {
      dispatch({ type: 'book/add', payload: newBook });
      async function add() {
        await addBookApi(newBook);
      }
      add();
    },
    removeBook(isbn) {
      dispatch({ type: 'book/remove', payload: isbn });
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
