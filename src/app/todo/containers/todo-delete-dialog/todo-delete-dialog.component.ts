import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as TodoSelectors from '../../selectors';
import { ReduxStore } from '../../store';
import { TodoThunks } from '../../thunks';
import { select } from '../../selectors';

@Component({
  selector: 'app-todo-delete-dialog',
  templateUrl: './todo-delete-dialog.component.html',
  styleUrls: ['./todo-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDeleteDialogComponent {
  loading$ = this.store.state$.pipe(
    select(TodoSelectors.getLoading)
  );
  id: string;

  constructor(
    private store: ReduxStore,
    private thunks: TodoThunks,
    @Inject(MAT_DIALOG_DATA) private data: { id: string }
  ) {
    this.id = this.data.id;
  }

  remove(): void {
    this.thunks.removeItem({ itemId: this.id })
  }
}
