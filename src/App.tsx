import styled from 'styled-components';

import { Toaster } from 'react-hot-toast';

import Footer from './components/Footer';
import Main from './components/Main';
import { PageProvider } from './store/PageContext/PageContext';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <Layout>
      <PageProvider>
        <Main />
      </PageProvider>
      <Footer />
      <Toaster />
    </Layout>
  );
}

export default App;
