import { NgModule } from '@angular/core';
import { ReduxStore } from './store';

@NgModule({
  providers: [
    ReduxStore
  ]
})
export class TodoStoreModule {}
