
import {  createSlice } from "@reduxjs/toolkit";


const authDoctorSlice = createSlice({
    name: 'authDoctorSlice',
    initialState: null, 
    reducers: {
        addUserDoctor(state, action) {
            return action.payload
        },
        removeUserDoctor(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = authDoctorSlice
export const GetUserDoctor = (state) => state.userDoctor
export const { addUserDoctor, removeUserDoctor} = actions
export default reducer