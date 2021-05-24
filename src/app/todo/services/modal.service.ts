import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoCreateDialogComponent, TodoDeleteDialogComponent, TodoEditDialogComponent } from '../containers';
import { Todo } from '../models';

@Injectable()
export class ModalService {
  createDialogRef?: MatDialogRef<TodoCreateDialogComponent>;
  editDialogRef?: MatDialogRef<TodoEditDialogComponent>;
  removeDialogRef?: MatDialogRef<TodoDeleteDialogComponent>;

  constructor(
    private dialog: MatDialog,
  ) {}

  showCreateDialog = () => {
    this.createDialogRef = this.dialog.open(TodoCreateDialogComponent, {
      width: '400px',
    });
  }

  showEditDialog = (itemToShow: Todo) => {
    this.editDialogRef = this.dialog.open(TodoEditDialogComponent, {
      width: '400px',
      data: { todo: itemToShow },
    });
  }

  showRemoveDialog = (id: string) => {
    this.removeDialogRef = this.dialog.open(TodoDeleteDialogComponent, {
      data: { id },
    });
  }
}
