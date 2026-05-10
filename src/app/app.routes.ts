import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { authGuard } from './guard/auth-guard';
import { Profile } from './profile/profile';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'home', component: Home, title: 'Products', canActivate: [authGuard] },
  { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
  { path: 'profile', component: Profile, title: 'Profile'},
  { path: '**', redirectTo: 'login' },
];
