import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as TodoActions from '../../actions';
import { Todo } from '../../models';
import * as TodoSelectors from '../../selectors';
import { ReduxStore } from '../../store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  vm$ = combineLatest([
    of(this.store.getState()).pipe(select(TodoSelectors.getLoading)),
    of(this.store.getState()).pipe(select(TodoSelectors.getTodos)),
  ]).pipe(map(([loading, todos]) => ({ loading, todos })));

  /**
   * Constructor
   */
  constructor(private store: ReduxStore) {}

  /**
   * Initialize
   */
  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadAll({ offset: 0, limit: 100 }));
  }

  /**
   * Show create dialog
   */
  showCreateDialog(): void {
    this.store.dispatch(TodoActions.showCreateDialog());
  }

  /**
   * Show edit dialog
   */
  showEditDialog(todo: Todo): void {
    this.store.dispatch(TodoActions.showEditDialog({ todo }));
  }

  /**
   * Show remove dialog
   */
  showRemoveDialog(id: string): void {
    this.store.dispatch(TodoActions.showRemoveDialog({ id }));
  }
}
