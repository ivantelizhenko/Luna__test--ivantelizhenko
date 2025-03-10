import styled from 'styled-components';

import Footer from './components/Footer';
import Main from './components/Main';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Main />
      <Footer />
    </Wrapper>
  );
}

export default App;
