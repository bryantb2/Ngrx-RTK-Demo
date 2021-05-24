//import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Todo } from '../models';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

/**
 * Feature name
 */
export const featureName = 'todo';

/**
 * State
export type State = EntityState<Todo> & {
  loading: boolean;
  selectedId?: string;
  error?: any;
}

/**
 * Adapter
export const adapter = createEntityAdapter<Todo>();

/**
 * Initial state
export const initialState: State = adapter.getInitialState({
  loading: false
});

*/

export const adapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})

export type State = EntityState<Todo> & {
  loading: boolean;
  selectedId?: string;
  error?: any;
}

export const initialState: State = adapter.getInitialState({
  loading: false
} as State);
