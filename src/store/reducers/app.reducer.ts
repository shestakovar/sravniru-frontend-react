import { AppAction, AppActionTypes, AppState } from "../../types/redux";


export const defaultState: AppState = {
  isLoadedAll: false,
};

export const reducer = (state = defaultState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.MAKE_LOADED:
      return { isLoadedAll: true };
    case AppActionTypes.MAKE_UNLOADED:
      return { isLoadedAll: false}
    default:
      return state;
  }
}
