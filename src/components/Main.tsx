import styled from 'styled-components';
import BookForm from './BookForm/BookForm';

import Dashboard from './Dashboard';
import { useBooks } from '../store/BookContext';

const StyledMain = styled.main`
  background-color: #d4a373;
  padding: 4.8rem 6.4rem;
  height: 100%;
`;

function Main() {
  const { page } = useBooks();
  return (
    <StyledMain>
      {page === 'form' && <BookForm />}
      {page === 'dashboard' && <Dashboard />}
    </StyledMain>
  );
}

export default Main;
