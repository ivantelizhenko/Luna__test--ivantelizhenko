import { ReactNode } from 'react';

export interface Book {
  title: string;
  author: string;
  category: 'Fiction' | 'Non-Fiction' | 'Science';
  createdAt: string;
  modifiedAt?: string;
  isbn: number;
  id: string;
  status: BookStatus;
}

export enum BookStatus {
  Deactivated = 'deactivated',
  Active = 'active',
}

export type AppState = {
  books: Book[];
  page: 'dashboard' | 'form';
};

export type BooksContextValue = AppState & {
  addBook: (newBook: Book) => void;
  removeBook: (id: string) => void;
  toggleBookStatus: (id: string, newStatus: BookStatus) => void;
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
  payload: string;
};
type toggleBookStatusAction = {
  type: 'book/toggleStatus';
  payload: string;
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
  | toggleBookStatusAction
  | toDashboardAction
  | toFormAction;
