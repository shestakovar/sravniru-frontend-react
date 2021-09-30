import { AppActionTypes, MakeLoadedAction } from "../../types/redux";

export function setAppLoaded(): MakeLoadedAction {
  return { type: AppActionTypes.MAKE_LOADED }
}
