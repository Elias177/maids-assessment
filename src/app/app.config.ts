import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { usersReducer } from "./store/users.reducer";
import { provideHttpClient } from "@angular/common/http";
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from "./store/users.effects";
import { provideStoreDevtools } from '@ngrx/store-devtools';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideStore({ users: usersReducer }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideEffects([UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
