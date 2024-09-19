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
    }




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