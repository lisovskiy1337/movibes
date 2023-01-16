import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
    filter: number[],
    showFilter: boolean
}

const initialState = {
    filter: [],
    showFilter: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState as IState,
    reducers: {
        setFilter(state, action: PayloadAction<number>) {
            const newFilter = action.payload;
            const existingItem = state.filter.find(item => item === newFilter);
            if (existingItem) {
                state.filter = state.filter.filter(item => item !== newFilter);
                console.log(existingItem)
            }
            else { state.filter.push(newFilter) };

        },
        uncheckAllFilters(state) {
            state.filter = [];
        },
        setShowFilter(state) {
            state.showFilter = !state.showFilter
        }
    }
});


export const { setFilter, uncheckAllFilters, setShowFilter } = filterSlice.actions;

export default filterSlice;