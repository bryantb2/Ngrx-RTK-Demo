import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Todo } from '../../models';
import * as TodoActions from '../actions';
import { reducer } from '../reducers';
import { State, featureName } from '../state';
import { TodoFacade } from './todo.facade';

describe('TodoFacade', () => {
  let store: Store<State>;
  let facade: TodoFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore()]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.callThrough();
    facade = TestBed.get(TodoFacade);
  }));

  it('should call loadAll', () => {
    facade.loadAll(0, 100);
    const action = TodoActions.loadAll({ offset: 0, limit: 100 });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call load', () => {
    const id = '1';
    facade.load(id);
    const action = TodoActions.load({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call create', () => {
    const todo: Todo = {
      id: '1',
      text: 'test1',
      checked: true,
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.create(todo);
    const action = TodoActions.create({ todo });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call update', () => {
    const todo: Todo = {
      id: '1',
      text: 'test1',
      checked: true,
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.update(todo);
    const action = TodoActions.update({ todo });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call remove', () => {
    const id = '1';
    facade.remove(id);
    const action = TodoActions.remove({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showCreateDialog', () => {
    facade.showCreateDialog();
    const action = TodoActions.showCreateDialog();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showEditDialog', () => {
    const todo: Todo = {
      id: '1',
      text: 'test1',
      checked: true,
      createdAt: 1000000,
      updatedAt: 2000000
    };
    facade.showEditDialog(todo);
    const action = TodoActions.showEditDialog({ todo });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call showRemoveDialog', () => {
    const id = '1';
    facade.showRemoveDialog(id);
    const action = TodoActions.showRemoveDialog({ id });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});