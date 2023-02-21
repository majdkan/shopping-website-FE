import axios from "axios";

const url = 'http://localhost:8080';

export const axiosConfig = {
  baseURL: url
};
axios.defaults.withCredentials = false;

export const axiosInstance = axios.create(axiosConfig);