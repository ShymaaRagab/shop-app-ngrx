import { createAction, props } from '@ngrx/store';

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ id: number; payload: any }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ profile: any }>(),
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: any }>(),
);
