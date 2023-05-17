import * as yup from 'yup';
import { schemaValidation } from '../helpers/schemaValidate';

export type FormDataSignUp = yup.InferType<typeof schemaValidation>;

export interface FormProps {
  typeForm: string;
  onclickSubmit?: (email: string, password: string) => Promise<void>;
  onclickLogIn?: (email: string, password: string, name: string) => Promise<void>;
}

export interface DocPaneState {
  visible: boolean;
}

export interface LangState {
  language: string;
}
