import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { updateProfile , updateProfileFailure , updateProfileSuccess } from './userProfile.actions';
import { ProfileService } from '../../services/profile.service';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      switchMap(({ id, payload }) =>
        this.profileService.updateProfile(id, payload).pipe(
          map((profile) => updateProfileSuccess({ profile })),
          catchError((error) => of(updateProfileFailure({ error })))
        )
      )
    )
  );
}