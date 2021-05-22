/*import { createReducer, on } from '@ngrx/store';

import * as TodoActions from '../actions';
import { initialState, adapter } from '../states';

export const reducer = createReducer(
  initialState,
  on(TodoActions.loadAll, (state) => ({ ...state, loading: true })),
  on(TodoActions.loadAllSuccess, (state, { todos }) =>
    adapter.setAll(todos, { ...state, loading: false })
  ),
  on(TodoActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodoActions.load, (state, { id }) => ({
    ...state,
    loading: true,
    selectedId: id,
  })),
  on(TodoActions.loadSuccess, (state, { todo }) =>
    adapter.upsertOne(todo, { ...state, loading: false })
  ),
  on(TodoActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodoActions.create, (state) => ({ ...state, loading: true })),
  on(TodoActions.createSuccess, (state, { todo }) =>
    adapter.addOne(todo, { ...state, loading: false })
  ),
  on(TodoActions.createFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodoActions.update, (state) => ({ ...state, loading: true })),
  on(TodoActions.updateSuccess, (state, { todo }) =>
    adapter.updateOne(
      { id: todo.id, changes: todo },
      { ...state, loading: false }
    )
  ),
  on(TodoActions.updateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodoActions.remove, (state) => ({ ...state, loading: true })),
  on(TodoActions.removeSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(TodoActions.removeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);*/

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models';
import { loadAllItems, loadSingleItem } from '../thunks';
import { adapter, initialState, State } from '../states';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState as State,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadAllItems.pending.type,
        (state: State, action) => ({
          ...state, loading: true
        })
      )
      .addCase(
        loadAllItems.rejected.type,
        (state: State, action: PayloadAction<Error>) => ({
          ...state,
          loading: false,
          error: action.payload
        })
      )
      .addCase(
        loadAllItems.fulfilled.type,
        (state: State, action: PayloadAction<Todo[]>) => {
          adapter.setAll({ ...state, loading: false } as State, action.payload);
        }
      )
      .addCase(
        loadSingleItem.pending.type,
        (state: State) => ({
          ...state,
          loading: true,
        })
      )
      .addCase(
        loadSingleItem.rejected.type,
        (state: State, action: PayloadAction<Error>) => ({
          ...state,
          loading: false,
          error: action.payload
        })
      )
      .addCase(
        loadSingleItem.fulfilled,
        (state: State, action: PayloadAction<Todo>) =>
          adapter.upsertOne(action.payload, { ...state, loading: false })
      )
  }
})

on(TodoActions.loadAllFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error,
})),
on(TodoActions.load, (state, { id }) => ({
  ...state,
  loading: true,
  selectedId: id,
})),
  on(TodoActions.loadSuccess, (state, { todo }) =>
    adapter.upsertOne(todo, { ...state, loading: false })
  ),

