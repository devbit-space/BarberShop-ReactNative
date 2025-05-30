import axios from "axios";
import { config } from "../config/config";
axios.defaults.baseURL = config.BACKEND_URL + '/api/';

const restApi = {
  postRequest: async (url: string, data?: any) => {
    console.log(url, data)
    const result = await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log("result.data", result.data)
    return result.data
  },

  setAuthToken: (token: string) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  login: async (data: any) => {
    const result = await axios.post("login", data)
    return result.data
  },

  register: async (data: any) => {
    const result = await axios.post("signup", data)
    return result.data
  },

  sendEmail: async (data: any) => {
    const result = await axios.post("sendEmail", data)
    return result.data
  },

  verifyCode: async (data: any) => {
    const result = await axios.post("verifyCode", data)
    return result.data
  },

  resetPassword: async (data: any) => {
    const result = await axios.post("resetPassword", data)
    return result.data
  },

  loginStatus: async (authToken: any) => {
    const result = await axios.post("loginStatus", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    })
    console.log(result)

    return result.data
  },

  getChatHistories: async (authToken: any) => {
    const result = await axios.post("getChatHistories", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    })

    return result.data
  },

  sendContent: async (data: any) => {
    const result = await axios.post("sendcontent", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return result.data;
  },

  speechToText: async (data: any) => {
    const result = await axios.post("speechToText", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return result.data
  },
}

export { restApi };