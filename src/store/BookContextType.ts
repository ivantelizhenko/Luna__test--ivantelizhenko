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
  formStatus: 'add' | 'edit';
  editingBook: Book | null;
};

export type BooksContextValue = AppState & {
  addBook: (newBook: Book) => void;
  removeBook: (id: string) => void;
  editBook: (editedBook: Book) => void;
  toggleBookStatus: (id: string, newStatus: BookStatus) => void;
  setEditingBook: (id: string) => void;
  clearEditingBook: () => void;
  setAddFormStatus: () => void;
  setEditFormStatus: () => void;
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

type setFormAdd = {
  type: 'form/addStatus';
};

type setFormEdit = {
  type: 'form/editStatus';
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
  | editBookAction
  | removeBookAction
  | toggleBookStatusAction
  | editingBookSetAction
  | editingBookClearAction
  | setFormAdd
  | setFormEdit
  | toDashboardAction
  | toFormAction;
