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

@Injectable()
export class ReduxStore {
  public dispatch: AppDispatch
  public value: Store<RootState>

  constructor() {
    this.value = store
    this.dispatch = store.dispatch
  }
}
