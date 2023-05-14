export interface DocPaneState {
  visible: boolean;
}

export interface QueryPanelState {
  isOpened?: boolean;
  sizes?: number[];
  prev_sizes?: number[];
}

export interface QueryParameters {
  body?: string;
  variables?: string;
  headers?: string;
}