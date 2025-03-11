import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { usePage } from '../../store/PageContext/PageContext';
import { useForm } from '../../store/FormContext/FormContext';

import { FilterValues } from './DashboardTypes';

import Table from './Table';
import SelectField from '../SelectField';
import Navigation from './Navigation';
import Filter from './Filter';
import AddEditBookButton from '../AddEditBookButton';

const StyledDashboard = styled.div`
  background-color: #fefae0;
  padding: 1.2rem 2.4rem;
  border-radius: 4px;
  height: fit-content;
`;

function Dashboard() {
  const [filterValue, setFilterValue] = useState<FilterValues>(
    FilterValues.ShowAll
  );
  const { setFormAddStatus } = useForm();
  const { setPageFormStatus } = usePage();

  function handleToForm() {
    setFormAddStatus();
    setPageFormStatus();
  }

  function handleSetFilter(e: ChangeEvent<HTMLSelectElement>) {
    setFilterValue(e.target.value as FilterValues);
  }

  return (
    <StyledDashboard>
      <Navigation>
        <Filter>
          <SelectField
            title="Books"
            name="filter"
            value={filterValue}
            onChange={handleSetFilter}
            options={['all', 'active', 'deactivated']}
          />
        </Filter>
        <AddEditBookButton onClick={handleToForm}>Add book</AddEditBookButton>
      </Navigation>
      <Table filter={filterValue} />
    </StyledDashboard>
  );
}

export default Dashboard;
