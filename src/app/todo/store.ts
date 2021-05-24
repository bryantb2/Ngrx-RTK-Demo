import { Injectable, OnDestroy } from '@angular/core';
import { todoReducer } from './slices';
import { combineReducers, configureStore, Dispatch, Store, Unsubscribe } from '@reduxjs/toolkit';
import { map } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';

const rootReducer = combineReducers({
  todo: todoReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}),
  devTools: true
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

type GetState = typeof store.getState
type Subscribe = typeof store.subscribe

@Injectable()
export class ReduxStore {
  // expose redux API
  public dispatch: AppDispatch
  public getState: GetState
  public subscribe: Subscribe

  // angular implementation
  public state$: Observable<RootState>

  constructor() {
    this.subscribe = store.subscribe
    this.getState = store.getState
    this.dispatch = store.dispatch

    // makes redux state observable
    this.state$ = new Observable<RootState>((observer) => {
      // subscribe to redux store, notify observers
      const unsub = store.subscribe(() => {
        observer.next(store.getState())
      })
      return () => {
        // cleanup store subscription
        observer.complete()
        unsub()
      }
    })
  }
}
