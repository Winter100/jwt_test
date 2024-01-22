import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { requestAddress } from "./httpAddress";
import {
  getReFreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
} from "./helper";

interface optionType {
  url: string;
  method: string;
  headers?: {
    [key: string]: string;
  };
  data?: any;
}

const instance = axios.create({
  baseURL: requestAddress,
  timeout: 2000,
});

export async function requestApi(options: optionType) {
  console.log("options", options);
  try {
    const response = await instance({
      url: options.url,
      method: options.method,
      headers: options.headers,
      data: options.data,
    });

    console.log("responseAPI: ", response);

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log("에러핸들링 테스트: ", e.response);
      console.log("에러핸들링 테스트: ", e.response?.data);
      return e.response?.data;
    }
    // const error = e as AxiosError;
    // if (error.response) {
    //   console.log("테스트", error.response.data);
    // }
  }
}

instance.interceptors.response.use(
  (res) => {
    console.log("성공! 인터셉터");
    return res;
  },
  async (err) => {
    try {
      console.log("인터셉터 err", err);
      if (err.response.status === 401) {
        const reFreshToken = getReFreshTokenFromLocalStorage();

        if (reFreshToken) {
          const reFreshTokenParams = new URLSearchParams();
          reFreshTokenParams.append("refreshToken", reFreshToken);

          const axiosResponse = await axios.post(
            `${requestAddress}/token`,
            reFreshTokenParams,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          console.log("axiosResponse", axiosResponse);

          const { accessToken, refreshToken } = axiosResponse.data;

          if (accessToken) {
            localStorage.clear();
            setAccessTokenFromLocalStorage(accessToken);
            setReFreshTokenFromLocalStorage(refreshToken);
          }

          err.config.headers.Authorization = accessToken;

          return instance(err.cofing);
        }
      } else {
        return err.response.data;
      }
    } catch (e) {
      console.log(e);
    }

    return Promise.reject(err);
  }
);

// instance.interceptors.response.use(
//   (response) => response,
//   async (e) => {
//     const error = e as AxiosError;
//     console.log("errorerrorerror", error);
//     if (error.response?.status === 403) {
//       console.log("리프레시 만료돼서 끝");
//     }
//     if (error.response?.status === 401) {
//       try {
//         console.log("인터셉터 리스폰 - 액세스 토큰 만료");
//         const reFreshToken = getReFreshTokenFromLocalStorage() as string;

//         // if (reFreshToken) {
//         const reFreshTokenParams = new URLSearchParams();
//         reFreshTokenParams.append("refreshToken", reFreshToken);

//         console.log("Asdf", reFreshToken);

//         const response = await axios.post(
//           `${requestAddress}`,
//           reFreshTokenParams,
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//             },
//           }
//         );

//         const { accessToken, refreshToken } = response.data;
//         if (accessToken && refreshToken) {
//           setAccessTokenFromLocalStorage(accessToken);
//           setReFreshTokenFromLocalStorage(refreshToken);
//         }
//         console.log("zzz", response);

//         const options = {
//           url: "hello",
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `${accessToken}`,
//           },
//         };

//         // const config = error.config as AxiosRequestConfig;
//         return instance(options);
//       } catch (e) {
//         console.log("zxcv", e);
//         const error = {
//           response: {
//             message: "리프레시 유효기간 만료",
//             status: 403,
//           },
//         };
//         return error;
//       }
//     }
//     return Promise.reject(error);
//   }
// );
