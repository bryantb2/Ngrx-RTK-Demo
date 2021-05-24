import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { Todo, TodoUpdateDto } from '../../models';
import * as TodoSelectors from '../../selectors';
import { ReduxStore } from '../../store';
import { of } from 'rxjs';
import { TodoThunks } from '../../thunks';

@Component({
  selector: 'app-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditDialogComponent implements OnInit {
  form = this.fb.group({
    text: ['', Validators.required],
  });
  loading$ = of(this.store.getState()).pipe(select(TodoSelectors.getLoading));
  todo: Todo;

  constructor(
    private fb: FormBuilder,
    private store: ReduxStore,
    private thunks: TodoThunks,
    @Inject(MAT_DIALOG_DATA) private data: { todo: Todo }
  ) {
    this.todo = this.data.todo;
  }

  ngOnInit(): void {
    this.form.setValue({
      text: this.todo.title,
    });
  }

  save(): void {
    const title = this.form.get('text')?.value as string;
    const todo: TodoUpdateDto = {
      id: this.todo.id,
      completed: this.todo.completed,
      title,
    };
    this.thunks.updateItem({ updatedItem: todo })
  }
}
