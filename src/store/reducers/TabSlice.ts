import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITab } from "../../types/ITab";



interface ITabContext {
    tabIndex: number,
    posterUrlFetch: string,
    tabData: {
        fetchUrl: string;
        title: string;
    }[]
}

const initialState = {
    tabIndex: 0,
    posterUrlFetch: 'movie/popular',
    tabData: [
        { fetchUrl: 'movie/popular', title: 'Trending' },
        { fetchUrl: 'movie/upcoming', title: 'Upcoming' },
        { fetchUrl: 'tv/popular', title: 'TV Series' },
    ]
}

const tabSlice = createSlice({
    name: 'tab',
    initialState: initialState as ITabContext,
    reducers: {
        changeTab(state, action: PayloadAction<ITab>) {
            const newItem = action.payload;
            return {
                tabIndex: newItem.tabIndex,
                posterUrlFetch: newItem.posterUrlFetch,
                tabData: [...newItem.tabData],
              };
        }
    }
});


export const { changeTab } = tabSlice.actions;

export default tabSlice;