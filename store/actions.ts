import axios from "axios";
import store from "./store";
import types from "./types";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { tokenAuth } from "@/utils/tokenAuth";
import { get, post, put } from "@/apis/userApi";
import Cookies from "js-cookie";

const { dispatch } = store;

export const loginWithGoogle = async (token: string) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const response = await post("/login", { accessToken:token }, "application/json");
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
    return error;
  }
};

export const fetchUsers = async () => {
  dispatch({ type: types.FETCH_USERS_REQUEST });
  try {
    const response = await get("/users", {});
    dispatch({ type: types.FETCH_USERS_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: types.FETCH_USERS_FAILURE, payload: error.message });
    return error;
  }
};

export const updateUser = async (id: string, name: string) => {
  dispatch({ type: types.UPDATE_USER_REQUEST });
  try {
    const response = await put(`/user/${id}`, { name }, "application/json");
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_FAILURE, payload: error.message });
    return error;
  }
};
