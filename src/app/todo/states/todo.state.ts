import { Todo } from '../models';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

/**
 * Feature name
 */
export const featureName = 'todo';

/**
 * Adapter
 */
export const adapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})

/**
 * State
 */
export type State = EntityState<Todo> & {
  loading: boolean;
  selectedId?: string;
  error?: any;
}

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  loading: false
} as State);
