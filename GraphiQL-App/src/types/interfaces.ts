export interface DocPaneState {
  visible: boolean;
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
