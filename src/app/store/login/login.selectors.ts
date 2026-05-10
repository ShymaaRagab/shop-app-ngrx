import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './login.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const isLoggedIn = createSelector(selectAuthState, (auth) => !!auth.token);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
