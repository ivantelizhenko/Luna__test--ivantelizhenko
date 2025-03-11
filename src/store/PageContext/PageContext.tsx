import { createContext, useContext, useReducer } from 'react';
import {
  Action,
  PageContextProviderProps,
  PageContextValue,
  PageState,
  PageStatus,
} from './PageContextTypes';

const PageContext = createContext<PageContextValue | null>(null);

const initialState: PageState = {
  page: PageStatus.Dashboard,
};

function pageReducer(state: PageState, action: Action): PageState {
  switch (action.type) {
    case 'page/setDashboardStatus': {
      return { ...state, page: PageStatus.Dashboard };
    }
    case 'page/setFormStatus': {
      return { ...state, page: PageStatus.Form };
    }

    default:
      throw new Error('Unknown action type');
  }
}

function PageProvider({ children }: PageContextProviderProps) {
  const [pageState, dispatch] = useReducer(pageReducer, initialState);

  const ctx: PageContextValue = {
    ...pageState,
    setPageDashboardStatus() {
      dispatch({ type: 'page/setDashboardStatus' });
    },
    setPageFormStatus() {
      dispatch({ type: 'page/setFormStatus' });
    },
  };

  return <PageContext.Provider value={ctx}>{children}</PageContext.Provider>;
}

function usePage() {
  const context = useContext(PageContext);
  if (context === undefined)
    throw new Error('BooksContext was used outside of the PAgeProvider');

  return context as PageContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { PageProvider, usePage };
