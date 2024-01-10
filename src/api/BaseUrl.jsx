/* eslint-disable no-undef */
import axios from "axios";
import { toast } from "react-toastify";
import { OPENSEA_API_KEY, TOAST_OPTIONS } from "../shared/constants";

const URL = process.env.REACT_APP_ENVIRONMENT === 'development' ? 'https://beta.shiny-nft.com/api/v1/user/' : "https://admin.shiny-nft.com/api/v1/user/"

//Base URL
const Axios = axios.create({
  baseURL: URL,
});

export const ClientAxios = axios.create({
  baseURL: "https://testnet.shiny-nft.com/",
});


export const OpenseaAxios = axios.create({
  baseURL: "https://api.opensea.io/api/v1/",
  headers: { 'X-API-KEY': OPENSEA_API_KEY }
});

//Interceptor for token
Axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (!req.headers.Authorization && token) {
    req.headers.Authorization = token;
    return req;
  }
  return req;
});

Axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    const { response } = err
    toast.error(response?.data?.message, TOAST_OPTIONS)
    if ((err.response && err.response.status === 417) || err.response.status === 401) {
      console.log('Un authorize')
    }
    return Promise.reject(err)
  }
)


export default Axios;

//4. https://admin.shiny-nft.com/api/v1/user/

//3. http://20.188.59.71:3000/api/v1/user/

//2. http://localhost:8080/api/v1/user/

//1. http://localhost:3000/api/v1/user/
