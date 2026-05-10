import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { loginSuccess } from './login.actions';

export interface AuthState {
  token?: string | null;
  user: User | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
  })),
);
