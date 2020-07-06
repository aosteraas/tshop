import { createAction } from '@reduxjs/toolkit';
import { SetTokenPayload } from './SetTokenPayload';
import { AuthState } from './AuthState';

enum AuthActionTypes {
  SET_ACCESS_TOKEN = '@@auth/SET_ACCESS_TOKEN',
  SET_TOKENS = '@@auth/SET_TOKENS',
}

const AuthActions = {
  setAccessToken: createAction<string>(AuthActionTypes.SET_ACCESS_TOKEN),
  setTokens: createAction<SetTokenPayload>(AuthActionTypes.SET_TOKENS),
};

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
};

type AuthAction =
  | ReturnType<typeof AuthActions.setAccessToken>
  | ReturnType<typeof AuthActions.setTokens>;

export function authReducerOld(state = initialState, action: AuthAction): AuthState {
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
