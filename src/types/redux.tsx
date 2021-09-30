export interface AppState {
  isLoadedAll: boolean;
}

export enum AppActionTypes {
  MAKE_LOADED = 'MAKE_LOADED',
}

export interface MakeLoadedAction {
  type: AppActionTypes.MAKE_LOADED;
}
