import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { moviesApi } from './reducers/MoviesSlice';
import tabSlice from './reducers/TabSlice';
import filterSlice from './reducers/FilterSlice';


const combRed = combineReducers({
    [moviesApi.reducerPath]: moviesApi.reducer,
    tab: tabSlice.reducer,
    filter: filterSlice.reducer
})
export const store = configureStore({
    reducer: combRed,
    middleware: (getDefaultMiddleware: any) => (
        getDefaultMiddleware().concat(moviesApi.middleware)
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

