import { configureStore } from '@reduxjs/toolkit'
import authAdminSlice from './Auth/authAdminSlice'
import authUserSlice from './Auth/authUserSlice'
import authDoctorSlice from './Auth/authDoctorSlice'
import infoDoctorSlice from './Auth/infoDoctorSlice'


export const store = configureStore({
    reducer: {
        userAdmin: authAdminSlice,
        user: authUserSlice,
        userDoctor: authDoctorSlice,
        infoDoctor: infoDoctorSlice
    },
})