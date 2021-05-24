import { State, adapter } from '../states';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
const { selectAll, selectEntities } = adapter.getSelectors();

/**
 * Selectors
 */
const selectBaseState = (state: RootState) => state.todo

export const getLoading = createSelector(
  selectBaseState,
  (state) => state.loading
)

export const getError = createSelector(
  selectBaseState,
  (state) => state.error
)

export const getSelectedId = createSelector(
  selectBaseState,
  (state) => state.selectedId
);

export const getTodos = createSelector(
  selectBaseState,
  selectAll
)

export const getTodoEntities = createSelector(selectBaseState, selectEntities);

export const getTodo = createSelector(
  getSelectedId,
  getTodoEntities,
  (id, entities) => (id ? entities[id] : undefined)
);
