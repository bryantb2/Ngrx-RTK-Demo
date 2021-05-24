import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { TodoCreateDto } from '../../models';
import * as TodoSelectors from '../../selectors';
import { ReduxStore } from '../../store';
import { of } from 'rxjs';
import { TodoThunks } from '../../thunks';

@Component({
  selector: 'app-todo-create-dialog',
  templateUrl: './todo-create-dialog.component.html',
  styleUrls: ['./todo-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateDialogComponent {
  form = this.fb.group({
    text: ['', Validators.required],
  });
  loading$ = this.store.state$.pipe(select(TodoSelectors.getLoading));

  constructor(private fb: FormBuilder, private store: ReduxStore, private thunks: TodoThunks) {}

  save(): void {
    const title: string = this.form.get('text')?.value;
    const todo: TodoCreateDto = {
      title,
    };
    this.thunks.addItem({ newItem: todo })
  }
}
