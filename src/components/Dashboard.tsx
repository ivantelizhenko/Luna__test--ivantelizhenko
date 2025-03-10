import styled from 'styled-components';
import Table from './Table';

const StyledDashboard = styled.div`
  background-color: #fefae0;
  padding: 2.4rem 4.8rem;
  border-radius: 4px;
  height: 100%;
  overflow: auto;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <Table />
    </StyledDashboard>
  );
}

export default Dashboard;
