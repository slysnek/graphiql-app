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

export interface ResponsePanelViewProps {
  error: boolean;
  error_name?: string;
  error_message?: string;
  result?: string;
}

export interface QueryPanelProps {
  onChange: (newQueryPanelState: QueryPanelState) => void;
}

export interface ButtonInTabsProps {
  onClick: React.MouseEventHandler;
  isPanelOpened: boolean | undefined;
}

export interface HistoryState {
  history: [];
}

export interface SchemaObject {
  __schema: Schema;
}
export interface Schema {
  queryType: QueryType;
  mutationType?: null;
  subscriptionType?: null;
  types?: TypesEntity[] | null;
  directives?: DirectivesEntity[] | null;
}
export interface QueryType {
  name: string;
}
export type TypesEntity = {
  kind: string;
  name: string;
  description?: string | null;
  fields: FieldsEntity[] | null;
  inputFields?: null;
  interfaces?: (TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity | null)[] | null;
  enumValues?: EnumValuesEntity[] | null;
  possibleTypes?: TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity1[] | null;
};
export type FieldsEntity = {
  name: string;
  description?: string | null;
  args?: (ArgsEntity | null)[] | null;
  type: Type;
  isDeprecated: boolean;
  deprecationReason?: null;
};
export type ArgsEntity = {
  name: string;
  description?: string | null;
  type: TypeOrOfType;
  defaultValue?: string | null;
};
export interface TypeOrOfType {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity2 | null;
}
export interface TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity2 {
  kind: string;
  name: string;
  ofType?: null;
}
export interface Type {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfType1 | null;
}
export interface TypeOrOfType1 {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfType2 | null;
}
export interface TypeOrOfType2 {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity2 | null;
}
export interface TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity {
  kind: string;
  name: string;
  ofType?: null;
}
export interface EnumValuesEntity {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: null;
}
export interface TypeOrOfTypeOrInterfacesEntityOrPossibleTypesEntity1 {
  kind: string;
  name: string;
  ofType?: null;
}
export interface DirectivesEntity {
  name: string;
  description: string;
  locations?: string[] | null;
  args?: ArgsEntity1[] | null;
}
export interface ArgsEntity1 {
  name: string;
  description: string;
  type: TypeOrOfType;
  defaultValue?: string | null;
}

export interface QueryHistoryProps {
  currentHistory: string[];
  historyReturn: () => void;
}

export interface DisplayBoxProps {
  allFields: TypesEntity[] | null;
  header: string;
  noValue: string;
  displayType: string;
  currentEntity: TypesEntity | FieldsEntity | ArgsEntity | undefined;
  addToHistory: (element: TypesEntity | FieldsEntity | ArgsEntity) => void;
}

export interface DisplayTextBoxProps {
  header: string;
  noValue: string;
  displayType: string;
  currentEntity: FieldsEntity | ArgsEntity | undefined;
  allFields: TypesEntity[] | null;
  addToHistory: (element: TypesEntity | FieldsEntity | ArgsEntity) => void;
}
