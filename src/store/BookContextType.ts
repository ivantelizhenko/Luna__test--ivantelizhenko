import { ReactNode } from 'react';

export interface Book {
  title: string;
  author: string;
  category: 'Fiction' | 'Non-Fiction' | 'Science';
  isbn: number;
  id: string;
}

export type AppState = {
  books: Book[];
};

export type BooksContextValue = AppState & {
  addBook: (newBook: Book) => void;
  removeBook: (isbn: number) => void;
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

export type Action = isBooksLoadedAction | addBookAction | removeBookAction;
