import axios from "axios";
// import { API_BASE_URL, apiAdmin, apiUser } from "../../config/apiConfig";
import { API_BASE_URL , apiAdmin} from "../config/apiConfig";




const All_API = {
    loginAPI: (userData) => {
        const response = axios.post(`${API_BASE_URL}users/login`, userData);
        return response;

    },
    registerAPI: (userData) => {
        const response = axios.post(`${API_BASE_URL}users/register`, userData);
        return response;
    },
    getUserAPI: (token) => {
        const response = axios.get(`${API_BASE_URL}users/details`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;

    },



    getAllUsers: (data) => {
        const {
            page,
            limit,
            keyword
        } = data;
        const response = apiAdmin.get(`${API_BASE_URL}users?limit=${limit}&page=${page}&keyword=${keyword}`);
        return response;
    },

    getUserById: (userId) => {
        const response = apiAdmin.get(`${API_BASE_URL}users/get-by-id/${userId}`);
        return response;
    },

    updateUserByAdmin: (userId, userData) => {
        const response = apiAdmin.put(`${API_BASE_URL}users/admin/${userId}`, userData);
        return response;
    },


    deleteUserById: (userId) => {
        const response = apiAdmin.delete(`${API_BASE_URL}users/${userId}`);
        return response;
    },


    getRoleAll: () => {
        const response = axios.get(`${API_BASE_URL}roles`);
        return response;
    },

    // User
    // post User in Admin
    createUser: (createForm)=>{
        const response = apiAdmin.post(`${API_BASE_URL}users`, createForm)
        return response
    },
    getScheduleAll: (data) => {
        const {
            specialtyId,
            doctorId,
            dateSchedule,
            page,
            limit,
            keyword
          } = data;
        const response = apiAdmin.get(`${API_BASE_URL}schedules?limit=${limit}&page=${page}&specialtyId=${specialtyId}&doctorId=${doctorId}&dateSchedule=${dateSchedule}&keyword=${keyword}`);
        return response;
    },
    
    createSchedule: (scheduleData) => {
        const response = apiAdmin.post(`${API_BASE_URL}schedules`, scheduleData);
        return response;
    },

    getScheduleById: (scheduleId) => {
        const response = apiAdmin.get(`${API_BASE_URL}schedules/${scheduleId}`);
        return response;
    },

    updateSchedule: (scheduleId, scheduleData) => {
        const response = apiAdmin.put(`${API_BASE_URL}schedules/${scheduleId}`, scheduleData);
        return response;
    },

    
    deleteScheduleById: (scheduleId) => {
        const response = apiAdmin.delete(`${API_BASE_URL}schedules/${scheduleId}`);
        return response;
    },


    

    getAllTimeSlot: () => {
        const response = apiAdmin.get(`${API_BASE_URL}time-slots`);
        return response;
    },

    createTimeSlot: (timeSlotData) => {
        const response = apiAdmin.post(`${API_BASE_URL}time-slots`, timeSlotData);
        return response;
    },
    
    gettimeSlotById: (timeSlotId) => {
        const response = apiAdmin.get(`${API_BASE_URL}time-slots/${timeSlotId}`);
        return response;
    },

    updateTimeSlot: (timeSlotId, timeSlotData) => {
        const response = apiAdmin.put(`${API_BASE_URL}time-slots/${timeSlotId}`, timeSlotData);
        return response;
    },

    getAllBooking: (data) => {
        const {
            dateBooking,
            status,
            page,
            limit,
            keyword
          } = data;
        const response = apiAdmin.get(`${API_BASE_URL}bookings?limit=${limit}&page=${page}&dateBooking=${dateBooking}&keyword=${keyword}&status=${status}`);
        return response;
    },

    



    

    getDoctorFull: () => {
        
        const response = axios.get(`${API_BASE_URL}doctors`);
        return response;
    },

    getSpecialtyFull: () => {
        
        const response = axios.get(`${API_BASE_URL}spcialties`);
        return response;
    },


    getClinicFull: () => {
        
        const response = axios.get(`${API_BASE_URL}clinics`);
        return response;
    },

    
    getSlotTime: (specialtyId) => {
        
        const response = axios.get(`${API_BASE_URL}time-slots/specialty/${specialtyId}`);
        return response;
    },







    // updateUser:  (userId, userData) => {
    //     const response =  apiUser.put(`${API_BASE_URL}users/details/${userId}`, userData);
    // return response;

    // },


    // Một hàm call Api mẫu mn tham khảo 

    // async function createCoupon(couponData) {
    //     try{
    //       const response = await All_API.createCoupon(couponData)
    //       if(response.data.status === "success") {
    //           ToastSuccess(response.data.message)
    //           onCreate()
    //           handleCancel()
    //       }else {
    //           ToastError(response.data.message)
    //           handleCancel()
    //       }
    //   }catch (error){
    //       ToastError(error.response.data.message)
    //       handleCancel()
    //     }
    //   }

} 
export default All_API;