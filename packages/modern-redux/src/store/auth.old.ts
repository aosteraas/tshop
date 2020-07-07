import { SetTokenPayload } from './SetTokenPayload';
import { AuthState } from './AuthState';
import { ActionCreator } from '@reduxjs/toolkit';

// create some action types as an enum or maybe an object of strings which is
// ultimately what a TypeScript string enum is
enum AuthActionTypes {
  SET_ACCESS_TOKEN = '@@auth/SET_ACCESS_TOKEN',
  SET_TOKENS = '@@auth/SET_TOKENS',
}

// Create some action creators
const setTokens = (payload: SetTokenPayload) => ({
  type: AuthActionTypes.SET_ACCESS_TOKEN,
  payload,
});

const setAccessToken = (payload: string) => ({
  type: AuthActionTypes.SET_TOKENS,
  payload,
});

// Put them in an object
export const AuthActions = {
  setAccessToken,
  setTokens,
};

// Create a type
type AuthAction = ReturnType<typeof setAccessToken | typeof setTokens>;

// or go a bit mental
type ActionsOf<T extends { [k in keyof T]: ActionCreator<any> }> = {
  [K in keyof T]: ReturnType<T[K]>;
};

type AllActionsOf<T extends { [k in keyof T]: ActionCreator<any> }> = ActionsOf<
  T
>[keyof T];

type _AuthActions = AllActionsOf<typeof AuthActions>;

// make some default start
const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
};

// make a reducer
export function authReducerOld(
  state = initialState,
  action: _AuthActions,
): AuthState {
  // deal with a manually created switch statement to update state
  switch (action.type) {
    case AuthActionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload as string,
      };
    case AuthActionTypes.SET_TOKENS:
      const payload = action.payload as SetTokenPayload;
      return {
        ...state,
        accessToken: payload.access,
        refreshToken: payload.refresh,
      };
    default:
      return state;
  }
}
