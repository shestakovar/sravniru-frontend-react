export interface AppState {
  isLoadedAll: boolean;
}

export enum AppActionTypes {
  MAKE_LOADED = 'MAKE_LOADED',
  MAKE_UNLOADED = 'MAKE_UNLOADED',
}

export interface MakeLoadedAction {
  type: AppActionTypes.MAKE_LOADED;
}

export interface MakeUnloadedAction {
  type: AppActionTypes.MAKE_UNLOADED;
}

export type AppAction = MakeLoadedAction | MakeUnloadedAction;