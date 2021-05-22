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

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isRejected,
  isRejectedWithValue
} from '@reduxjs/toolkit';
import { Todo } from '../models';
import { addTodoItem, loadAllItems, loadSingleItem, removeTodoItem, updateTodoItem } from '../thunks';
import { adapter, initialState, State } from '../states';

const isPendingAction = isPending(
  loadAllItems,
  loadSingleItem,
  addTodoItem,
  updateTodoItem,
  removeTodoItem
)

const isRejectedAction = isRejectedWithValue(
  loadAllItems,
  loadSingleItem,
  addTodoItem,
  updateTodoItem,
  removeTodoItem
)

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
      // matchers allow for type-safe filtering of multiple actions
      .addMatcher(isPendingAction, (state: State) => ({
        ...state, loading: true
      }))
      .addMatcher(isRejectedAction, (state: State, action) => ({
        ...state, loading: false, error: action.payload as Error
      }))
      // add item
      .addCase(
        addTodoItem.fulfilled.type,
        (state: State, action: PayloadAction<Todo>) =>
          adapter.addOne({...state, loading: false}, action.payload)
      )
      // update item
      .addCase(
        updateTodoItem.fulfilled.type,
        (state: State, action: PayloadAction<Todo>) =>
          adapter.updateOne({ ...state, loading: false}, { id: action.payload.id, changes: action.payload })
       )
      // delete item
      .addCase(
        removeTodoItem.fulfilled.type,
        (state: State, action: PayloadAction<string>) =>
          adapter.removeOne({ ...state, loading: false }, action.payload)
      )
      // load all items
      .addCase(
        loadAllItems.fulfilled.type,
        (state: State, action: PayloadAction<Todo[]>) => {
          adapter.setAll({ ...state, loading: false }, action.payload);
        }
      )
      // loading single item
      .addCase(
        loadSingleItem.fulfilled.type,
        (state: State, action: PayloadAction<Todo>) =>
          adapter.upsertOne({ ...state, loading: false }, action.payload)
      )

  }
})

