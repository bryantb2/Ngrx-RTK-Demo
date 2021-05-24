import { NgModule } from '@angular/core';
import { ReduxStore } from './store';
import { TodoThunks } from './thunks';
import { ModalService } from './services';

@NgModule({
  providers: [
    ReduxStore,
    TodoThunks,
    ModalService
  ]
})
export class TodoStoreModule {}
