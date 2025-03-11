import { FilterValues } from '../components/Dashboard/DashboardTypes';
import { BookStatus } from '../store/BookContext/BooksContextType';

export function toggleBookStatus(status: BookStatus): BookStatus {
  return status === BookStatus.Active
    ? BookStatus.Deactivated
    : BookStatus.Active;
}

export const filterToBookStatusMap = {
  [FilterValues.ShowActive]: BookStatus.Active,
  [FilterValues.ShowDeactive]: BookStatus.Deactivated,
};
