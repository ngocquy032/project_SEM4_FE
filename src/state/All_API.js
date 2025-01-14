import axios from "axios";
// import { API_BASE_URL, apiAdmin, apiUser } from "../../config/apiConfig";
import { API_BASE_URL, apiAdmin, apiDoctor, apiUser } from "../config/apiConfig";




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

    updateUserByUser: (userId, userData) => {
        const response = apiUser.put(`${API_BASE_URL}users/details/${userId}`, userData);
        return response;
    },
    // get bookingUser
    getBookingUser: (token, userId) => {
        const response = axios.get(`${API_BASE_URL}bookings/user/${userId}`, {
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
    createUser: (createForm) => {
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
        const response = axios.get(`${API_BASE_URL}schedules/${scheduleId}`);
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
        const response = apiAdmin.get(`${API_BASE_URL}bookings?limit=${limit}&page=${page}&dateBooking=${dateBooking}&keyword=${keyword}&status=${encodeURIComponent(status)}`);
        return response;
    },

    getBookingByIdAdmin: (idBooking) => {
        const response = apiAdmin.get(`${API_BASE_URL}bookings/${idBooking}`);
        return response;
    },

    updateBookingAdmin: (idBooking, status) => {
        const response = apiAdmin.put(`${API_BASE_URL}bookings/status/${idBooking}?status=${status}`);
        return response;
    },


    getAllMedications: (data) => {
        const {
            page,
            limit,
            keyword
        } = data;
        const response = axios.get(`${API_BASE_URL}medications?limit=${limit}&page=${page}&keyword=${keyword}`);
        return response;
    },

    createMedication: (medicationData) => {
        const response = apiAdmin.post(`${API_BASE_URL}medications`, medicationData);
        return response;
    },

    getMedicationById: (idMedication) => {
        const response = apiAdmin.get(`${API_BASE_URL}medications/${idMedication}`);
        return response;
    },

    updateMedication: (idMedication, medicationData) => {
        const response = apiAdmin.put(`${API_BASE_URL}medications/${idMedication}`, medicationData);
        return response;
    },

    deleteMedicationById: (idMedication) => {
        const response = apiAdmin.delete(`${API_BASE_URL}medications/${idMedication}`);
        return response;
    },


    getAllSpecialty: (data) => {
        const {
            page,
            limit,
            keyword
        } = data;
        const response = axios.get(`${API_BASE_URL}specialties?limit=${limit}&page=${page}&keyword=${keyword}`);
        return response;
    },

    createSpecialty: (specialtyData) => {
        const response = apiAdmin.post(`${API_BASE_URL}specialties`, specialtyData);
        return response;
    },

    getSpecialtyById: (idSpecialty) => {
        const response = apiAdmin.get(`${API_BASE_URL}specialties/${idSpecialty}`);
        return response;
    },

    updateSpecialty: (idSpecialty, specialtyData) => {
        const response = apiAdmin.put(`${API_BASE_URL}specialties/${idSpecialty}`, specialtyData);
        return response;
    },

    deleteSpecialtyById: (idSpecialty) => {
        const response = apiAdmin.delete(`${API_BASE_URL}specialties/${idSpecialty}`);
        return response;
    },


    getAllDoctor: (data) => {
        const {
            page,
            limit,
            specialtyId,
            keyword
        } = data;
        const response = axios.get(`${API_BASE_URL}doctors?limit=${limit}&page=${page}&specialtyId=${specialtyId}&name=${keyword}`);
        return response;
    },

    createDoctor: (doctorData) => {
        const response = apiAdmin.post(`${API_BASE_URL}doctors`, doctorData);
        return response;
    },

    getDoctorById: (idDoctor) => {
        const response = apiAdmin.get(`${API_BASE_URL}doctors/${idDoctor}`);
        return response;
    },

    updateDoctor: (idDoctor, doctorData) => {
        const response = apiAdmin.put(`${API_BASE_URL}doctors/${idDoctor}`, doctorData);
        return response;
    },

    deleteDoctorById: (idDoctor) => {
        const response = apiAdmin.delete(`${API_BASE_URL}doctors/${idDoctor}`);
        return response;
    },


    uploadImage: (token, imageData) => {
        const response = axios.post(`${API_BASE_URL}images/uploads`, imageData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;

    },



    getAllClinic: (data) => {
        const {
            page,
            limit,
            keyword
        } = data;
        const response = axios.get(`${API_BASE_URL}clinics?limit=${limit}&page=${page}&keyword=${keyword}`);
        return response;
    },

    createClinic: (clinicData) => {
        const response = apiAdmin.post(`${API_BASE_URL}clinics`, clinicData);
        return response;
    },

    getClinicById: (idClinic) => {
        const response = apiAdmin.get(`${API_BASE_URL}clinics/${idClinic}`);
        return response;
    },

    updateClinic: (idClinic, clinicData) => {
        const response = apiAdmin.put(`${API_BASE_URL}clinics/${idClinic}`, clinicData);
        return response;
    },

    deleteClinicById: (idClinic) => {
        const response = apiAdmin.delete(`${API_BASE_URL}clinics/${idClinic}`);
        return response;
    },



    getAllInvoice: (data) => {
        const {
            dateRefund,
            status,
            page,
            limit,
            keyword
        } = data;
        const response = apiAdmin.get(`${API_BASE_URL}refundInvoices?limit=${limit}&page=${page}&dateRefund=${dateRefund}&keyword=${keyword}&status=${encodeURIComponent(status)}`);
        return response;
    },

    confirmRefunded: (invoiceId) => {
        const response = apiAdmin.put(`${API_BASE_URL}refundInvoices/refunded/${invoiceId}`);
        return response;
    },

    sendContact: (messageData)=> {
        const response =  axios.post(`${API_BASE_URL}contacts`, messageData);
        return response;
    },

    getAllContact: (data)=> {
        const {
            page,
            limit,
            keyword,
            status
          } = data;
        const response =  apiAdmin.get(`${API_BASE_URL}contacts?page=${page}&limit=${limit}&keyword=${keyword}&status=${status}`);
        return response;
    },

    getContactById: (id) => {
        const response =  apiAdmin.get(`/contacts/${id}`)
        return response;
    },
    
    updateContact: (id, contactData ) => {
        const response =  apiAdmin.put(`/contacts/${id}`, contactData)
        return response;
    },

    deleteContact: (id ) => {
        const response =  apiAdmin.delete(`/contacts/${id}`)
        return response;
    },



    getDoctorFull: () => {

        const response = axios.get(`${API_BASE_URL}doctors`);
        return response;
    },

    getSpecialtyFull: () => {

        const response = axios.get(`${API_BASE_URL}specialties`);
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

    getUserFull: (roleName) => {
        const response = apiAdmin.get(`${API_BASE_URL}users/role?roleName=${roleName}`);
        return response;
    },



    getDoctorBySpecialty: (specialtyId) => {

        const response = axios.get(`${API_BASE_URL}doctors?specialtyId=${specialtyId}`);
        return response;
    },


    getScheduleByDoctor: (idDoctor, dateSchedule) => {

        const response = axios.get(`${API_BASE_URL}schedules/doctor?doctorId=${idDoctor}&dateSchedule=${dateSchedule}`);
        return response;
    },




  createBooking: (bookingData) => {
        const response = apiUser.post(`${API_BASE_URL}bookings`, bookingData);
        return response;
    },



    getUrlBank: (bookingId, total)=> {
        const amount = total * 24000;
        const roundedAmount = Math.round(amount);
        const response =  apiUser.get(`${API_BASE_URL}payment/vn-pay?bookingId=${bookingId}&amount=${roundedAmount}`)
        return response;
    },

    payBookingSuccess: (bookingId, vnp_TransactionNo, vnp_ResponseCode)=> {
        const response =  apiUser.put(`${API_BASE_URL}bookings/payBooking/${bookingId}?vnp_TransactionNo=${vnp_TransactionNo}&vnp_ResponseCode=${vnp_ResponseCode}`)
        return response;
    },

    getBookingDetailUser: (userId,bookingId )=> {
        const response =  apiUser.get(`${API_BASE_URL}bookings/user/${userId}/detail?bookingId=${bookingId}`)
        return response;
    },


    RefundBookingUser: (userId,bookingId, DataBank )=> {
        const response =  apiUser.put(`${API_BASE_URL}bookings/user/${userId}/detail?bookingId=${bookingId}`, DataBank)
        return response;
    },


    getHistoryByUser: (bookingId)=> {
        const response =  apiUser.get(`${API_BASE_URL}histories/${bookingId}`)
        return response;
    },

    
    changeScheduleByUser: (userId,bookingId, idSchedule )=> {
        const response =  apiUser.put(`${API_BASE_URL}bookings/user/${userId}/change?bookingId=${bookingId}&scheduleId=${idSchedule}`)
        return response;
    },


    getHistoryByDoctor: (bookingId)=> {
        const response =  apiDoctor.get(`${API_BASE_URL}histories/${bookingId}`)
        return response;
    },

    getInfoDoctorByUserId: (userId)=> {
        const response =  apiDoctor.put(`${API_BASE_URL}doctors/user/${userId}`)
        return response;
    },
    


    getBookingByScheduleDoctor: (data) => {
        const {
            page,
            limit,
            keyword, 
            scheduleId
        } = data;
        const response = apiDoctor.get(`${API_BASE_URL}bookings/doctor?limit=${limit}&page=${page}&scheduleId=${scheduleId}&keyword=${keyword}&status=paid`);
        return response;
    },


    getBookingByDoctor: (bookingId )=> {
        const response =  apiDoctor.get(`${API_BASE_URL}bookings/${bookingId}`)
        return response;
    },


    updateHistory: (idBooking,historyData )=> {
        const response =  apiDoctor.put(`${API_BASE_URL}histories/${idBooking}`, historyData)
        return response;
    },

    getHistoryByBookingId: (bookingId )=> {
        const response =  apiDoctor.get(`${API_BASE_URL}histories/${bookingId}`)
        return response;
    },

    getAllMedicine: ()=> {
        const response =  axios.get(`${API_BASE_URL}medications`)
        return response;
    },

    sendEmailMedicine: (medicalExRs)=> {
        const response =  apiDoctor.post(`${API_BASE_URL}email/medicalResult`, medicalExRs)
        return response;
    },


    getRsInvoice: (bookingId)=> {
        const response =  apiUser.get(`${API_BASE_URL}refundInvoices/booking/${bookingId}`)
        return response;
    },

    getHistoryByAdmin: (bookingId)=> {
        const response =  apiAdmin.get(`${API_BASE_URL}histories/${bookingId}`)
        return response;
    },

    getRsInvoiceByAdmin: (bookingId)=> {
        const response =  apiAdmin.get(`${API_BASE_URL}refundInvoices/booking/${bookingId}`)
        return response;
    },

    extendSchedulesForNextWeek: ()=> {
        const response =  apiAdmin.post(`${API_BASE_URL}schedules/extend`)
        return response;
    },

    
    getAllBookingForWeek: ()=> {
        const response =  apiAdmin.get(`${API_BASE_URL}bookings/last7days`)
        return response;
    },

    getHistoryByPatient: (userId) => {
        const response = apiDoctor.get(`${API_BASE_URL}bookings/history/user/${userId}?status=paid`)
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