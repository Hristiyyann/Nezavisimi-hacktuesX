import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const returnResponse = (response: AxiosResponse) => response.data;

const returnError = (error: AxiosError) => {
    const { status } = error;

    return Promise.reject({
        status: status ? +status : 400,
        success: false
    });
}
 
async function applyAccessToken(config: InternalAxiosRequestConfig) {
    const accessToken = window.localStorage.getItem('accessToken');
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    return config;
} 

const instance = axios.create({ baseURL: 'http://localhost:45855', withCredentials: true });

instance.interceptors.response.use(returnResponse, returnError); 
instance.interceptors.request.use(applyAccessToken);

export default instance;
