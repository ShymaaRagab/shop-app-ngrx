import { Component, OnInit, OnDestroy } from '@angular/core';
import { selectUser } from '../store/login/login.selectors';
import { loadUserProfile } from '../store/login/login.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateProfile } from '../store/profile/userProfile.actions';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {
  User$: Observable<User | null>;
  userForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.store.dispatch(loadUserProfile());
    this.initForm();
    this.myProfileInfo();
  }

  myProfileInfo() {
    this.User$ = this.store.select(selectUser);
    this.User$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],

      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
      }),

      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        number: [null, Validators.required],
        zipcode: ['', Validators.required],

        geolocation: this.fb.group({
          lat: ['', Validators.required],
          long: ['', Validators.required],
        }),
      }),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      this.store.dispatch(updateProfile({ id: updatedUser.id, payload: updatedUser }));
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
