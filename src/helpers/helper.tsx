import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.backendUri,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem('accessToken');
    if (accesstoken) {
      config.headers['Authorization'] = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };