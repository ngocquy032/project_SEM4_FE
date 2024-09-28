
import {  createSlice } from "@reduxjs/toolkit";


const authUserSlice = createSlice({
    name: 'authUserSlice',
    initialState: null, 
    reducers: {
        addUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = authUserSlice
export const GetUser = (state) => state.user
export const { addUser, removeUser} = actions
export default reducer