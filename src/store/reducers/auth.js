import { AUTH_LOGAUT, AUTH_SUCCESS } from "../action/actionTypes";

const initialState = {
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case AUTH_LOGAUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
