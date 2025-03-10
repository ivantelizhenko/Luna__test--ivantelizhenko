import styled from 'styled-components';
import { useBooks } from '../store/BookContext';

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
`;

function Table() {
  const { books } = useBooks();

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
        {books.map(
          ({ title, author, id, category, isbn, createdAt, modifiedAt }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{author}</td>
              <td>{category}</td>
              <td>{isbn}</td>
              <td>today</td>
              <td>today</td>
              <ActionContainer>
                <TableButton>Edit</TableButton>
                <TableButton>Delete</TableButton>
                <TableButton>Deactivate</TableButton>
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
