import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  TodoCreateDialogComponent,
  TodoDeleteDialogComponent,
  TodoEditDialogComponent,
} from '../containers';
import { ModalService, TodoService } from '../services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, TodoCreateDto, TodoUpdateDto } from '../models';
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
  newItem: TodoCreateDto
}
export type IUpdateTodoItem = {
  updatedItem: TodoUpdateDto
}
export type IRemoveTodoItem = {
  itemId: string;
}

@Injectable()
export class TodoThunks {
  constructor(
    private store: ReduxStore,
    private modalService: ModalService,
    private todoService: TodoService
  ) {}

  loadAll = (params: ILoadAllItems): void => {
    this.store.dispatch(loadAllItems({
      ...params,
      todoService: this.todoService
    }));
  }

  loadSingle = (params: ILoadSingleItem): void => {
    this.store.dispatch(loadSingleItem({
      ...params,
      todoService: this.todoService
    }));
  }

  addItem = (params: IAddTodoItem): void => {
    this.store.dispatch(addTodoItem({
      ...params,
      createDialogRef: this.modalService.createDialogRef,
      todoService: this.todoService
    }));
  }

  updateItem = (params: IUpdateTodoItem): void => {
    this.store.dispatch(updateTodoItem({
      ...params,
      editDialogRef: this.modalService.editDialogRef,
      todoService: this.todoService
    }));
  }

  removeItem = (params: IRemoveTodoItem): void => {
    this.store.dispatch(removeTodoItem({
      ...params,
      removeDialogRef: this.modalService.removeDialogRef,
      todoService: this.todoService
    }));
  }
}

// CRUD operations
export const loadAllItems = createAsyncThunk(
  'todo/loadAllItems',
  async (params: ILoadAllItems & {
    todoService: TodoService
  }, thunkAPI) => {
    const { offset, limit, todoService } = params
    try {
      const result = await todoService.findAll(offset, limit).toPromise()
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const loadSingleItem = createAsyncThunk(
  'todo/loadSingleItem',
  async (params: ILoadSingleItem & {
      todoService: TodoService
    }, thunkAPI) => {
    const { itemId, todoService } = params
    try {
      const result = await todoService.find(itemId).toPromise()
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const addTodoItem = createAsyncThunk(
  'todo/addTodoItem',
  async (params: IAddTodoItem & {
      createDialogRef: MatDialogRef<TodoCreateDialogComponent> | undefined,
      todoService: TodoService
  }, thunkAPI) => {
    const { newItem, todoService, createDialogRef } = params
    try {
      const result = await todoService.create(newItem).toPromise()
      createDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateTodoItem = createAsyncThunk(
  'todo/updateTodoItem',
  async (params: IUpdateTodoItem & {
    editDialogRef: MatDialogRef<TodoEditDialogComponent> | undefined,
    todoService: TodoService
  }, thunkAPI) => {
    const { updatedItem, todoService, editDialogRef } = params
    try {
      const result = await todoService.update(updatedItem).toPromise()
      editDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const removeTodoItem = createAsyncThunk(
  'todo/removeItem',
  async (params: IRemoveTodoItem & {
    removeDialogRef: MatDialogRef<TodoDeleteDialogComponent> | undefined,
    todoService: TodoService
  }, thunkAPI) => {
    const { itemId, todoService, removeDialogRef } = params
    try {
      const result = await todoService.remove(itemId).toPromise()
      removeDialogRef?.close();
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

