import { User } from './../../interfaces/user';
import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ token: string; user: User }>()
);

export const logout = createAction(
  "[Top Menu] Logout"
);

export const loadUserProfile = createAction(
  "[Profile] Load User Profile"
);

