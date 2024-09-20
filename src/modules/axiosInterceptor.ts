import axios from 'axios';
import { API_URL } from '../shared/constants';

/*
 * This interceptor will add the cognito token to any request that is going to Pigeon api
 * */
axios.interceptors.request.use(
  async (request: any) => {
    if (request.url && request.url.includes(API_URL)) {
      request.headers = {
        ...request.headers,
        Authorization: 'hello world'
      };
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
