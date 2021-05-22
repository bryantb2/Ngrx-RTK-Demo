import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TodoEffects } from './thunks';
import { reducer } from './slices';
import { featureName } from './states';

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoStoreModule {}
