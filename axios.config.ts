import axios, { AxiosError, AxiosResponse } from "axios";
import { openErrorModal } from "store/fetchSlice";
import { store } from "store/store";
import { getRefreshToken } from "utils/getTokens";

const http = axios.create({
   baseURL: `https://sea-lion-app-43ury.ondigitalocean.app`,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

http.interceptors.response.use(
   (res) => res,
   (error: AxiosError) => {
      const dispatch = store.dispatch;

      const errorConfig = error.config;

      if (error.response?.status === 401) {
         window.location.replace("/login/select-account-type");
         dispatch(openErrorModal({ errorText: ["Session Expired, log in again"] }));
         return Promise.reject(error);
      }

      return Promise.reject(error);
   }
);

export default http;
