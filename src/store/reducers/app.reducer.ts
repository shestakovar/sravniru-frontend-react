import { AppActionTypes, AppState, MakeLoadedAction } from "../../types/redux";


export const defaultState: AppState = {
  isLoadedAll: false,
};

export const reducer = (state = defaultState, action: MakeLoadedAction): AppState => {
  switch (action.type) {
    case AppActionTypes.MAKE_LOADED:
      return { isLoadedAll: true };
    default:
      return state;
  }
}
