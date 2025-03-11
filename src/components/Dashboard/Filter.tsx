import styled from 'styled-components';

const Filter = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  & label {
    font-weight: 600;
    font-size: 2rem;
  }

  & select {
    background-color: #0267c1;
    color: #d3ebff;
    border: 2px solid #004a8a;
    padding: 0.4rem 1.2rem;
  }

  & option {
    text-transform: uppercase;
  }
`;

export default Filter;
