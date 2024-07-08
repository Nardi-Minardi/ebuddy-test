import types from "./types";
import { combineReducers } from "redux";

interface UserState {
  users: array;
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
  success?: boolean;
}

interface authState {
  token: string;
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
}

const initialUserState = {
  users: [],
  loading: false,
  error: "",
  isAuthenticated: false,
  success: false,
};

const initialAuthState = {
  token: "",
  loading: false,
  error: "",
  isAuthenticated: false,
};

export function authReducer(state: authState = initialAuthState, action: any) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function userReducer(state: UserState = initialUserState, action: any) {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        isAuthenticated: true,
      };
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function updateUserReducer(
  state: UserState = initialUserState,
  action: any
) {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: state.users.concat(action.payload.data),
      };
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  updateUser: updateUserReducer,
});
