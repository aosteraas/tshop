import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store/auth.slice';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const state = useSelector((s: RootState) => s.auth);

  const _setAccessToken = () => {
    dispatch(AuthActions.setAccessToken(accessToken));
  };

  const _setTokens = () => {
    dispatch(
      AuthActions.setTokens({ access: accessToken, refresh: refreshToken }),
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>State</p>
        <code>{JSON.stringify(state, null, 2)}</code>
        <p>Access Token</p>
        <input
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />
        <p>
          <input
            value={refreshToken}
            onChange={(e) => setRefreshToken(e.target.value)}
          />
        </p>
        <button onClick={() => _setAccessToken()}>Set Access token</button>
        <button onClick={() => _setTokens()}>Set Tokens</button>
      </header>
    </div>
  );
}

export default App;
