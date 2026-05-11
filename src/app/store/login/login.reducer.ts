import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { loginSuccess, logout, loginFailure, loginRequest } from './login.actions';

export interface AuthState {
  token?: string | null;
  user: User | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loginRequest, (state) => ({
    ...state,
    error: null,
  })),

  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null,
  })),

  on(loginFailure, (state) => ({
    ...state,
    error: 'Login failed. Please check your credentials.',
  })),

  on(logout, () => initialAuthState),
);
