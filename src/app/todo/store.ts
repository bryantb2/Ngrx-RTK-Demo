import { Injectable } from '@angular/core';
import { todoReducer } from './slices';
import { combineReducers, configureStore, Dispatch, Store } from '@reduxjs/toolkit';

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

  constructor() {
    this.subscribe = store.subscribe
    this.getState = store.getState
    this.dispatch = store.dispatch
  }
}
