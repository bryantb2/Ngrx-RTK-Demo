import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../../models';
import * as TodoSelectors from '../../selectors';
import { ReduxStore } from '../../store';
import { TodoThunks } from '../../thunks';
import { ModalService } from '../../services';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  vm$ = combineLatest([
    this.store.state$.pipe(select(TodoSelectors.getLoading)),
    this.store.state$.pipe(select(TodoSelectors.getTodos))
  ]).pipe(
    map(
    ([loading, todos ]) =>
      ({ loading, todos })
    )
  );

  /**
   * Constructor
   */
  constructor(
    private store: ReduxStore,
    private thunks: TodoThunks,
    private modalService: ModalService
  ) {}

  /**
   * Initialize
   */
  ngOnInit(): void {
    this.thunks.loadAll({ offset: 0, limit: 100 })
    this.vm$.subscribe((state) => {
      console.log('VM updated in todo component: ', state)
    })
  }

  /**
   * Show create dialog
   */
  showCreateDialog(): void {
    this.modalService.showCreateDialog()
  }

  /**
   * Show edit dialog
   */
  showEditDialog(todo: Todo): void {
    this.modalService.showEditDialog(todo)
  }

  /**
   * Show remove dialog
   */
  showRemoveDialog(id: string): void {
    this.modalService.showRemoveDialog(id)
  }
}
