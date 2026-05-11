import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { ProductsEffects } from './store/products/products.effects';
import { productsReducer } from './store/products/products.reducer';
import { authReducer } from './store/login/login.reducer';
import { ProfileEffects } from './store/profile/userProfile.effects';
import { LoginEffects } from './store/login/login.effects';
import { profileReducer } from './store/profile/userProfile.reducer';
import { Store } from '@ngrx/store';
import { loginSuccess } from './store/login/login.actions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideStore(
      {
        products: productsReducer,
        auth: authReducer,
        profile: profileReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      },
    ),
    provideEffects([ProductsEffects, ProfileEffects, LoginEffects]),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          const store = inject(Store);
          if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            const userRaw = localStorage.getItem('user');
            if (token && userRaw) {
              store.dispatch(loginSuccess({ token, user: JSON.parse(userRaw) }));
            }
          }
        };
      },
      multi: true,
    },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore({ stateKey: 'router', routerState: RouterState.Minimal }),
  ],
};
