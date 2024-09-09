import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export type FilterState<T> = { filter: T };

export function withFilter<T>() {
  return signalStoreFeature(
    withState<FilterState<T>>({
      filter: {} as T,
    }),
    withMethods((store) => ({
      setFilter(newFilter: Partial<T>) {
        patchState(store, { filter: { ...store.filter(), ...newFilter } });
      },
    })),
  );
}
