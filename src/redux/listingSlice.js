import { createSlice } from "@reduxjs/toolkit";
const initialState={
    list:[],
    error:null,
    load:true
}
const listingSlice = createSlice({
    name:'listing',
    initialState,
    reducers:{
        listing:(state,actions)=>{
            state.load=true
            state.list = actions.payload
            state.load= false
        },
        LogoutList:(state)=>{
            state.list=null
        },
        createList:(state,actions)=>{
            state.load=true
            state.list=[...state.list,actions.payload]
            state.load=false
        },
        deleteList:(state,actions)=>{
            state.load=true
            state.list = state.list.filter((ele) => ele._id != actions.payload._id)
            state.load=false
        }
    }
})
export const {listing,LogoutList,createList,deleteList} = listingSlice.actions
export default listingSlice.reducer