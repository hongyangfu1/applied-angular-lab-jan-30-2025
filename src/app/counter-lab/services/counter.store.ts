import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
export const CounterStore = signalStore(
  withState({ current: 0 }),
  withMethods((store) => {
    return {
      addNumber: () => patchState(store, { current: store.current() + 1 }),
      minusNumber: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
);
