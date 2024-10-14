import { createSlice } from "@reduxjs/toolkit";

const infoDoctorSlice = createSlice({
  name: 'infoDoctorSlice',
  initialState: null, 
  reducers: {
    addInfoDoctor(state, action) {
      return action.payload;  // Sửa 'payloads' thành 'payload'
    },
    removeInfoDoctor(state, action) {
      return null;
    },
  },
});

const { actions, reducer } = infoDoctorSlice;
export const GetInfoDoctor = (state) => state.infoDoctor;
export const { addInfoDoctor, removeInfoDoctor } = actions;
export default reducer;
