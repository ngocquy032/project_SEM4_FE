
import {  createSlice } from "@reduxjs/toolkit";


const authAdminSlice = createSlice({
    name: 'authAdminSlice',
    initialState: null, 
    reducers: {
        addUserAdmin(state, action) {
            return action.payload
        },
        removeUserAdmin(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = authAdminSlice
export const GetUserAdmin = (state) => state.userAdmin
export const { addUserAdmin, removeUserAdmin} = actions
export default reducer