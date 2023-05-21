import * as yup from 'yup';
import { schemaValidation } from '../helpers/schemaValidate';

export type FormDataSignUp = yup.InferType<typeof schemaValidation>;

export interface FormProps {
  typeForm: string;
  onclickSubmit?: (email: string, password: string) => Promise<void>;
  onclickLogIn?: (email: string, password: string, name: string) => Promise<void>;
  onGoogleHandler: () => Promise<void>;
}

export interface DocPaneState {
  visible: boolean;
}

export interface LangState {
  language: string;
}

export interface LoadingSpinnerProps {
  loading: boolean;
}

export interface QueryPanelState {
  isOpened?: boolean;
  sizes?: number[];
  prev_sizes?: number[];
}

export interface QueryParameters {
  isRequested: boolean;
  isLoaded: boolean;
  body?: string;
  variables?: string;
  headers?: string;
  error: boolean;
  error_name?: string;
  error_message?: string;
  result?: string;
}

export interface ErrorObject {
  error: boolean;
  name?: string;
  message?: string;
  body?: string;
}
