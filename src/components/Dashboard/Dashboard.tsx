import styled from 'styled-components';
import Table from './Table';
import { useBooks } from '../../store/BookContext';

const StyledDashboard = styled.div`
  background-color: #fefae0;
  padding: 2.4rem 4.8rem;
  border-radius: 4px;
  height: 100%;
  overflow: auto;
`;

const AddBookButton = styled.button`
  height: 6.4rem;
  width: 6.4rem;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0 0 0 / 0.2);
  background-color: #0267c1;
  color: #fff;
  position: fixed;
  right: 0;
  top: 5%;
`;

function Dashboard() {
  const { toForm } = useBooks();

  return (
    <StyledDashboard>
      <AddBookButton onClick={toForm}>Add book</AddBookButton>
      <Table />
    </StyledDashboard>
  );
}

export default Dashboard;
