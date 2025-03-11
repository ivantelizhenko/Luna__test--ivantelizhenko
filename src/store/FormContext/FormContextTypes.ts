import { ReactNode } from 'react';

export enum FormStatus {
  Add = 'add',
  Edit = 'edit',
}

export type FormState = {
  formStatus: FormStatus;
};

export type FormContextValue = FormState & {
  setFormAddStatus: () => void;
  setFormEditStatus: () => void;
};

export type FormContextProviderProps = {
  children: ReactNode;
};

type setFormAddStatusAction = {
  type: 'form/setAddStatus';
};

type setFormEditEditAction = {
  type: 'form/setEditStatus';
};

export type Action = setFormAddStatusAction | setFormEditEditAction;
