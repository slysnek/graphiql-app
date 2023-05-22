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

export interface CardContentProps {
  onClick: () => void;
  avatar: string;
  name: string;
  GHLink: string;
  EMLink: string;
  TGLink: string;
}

export interface SimpleUserCardProps {
  avatar: string;
  name: string;
  GHLink: string;
  EMLink: string;
  TGLink: string;
  author: string;
  positionAvatar: string;
  positionContent: string;
}
