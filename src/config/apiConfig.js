import axios from "axios"

export const API_BASE_URL =  "http://localhost:8082/api/v1/"


const jwt = localStorage.getItem("jwt")
// const jwtAdmin = localStorage.getItem("jwtAdmin")
const jwtAdmin = "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3OCIsInVzZXJJZCI6Miwic3ViIjoiMDEyMzQ1Njc4IiwiZXhwIjoxNzI5MzI3MDY2fQ.0Rcc9YSdKGN_JLtn6cHzGPqi9T-X7pwio4O2L_XiCsc"


export const apiAdmin = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtAdmin}`,
        'Content-Type':"application/json"
    }
})

export const apiUser = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        'Content-Type':"application/json"
    }
})