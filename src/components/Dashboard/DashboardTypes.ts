import { BookStatus } from '../../store/BookContext/BooksContextType';

export enum FilterValues {
  ShowAll = 'all',
  ShowActive = BookStatus.Active,
  ShowDeactive = BookStatus.Deactivated,
}
