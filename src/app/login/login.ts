import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '../store/login/login.actions';

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
    private store: Store<any>,
  ) {
    this.loginForm = this.fb.group({
      username: ['johnd', [Validators.required, Validators.minLength(3)]],
      password: ['m38rmF$', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.store.dispatch(loginRequest({ username, password }));
  }
}
