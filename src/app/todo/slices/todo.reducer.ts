import {
  createSlice,
  PayloadAction,
  isPending,
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

const todoSlice = createSlice({
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
        (state: State, action: PayloadAction<Todo[]>) =>
          adapter.setAll({ ...state, loading: false }, action.payload)
      )
      // loading single item
      .addCase(
        loadSingleItem.fulfilled.type,
        (state: State, action: PayloadAction<Todo>) =>
          adapter.upsertOne({ ...state, loading: false }, action.payload)
      )
      // matchers allow for type-safe filtering of multiple actions
      .addMatcher(isPendingAction, (state: State) => ({
        ...state, loading: true
      }))
      .addMatcher(isRejectedAction, (state: State, action) => ({
        ...state, loading: false, error: action.payload as Error
      }))
  }
})

export const todoReducer = todoSlice.reducer

