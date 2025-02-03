import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const BY_VALUES = [1, 3, 5] as const;
export type ByValues = (typeof BY_VALUES)[number];
type CounterState = {
  by: ByValues;
  current: number;
};
export const CounterStore = signalStore(
  withState<CounterState>({ current: 0, by: 1 }),
  withMethods((store) => {
    return {
      setBy: (by: ByValues) => patchState(store, { by }),
      addNumber: () => patchState(store, { current: store.current() + 1 }),
      minusNumber: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
  withComputed((store) => {
    return {
      getByValues: computed(() => BY_VALUES),
      disableButton: computed(() => store.current() - store.by() <= 0),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('The Counter Store Has been Created');
      const savedState = localStorage.getItem('counter-state');
      if (savedState !== null) {
        const state = JSON.parse(savedState) as unknown as CounterState;
        patchState(store, state);
      }
      watchState(store, (state) => {
        localStorage.setItem('counter-state', JSON.stringify(state));
      });
    },
    onDestroy(store) {
      console.log('The Counter Store has been DESTROYED');
    },
  }),
);
