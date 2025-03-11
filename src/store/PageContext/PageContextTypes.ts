import { ReactNode } from 'react';

export enum PageStatus {
  Dashboard = 'dashboard',
  Form = 'form',
}

export type PageState = {
  page: PageStatus;
};

export type PageContextValue = PageState & {
  setPageDashboardStatus: () => void;
  setPageFormStatus: () => void;
};

export type PageContextProviderProps = {
  children: ReactNode;
};

type setPageDashboardStatusAction = {
  type: 'page/setDashboardStatus';
};

type setPageFormStatusAction = {
  type: 'page/setFormStatus';
};

export type Action = setPageDashboardStatusAction | setPageFormStatusAction;
