import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { canMatchFeature } from '@shared';
import { UiComponent } from './pages/ui.component';
import { PrefsComponent } from './pages/prefs.component';
import { CounterStore } from './services/counter.store';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    canMatch: [canMatchFeature('hong-experiment')],
    component: CounterComponent,
    providers: [CounterStore],
    children: [
      {
        path: 'ui',
        canMatch: [canMatchFeature('hong-experiment')],
        component: UiComponent,
      },
      {
        path: 'prefs',
        canMatch: [canMatchFeature('hong-experiment')],
        component: PrefsComponent,
      },
    ],
  },
];
