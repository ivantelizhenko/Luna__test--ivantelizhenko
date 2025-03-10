import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  BooksContextValue,
  AppState,
  BooksContextProviderProps,
} from './BookContextType';
import { getBooks } from '../services/getBooks';

const BooksContext = createContext<BooksContextValue | null>(null);

const initialState: AppState = {
  books: [],
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
      };
    }
    case 'book/remove': {
      return {
        ...state,
        books: [...state.books.filter(book => book.isbn !== action.payload)],
      };
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
        console.log(books);
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
    },
    removeBook(isbn) {
      dispatch({ type: 'book/remove', payload: isbn });
    },
  };

  return <BooksContext.Provider value={ctx}>{children}</BooksContext.Provider>;
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error('BooksContext was used outside of the BooksProvider');

  console.log('i work');
  return context as BooksContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooksProvider, useBooks };
