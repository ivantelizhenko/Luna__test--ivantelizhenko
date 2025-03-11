import styled from 'styled-components';
import { useBooks } from '../../store/BookContext/BooksContext';
import { Book, BookStatus } from '../../store/BookContext/BooksContextType';
import { toggleBookStatus as toggleBookStatusHelper } from '../../utils/helpers';
import { usePage } from '../../store/PageContext/PageContext';
import { useForm } from '../../store/FormContext/FormContext';
import { FilterValues } from './DashboardTypes';

const StyledTable = styled.table<{ centering?: boolean }>`
  width: 100%;
  border-collapse: collapse;

  & thead {
    position: sticky;
    top: -2.4rem;
  }

  & th,
  & td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  & th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

const ActionContainer = styled.td`
  display: flex;
  gap: 1.2rem;
`;

const TableButton = styled.button`
  padding: 8px 12px;
  white-space: nowrap;

  &:last-of-type {
    width: 100%;
  }
`;

type TableProps = {
  filter: FilterValues;
};

const filterToBookStatusMap = {
  [FilterValues.ShowActive]: BookStatus.Active,
  [FilterValues.ShowDeactive]: BookStatus.Deactivated,
};

function Table({ filter }: TableProps) {
  const { books, toggleBookStatus, removeBook, setEditingBook } = useBooks();
  const { setPageFormStatus } = usePage();
  const { setFormEditStatus } = useForm();
  const filteredBooks =
    filter === FilterValues.ShowAll
      ? books
      : books.filter(book => book.status === filterToBookStatusMap[filter]);

  function handleEditBook(id: string) {
    setEditingBook(id);
    setFormEditStatus();
    setPageFormStatus();
  }

  function handleDeleteBook(id: string) {
    removeBook(id);
  }

  function handleToggleBookStatus(id: string, status: BookStatus) {
    toggleBookStatus(id, toggleBookStatusHelper(status));
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created at</th>
          <th>Modified at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(filteredBooks as Book[]).map(
          ({
            title,
            author,
            id,
            category,
            isbn,
            createdAt,
            modifiedAt,
            status,
          }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{author}</td>
              <td>{category}</td>
              <td>{isbn}</td>
              <td>{createdAt}</td>
              <td>{modifiedAt || '-'}</td>
              <ActionContainer>
                <TableButton onClick={() => handleEditBook(id)}>
                  Edit
                </TableButton>
                <TableButton
                  onClick={() => handleDeleteBook(id)}
                  disabled={status === BookStatus.Active}
                >
                  Delete
                </TableButton>
                <TableButton onClick={() => handleToggleBookStatus(id, status)}>
                  {status === BookStatus.Active ? 'Deactivate' : 'Re-Activate'}
                </TableButton>
              </ActionContainer>
            </tr>
          )
        )}
      </tbody>
    </StyledTable>
  );
}

export default Table;

// Book title;
// Author name;
// Category;
// ISBN;
// Created At (datetime format should follow pattern: 12 March 2022, 8:35AM)
// Modified/Edited At

{
  /* <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody style={style.tableBody}>
      {sortedContacts.map((contact) => 
        <tr key={contact.id}>
          <td style={style.tableCell}>{contact.userFirstname}</td>
          <td style={style.tableCell}>{contact.userLastname}</td>
          <td style={style.tableCell}>{contact.userPhone}</td>
        </tr>
      )}
      </tbody>
    </table> */
}
