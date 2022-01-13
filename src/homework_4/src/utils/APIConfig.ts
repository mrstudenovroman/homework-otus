import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setUserToken = (token: string): void => {
  localStorage.setItem('token', token);
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};
export const clearUserToken = (): void => {
  API.defaults.headers.common.Authorization = null;
};
