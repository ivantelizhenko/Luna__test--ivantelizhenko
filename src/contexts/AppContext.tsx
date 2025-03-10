import { createContext, useContext, useReducer } from 'react';
import {
  Action,
  AppContextValue,
  AppState,
  BooksContextProviderProps,
} from './AppContextType';

const BooksContext = createContext<AppContextValue | null>(null);

const initialState: AppState = {
  isLoading: false,
  books: [],
};

function booksReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'loading': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'books/loaded': {
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };
    }
    case 'book/add': {
      return {
        ...state,
        isLoading: false,
        books: [...state.books, action.payload],
      };
    }
    case 'book/remove': {
      return {
        ...state,
        isLoading: false,
        books: [...state.books.filter(book => book.isbn !== action.payload)],
      };
    }

    default:
      throw new Error('Unknown action type');
  }
}

function BooksProvider({ children }: BooksContextProviderProps) {
  const [booksState, dispatch] = useReducer(booksReducer, initialState);

  const ctx: AppContextValue = {
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

  return context as AppContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { BooksProvider, useBooks };
