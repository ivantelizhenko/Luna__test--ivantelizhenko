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

export type BookState = {
  books: Book[];
  editingBook: Book | null;
};

export type BooksContextValue = BookState & {
  addBook: (newBook: Book) => void;
  removeBook: (id: string) => void;
  editBook: (editedBook: Book) => void;
  toggleBookStatus: (id: string, newStatus: BookStatus) => void;
  setEditingBook: (id: string) => void;
  clearEditingBook: () => void;
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

type editBookAction = {
  type: 'book/edit';
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
type editingBookSetAction = {
  type: 'editingBook/set';
  payload: string;
};
type editingBookClearAction = {
  type: 'editingBook/clear';
};

export type Action =
  | isBooksLoadedAction
  | addBookAction
  | editBookAction
  | removeBookAction
  | toggleBookStatusAction
  | editingBookSetAction
  | editingBookClearAction;
