import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name:'get',
    initialState: {
        value:0,
    },
    reducers: {
        add : state => {
            state.value +=1;
        },
        remove: state => {
            state.value -=1;
        },
    }
})

export const {add,remove} = slice.actions

export default slice.reducer;