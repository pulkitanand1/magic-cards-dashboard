import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DashboardFilters } from '../../DataTypes/DashboardFilters';
import { MagicCardItem } from '../../DataTypes/MagicCardItem';
import { fetchCardsAfterFilterAsync } from './magicCardsAPI';

interface CardsDashboardState{
    value: MagicCardItem[];
    status: 'idle' | 'loading' | 'failed'
}

const initialState = {
    value : [],
    status: 'idle'
} as CardsDashboardState;


export const getCardsForDashboardAsync = createAsyncThunk(
    'cards/getDashboardData',
    async (filters: DashboardFilters) => {
        const magicCards = await fetchCardsAfterFilterAsync(filters)
                .then((data) => data.map(d => d as MagicCardItem));
        return magicCards;
    }
)

export const cardsDashboardSlice = createSlice({
    name : 'magicCards',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsForDashboardAsync.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(getCardsForDashboardAsync.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'idle'
        }),
        builder.addCase(getCardsForDashboardAsync.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const selectCards = (state: RootState) => state.cardsOnDashboard.value;

export default cardsDashboardSlice.reducer;