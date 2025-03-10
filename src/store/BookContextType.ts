import { ReactNode } from 'react';

export interface Book {
  title: string;
  author: string;
  category: 'Fiction' | 'Non-Fiction' | 'Science';
  createdAt: string;
  modifiedAt?: string;
  isbn: number;
  id: string;
}

export type AppState = {
  books: Book[];
  page: 'dashboard' | 'form';
};

export type BooksContextValue = AppState & {
  addBook: (newBook: Book) => void;
  removeBook: (isbn: number) => void;
  toDashboard: () => void;
  toForm: () => void;
};

export type BooksContextProviderProps = {
  children: ReactNode;
};

type isBooksLoadedAction = {
  type: 'books/loaded';
  payload: Book[];
};

type addBookAction = {
  type: 'book/add';
  payload: Book;
};

type removeBookAction = {
  type: 'book/remove';
  payload: number;
};

type toDashboardAction = {
  type: 'page/toDashboard';
};
type toFormAction = {
  type: 'page/toForm';
};

export type Action =
  | isBooksLoadedAction
  | addBookAction
  | removeBookAction
  | toDashboardAction
  | toFormAction;
