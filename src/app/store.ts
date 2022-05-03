import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cardsDashboardSlice from '../features/magicCards/cardsDashboardSlice';

export const store = configureStore({
    // List of reducers that'd be involved in data fetching, each slice maintains its own state through pure functions.
    reducer: {
        cardsOnDashboard: cardsDashboardSlice
    }
});

// Instead of exposing the store we only expose the types needed by hooks.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;