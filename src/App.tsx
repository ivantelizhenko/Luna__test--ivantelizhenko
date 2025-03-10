import styled from 'styled-components';

import Footer from './components/Footer';
import Main from './components/Main';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <Layout>
      <Main />
      <Footer />
    </Layout>
  );
}

export default App;
