import axios, { AxiosResponse } from "axios";
import { getRefreshToken } from "utils/getTokens";

const http = axios.create({
  baseURL: `https://sea-lion-app-43ury.ondigitalocean.app`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// http.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: { config: any; response: { status: number } }) => {
//     const refreshToken = getRefreshToken();
//     const config = error.config;
//     if (error.response) {
//       if (error.response.status === 401 && !config._retry) {
//         config._retry = true;
//         try {
//           const { data } = await http.post("/auth/token/refresh/", {
//             refresh: refreshToken,
//           });
//           console.log("interceptor");
//           const { access } = data;
//           localStorage.setItem(
//             "token",
//             JSON.stringify({
//               access_token: access,
//               refresh_token: refreshToken,
//             })
//           );
//           http.defaults.headers["Authorization"] = "Bearer " + access;
//           return http(config);
//         } catch (error) {
//           return Promise.reject(error);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    const refreshToken = getRefreshToken();
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      try {
        const { data } = await http.post("/auth /token/refresh/", {
          refresh: refreshToken,
        });
        console.log("interceptorv");
        const { access } = data;
        localStorage.setItem(
          "token",
          JSON.stringify({
            access_token: access,
            refresh_token: refreshToken,
          })
        );
        prevRequest.headers["Authorization"] = "Bearer " + access;
        return http(prevRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export default http;
