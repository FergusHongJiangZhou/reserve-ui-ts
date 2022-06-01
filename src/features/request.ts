import axios, { AxiosRequestConfig } from "axios";

const requestObj: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};

const client = axios.create(requestObj);

client.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = async (config: AxiosRequestConfig) => {
  try {
    const { data } = await client(config);

    if(!data.data && data.errors) {
      throw new Error(data.errors[0]?.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default request;
