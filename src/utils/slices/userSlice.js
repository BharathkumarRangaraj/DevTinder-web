import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        adduser:(state,action)=>{
            state= action.payload
        },
        removeUser:(state,action)=>{
            state=[]
        }
    }
})

export default userSlice.reducer;
export const{adduser,removeUser}=userSlice.actions;