import styled from 'styled-components';
import BookForm from './BookForm/BookForm';
import { BooksProvider } from '../store/BookContext';
import Dashboard from './Dashboard';

const StyledMain = styled.main`
  background-color: #d4a373;
  padding: 4.8rem 6.4rem;
  height: 100%;
`;

function Main() {
  return (
    <BooksProvider>
      <StyledMain>
        {/* <BookForm /> */}
        <Dashboard />
      </StyledMain>
    </BooksProvider>
  );
}

export default Main;
