import axios, { AxiosError, AxiosResponse } from "axios";
import { openErrorModal } from "store/fetchSlice";
import { store } from "store/store";
import { getAccessToken, getRefreshToken } from "utils/getTokens";

const http = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

http.interceptors.response.use(
   (res) => res,
   (error: AxiosError) => {
      return Promise.reject(error);
   }
);

export default http;
