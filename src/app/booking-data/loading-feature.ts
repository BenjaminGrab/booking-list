import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SortOrder } from '../models';

export function withLoading() {
  return signalStoreFeature(
    withState<{ loading: boolean }>({
      loading: false,
    }),
    withMethods((store) => ({
      setLoading(loading: boolean) {
        patchState(store, { loading });
      },
    })),
  );
}
