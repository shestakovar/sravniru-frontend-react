import { AppActionTypes, MakeLoadedAction, MakeUnloadedAction } from "../../types/redux";

export function setMoreLoaded(): MakeLoadedAction {
  return { type: AppActionTypes.MAKE_LOADED }
}

export function setMoreUnloaded(): MakeUnloadedAction {
  return { type: AppActionTypes.MAKE_UNLOADED }
}