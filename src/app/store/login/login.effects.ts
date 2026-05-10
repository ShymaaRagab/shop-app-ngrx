import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginSuccess, logout } from './login.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );
}
