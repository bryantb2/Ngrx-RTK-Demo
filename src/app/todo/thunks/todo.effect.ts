import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  TodoCreateDialogComponent,
  TodoDeleteDialogComponent,
  TodoEditDialogComponent,
} from '../containers';
import { TodoService } from '../services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../models';
import { ReduxStore } from '../store';

// CRUD operations
export type ILoadSingleItem = {
  itemId: string;
}
export type ILoadAllItems = {
  offset?: number;
  limit?: number;
}
export type IAddTodoItem = {
  newItem: Todo
}
export type IUpdateTodoItem = {
  updatedItem: Todo
}
export type IRemoveTodoItem = {
  itemId: string;
}

// dialogs
export type IShowCreateDialog = {
  dialog: MatDialog,
}
export type IShowEditDialog = {
  itemToShow: Todo
}
export type IShowRemoveDialog = {
  id: string
}

@Injectable()
export class TodoThunks {
  createDialogRef?: MatDialogRef<TodoCreateDialogComponent>;
  editDialogRef?: MatDialogRef<TodoEditDialogComponent>;
  removeDialogRef?: MatDialogRef<TodoDeleteDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private store: ReduxStore
  ) {}

  loadAll = (params: ILoadAllItems): void =>
    this.store.dispatch(loadAllItems(params))

  loadSingle = (params: ILoadSingleItem): void =>
    this.store.dispatch(loadSingleItem(params))

  addItem = (params: IAddTodoItem): void =>
    this.store.dispatch(addTodoItem(params))

  updateItem = (params: IUpdateTodoItem): void =>
    this.store.dispatch(updateTodoItem(params))

  removeItem = (params: IRemoveTodoItem): void =>
    this.store.dispatch(removeTodoItem(params))
}

// CRUD operations
export const loadAllItems = createAsyncThunk(
  'todo/loadAllItems',
  async (params: ILoadAllItems, thunkAPI) => {
    const { offset, limit } = params
    try {
      const result = await this.todoService.findAll(offset, limit).toPromise()
      return result
    } catch (err: Error) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const loadSingleItem = createAsyncThunk(
  'todo/loadSingleItem',
  async (params: ILoadSingleItem, thunkAPI) => {
    const { itemId } = params
    try {
      const result = await this.todoService.find(itemId).toPromise()
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const addTodoItem = createAsyncThunk(
  'todo/addTodoItem',
  async (params: IAddTodoItem, thunkAPI) => {
    const { newItem } = params
    try {
      const result = await this.todoService.create(newItem).toPromise()
      this.createDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateTodoItem = createAsyncThunk(
  'todo/updateTodoItem',
  async (params: IUpdateTodoItem, thunkAPI) => {
    const { updatedItem } = params
    try {
      const result = await this.todoService.update(updatedItem).toPromise()
      this.editDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const removeTodoItem = createAsyncThunk(
  'todo/removeItem',
  async (params: IRemoveTodoItem, thunkAPI) => {
    const { itemId } = params
    try {
      const result = await this.todoService.remove(itemId).toPromise()
      this.removeDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// dialog operations
export const showCreateDialog = createAsyncThunk(
  'todo/showCreateDialog',
  () => {
    this.createDialogRef = this.dialog.open(TodoCreateDialogComponent, {
      width: '400px',
    });
  }
)

export const showEditDialog = createAsyncThunk(
  'todo/showEditDialog',
  (params: IShowEditDialog) => {
    const { itemToShow } = params
    this.editDialogRef = this.dialog.open(TodoEditDialogComponent, {
      width: '400px',
      data: { todo: itemToShow },
    });
  }
)

export const showRemoveDialog = createAsyncThunk(
  'todo/showRemoveDialog',
  (params: IShowRemoveDialog) => {
    const { id } = params
    this.removeDialogRef = this.dialog.open(TodoDeleteDialogComponent, {
      data: { id },
    });
  }
)
