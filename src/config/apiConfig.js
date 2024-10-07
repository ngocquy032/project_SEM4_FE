import axios from "axios"

export const API_BASE_URL =  "http://localhost:8082/api/v1/"


const jwt = localStorage.getItem("jwt")
const jwtAdmin = localStorage.getItem("jwtAdmin")
// const jwtDoctor = localStorage.getItem("jwtDoctor")
const jwtDoctor = "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTYxMjMiLCJ1c2VySWQiOjYsInN1YiI6IjAxMjM0NTYxMjMiLCJleHAiOjE3MzA4MTM3Njd9.QGu34NTMxRiYSaibQmuvVU141i0r_sXEaQv4KhIr9j0"




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


export const apiDoctor = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtDoctor}`,
        'Content-Type':"application/json"
    }
})