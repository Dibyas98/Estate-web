import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            console.log(action);
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutSuccess:(state) =>{
            state.currentUser = null
        }
    }
})

export const {signinFailure, signinStart , signinSuccess,signoutSuccess} = userSlice.actions;
export default userSlice.reducer;