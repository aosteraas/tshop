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
    // creates an action with a type of `auth/setAccessToken` and payload type
    // of `string`
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    // creates an action with a type of `auth/setTokens` and payload type
    // of `SetTokenPayload`
    setTokens(state, { payload }: PayloadAction<SetTokenPayload>) {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
    },
  },
});

// Destructure the reducer and actions
const { reducer, actions } = slice;

// Export for use elsewhere
export { reducer as authReducer, actions as AuthActions };
