import { configureStore } from '@reduxjs/toolkit'
import authAdminSlice from './Auth/authAdminSlice'
import authUserSlice from './Auth/authUserSlice'
export const store = configureStore({
    reducer: {
        userAdmin: authAdminSlice,
        user: authUserSlice
       
    },
})