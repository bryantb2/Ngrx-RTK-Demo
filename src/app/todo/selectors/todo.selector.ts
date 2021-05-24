import { State, adapter } from '../states';
import { createSelector } from '@reduxjs/toolkit';
const { selectAll, selectEntities } = adapter.getSelectors();

/**
 * Selectors
 */
const selectBaseState = (state: State) => state

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
