import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, concatMap, switchMap, catchError } from 'rxjs/operators';

import * as TodoActions from '../actions';
import {
  TodoCreateDialogComponent,
  TodoDeleteDialogComponent,
  TodoEditDialogComponent,
} from '../containers';
import { TodoService } from '../services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../models';

// thunk param interfaces
export interface IBaseThunkParams {
  todoService: TodoService;
}

// CRUD operations
export type ILoadSingleItem = {
  itemId: string;
} //& IBaseThunkParams
export type ILoadAllItems = {
  offset?: number;
  limit?: number;
} //& IBaseThunkParams
export type IAddTodoItem = {
  newItem: Todo
} //& IBaseThunkParams
export type IUpdateTodoItem = {
  updatedItem: Todo
} //& IBaseThunkParams

export type IRemoveTodoItem = {
  itemId: string;
} //& IBaseThunkParams

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
    private actions$: Actions,
    private dialog: MatDialog,
    private todoService: TodoService
  ) {}

  /*hideCreateDialog = createAsyncThunk(
    'todo/hideCreateDialog',
    () => {
      this.createDialogRef?.close();
    }
  )*/

  /*hideEditDialog = createAsyncThunk(
    'todo/hideEditDialog',
    () => {
      this.editDialogRef?.close();
    }
  )*/

  /*hideRemoveDialog = createAsyncThunk(
    'todo/hideRemoveDialog',
    (params: IShowRemoveDialog) => {
      const { id } = params
      this.removeDialogRef?.close();
    }
  )*/
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
