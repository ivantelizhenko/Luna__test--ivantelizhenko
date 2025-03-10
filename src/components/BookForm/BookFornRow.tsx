import styled from 'styled-components';

const BookFormRow = styled.div`
  display: flex;

  & label {
    font-size: 2rem;
    font-weight: 600;
    margin-right: 2.4rem;
  }

  & input,
  & select {
    width: 100%;
    padding: 0.8rem 1.2rem;
    border-radius: 13px;
    border: 1px solid rgba(3 3 3 / 0.1);
    box-shadow: 0 2px 4px rgba(0 0 0 / 0.1);
  }
`;

export default BookFormRow;
