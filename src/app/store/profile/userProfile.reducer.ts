import { createReducer, on } from "@ngrx/store";
import { updateProfile, updateProfileSuccess , updateProfileFailure } from "./userProfile.actions";
import { initialState } from '../../interfaces/product-state';


export const productsReducer = createReducer(
  initialState,

  on(updateProfile, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(updateProfileSuccess, (state, { profile }) => ({
    ...state,
    loading: false,
    profile
  })),

  on(updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);