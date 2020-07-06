import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetTokenPayload } from './SetTokenPayload';
import { AuthState } from './AuthState';

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setTokens(state, { payload }: PayloadAction<SetTokenPayload>) {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
    },
  },
});

const { reducer, actions } = slice;

export { reducer as authReducer, actions as AuthActions };
