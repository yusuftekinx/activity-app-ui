import { initialState } from "./initialState";
import * as actionTypes from "../actions/ActionTypes";

export const User = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.SETNAME:
      state.name = action.payload.payload;
      return state;

    case actionTypes.SETPHONE:
      state.phone = action.payload.payload;
      return state;

    default:
      return state;
  }
};
