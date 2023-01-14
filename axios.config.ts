import axios, { AxiosResponse } from 'axios';
import { getRefreshToken } from 'utils/getTokens';

const http = axios.create({
  baseURL: `https://sea-lion-app-43ury.ondigitalocean.app`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default http;
