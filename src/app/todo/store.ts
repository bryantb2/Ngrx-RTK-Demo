import { Injectable } from '@angular/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';

import { todoReducer, routerReducer, NavigationEvent, routerNavigated, isNavigationEvent } from './slices';
import { Router } from '@angular/router';

const rootReducer = combineReducers({
  todo: todoReducer,
  router: routerReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}),
  devTools: true
});

type GetState = typeof store.getState;
type Subscribe = typeof store.subscribe;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;


@Injectable()
export class ReduxStore {
  // expose redux API
  public dispatch: AppDispatch;
  public getState: GetState;
  public subscribe: Subscribe;

  // angular implementation
  public state$: Observable<RootState>;

  constructor(private router: Router) {
    this.subscribe = store.subscribe;
    this.getState = store.getState;
    this.dispatch = store.dispatch;

    // makes redux state observable
    this.state$ = new Observable<RootState>((observer) => {
      // subscribe to redux store, notify observers
      const unsub = store.subscribe(() => {
        observer.next(store.getState());
      });
      return () => {
        // cleanup store subscription
        observer.complete();
        unsub();
      };
    });

    this.router.events.subscribe((data) => {
      // dispatch routing event
      if (isNavigationEvent(data)) {
        console.log('Payload in router event is: ', data)
        this.dispatch(routerNavigated(data))
      }
    })
  }
}
