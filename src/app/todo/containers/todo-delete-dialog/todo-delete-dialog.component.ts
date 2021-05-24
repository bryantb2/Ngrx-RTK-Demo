import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import * as TodoActions from '../../actions';
import * as TodoSelectors from '../../selectors';
import { ReduxStore, RootState } from '../../store';
import { getLoading } from '../../selectors';
import { of } from 'rxjs';
import { State } from '../../states';

@Component({
  selector: 'app-todo-delete-dialog',
  templateUrl: './todo-delete-dialog.component.html',
  styleUrls: ['./todo-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDeleteDialogComponent {
  loading$ = of(this.store.getState()).pipe(
    select(TodoSelectors.getLoading)
  ); //this.store.pipe(select(TodoSelectors.getLoading));
  id: string;

  constructor(
    private store: ReduxStore,
    @Inject(MAT_DIALOG_DATA) private data: { id: string }
  ) {
    this.id = this.data.id;
  }

  remove(): void {
    this.store.dispatch(TodoActions.remove({ id: this.id }));
  }
}
