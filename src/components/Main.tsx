import styled from 'styled-components';
import BookForm from './BookForm/BookForm';

import Dashboard from './Dashboard/Dashboard';
import { usePage } from '../store/PageContext/PageContext';
import { BooksProvider } from '../store/BookContext/BooksContext';
import { FormProvider } from '../store/FormContext/FormContext';

const StyledMain = styled.main`
  background-color: #d4a373;
  padding: 2.4rem 3.6rem;
  height: 100%;
`;

function Main() {
  const { page } = usePage();
  return (
    <FormProvider>
      <BooksProvider>
        <StyledMain>
          {page === 'form' && <BookForm />}
          {page === 'dashboard' && <Dashboard />}
        </StyledMain>
      </BooksProvider>
    </FormProvider>
  );
}

export default Main;
