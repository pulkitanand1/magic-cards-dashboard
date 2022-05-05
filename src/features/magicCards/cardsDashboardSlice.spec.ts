import cardsDashboardReducer, { CardsDashboardState} from './cardsDashboardSlice';

describe('dashboard user', () => {
    const initialState: CardsDashboardState = {
        value: [],
        status: 'idle'
    }

    it('should handle initial state', () => {
        expect(cardsDashboardReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });
});