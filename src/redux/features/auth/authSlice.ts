import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
type TAuthState = {
  user: null | object;
  token: null | string;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as TAuthState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
