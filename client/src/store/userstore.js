import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:[]
    },
    reducers:{
        getUser:(state,action)=>{
            state.user.push(action.payload.id)
            console.log('the user redux',action.payload.id);
        }
    },
})

export const getUser = userSlice.actions.getUser;
export default userSlice.reducer;