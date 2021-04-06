import axios, { AxiosInstance } from 'axios'

const API: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_INTERNAL_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: false,
})

// Todo [+]: Add response/request Handlers

export default API
