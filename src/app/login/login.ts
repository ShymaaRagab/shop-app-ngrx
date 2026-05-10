import { LoginService } from './../services/login.service';
import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { loginSuccess } from '../store/login/login.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private store: Store<any>,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const val = this.loginForm.value;
    this.loginService
      .login(val.username, val.password)
      .pipe(
        tap(({ token }) => {
          this.loginService.getAllUsers().subscribe((users) => {
            const user = users.find(
              (u) => u.username === val.username && u.password === val.password,
            );

            this.store.dispatch(loginSuccess({ token, user }));
            this.router.navigate(['/home']);
          });
        }),
      )
      .subscribe(noop, () => alert('Login Failed'));
  }
}
