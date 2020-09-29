import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import repositories from './repositories/repositories'
import repository from './repository/repository'

export const store = configureStore({
  reducer: {
    repositories,
    repository,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
