import styled from 'styled-components';
import BookForm from './BookForm/BookForm';

const StyledMain = styled.main`
  background-color: #d4a373;
  padding: 4.8rem 6.4rem;
  height: 100%;
`;

function Main() {
  return (
    <StyledMain>
      <BookForm />
    </StyledMain>
  );
}

export default Main;
