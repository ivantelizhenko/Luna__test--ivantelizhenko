import styled from 'styled-components';
import BookForm from './BookForm';

const StyledMain = styled.main`
  background-color: yellow;
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
