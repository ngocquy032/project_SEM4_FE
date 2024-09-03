import axios from "axios";
import { API_BASE_URL, apiAdmin, apiUser } from "../../config/apiConfig";




  const All_API = {
    loginAPI:  (userData) => {
        const response =  axios.post(`${API_BASE_URL}users/login`, userData);
    return response;
    
    },
    registerAPI: (userData) => {
        const response =  axios.post(`${API_BASE_URL}users/register`, userData);
        return response;
    },
     getUserAPI:   (token) => {
        const response =  axios.get(`${API_BASE_URL}users/details`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;

    },


    
    getAllUsers:   (data) => {
        const {
            page,
            limit,
            keyword
          } = data;
        const response =  apiAdmin.get(`${API_BASE_URL}users?page=${page}&limit=${limit}&keyword=${keyword}`);
        return response;
    },

    getUserById: (userId) => {
        const response =  apiAdmin.get(`${API_BASE_URL}users/get-by-id/${userId}`);
        return response;
    },

    updateUserById: (userId, userData) => {
        const response =  apiAdmin.put(`${API_BASE_URL}users/update-by-id/${userId}`, userData);
        return response;
    },


    deleteUserById: (userId) => {
        const response =  apiAdmin.delete(`${API_BASE_URL}users/${userId}`);
        return response;
    },


    getRoleAll: () => {
        const response =  axios.get(`${API_BASE_URL}roles`);
        return response;
    },


    // updateUser:  (userId, userData) => {
    //     const response =  apiUser.put(`${API_BASE_URL}users/details/${userId}`, userData);
    // return response;
    
    // },

  }