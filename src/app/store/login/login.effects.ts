import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginSuccess, logout, loginRequest, loginFailure } from './login.actions';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private loginService = inject(LoginService);

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      switchMap(({ username, password }) =>
        this.loginService.login(username, password).pipe(
          switchMap(({ token }) =>
            this.loginService.getAllUsers().pipe(
              map(users => {
                const user = users.find(u => u.username === username);
                return loginSuccess({ token, user });
              })
            )
          ),
          catchError(() => of(loginFailure()))
        )
      )
    )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );
}
