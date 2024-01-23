import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { requestAddress } from "./httpAddress";
import {
  doesNotUseToken,
  getReFreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
  usesToken,
} from "./helper";

interface optionType {
  url: string;
  method: string;
  headers?: {
    [key: string]: string;
  };
  data?: any;
}

const unauthenticatedAxiosInstance = axios.create({
  baseURL: requestAddress,
  timeout: 2000,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

const authenticatedAxiosInstance = axios.create({
  baseURL: requestAddress,
  timeout: 2000,
});

export async function requestApi(
  options: optionType,
  selectedAxiosInstance: typeof usesToken | typeof doesNotUseToken
) {
  console.log("options", options);
  try {
    let response;

    if (selectedAxiosInstance === usesToken) {
      response = await authenticatedAxiosInstance({
        url: options.url,
        method: options.method,
        headers: options.headers,
        data: options.data,
      });
    } else if (selectedAxiosInstance === doesNotUseToken) {
      response = await unauthenticatedAxiosInstance({
        url: options.url,
        data: options.data,
      });
    }

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    } else {
      // 위와 같이 작동함
      const error = e as AxiosError;
      return error.response?.data;
    }
  }
}

unauthenticatedAxiosInstance.interceptors.response.use(
  (res) => {
    console.log("unAuth", res);
    return res;
  },
  async (err) => {
    try {
      console.log("로그인 또는 회원가입시 response 인터셉터 에러");
      console.log(err);
      return Promise.reject(err);
    } catch (e) {
      console.log(e);
      return Promise.reject(err);
    }
  }
);

authenticatedAxiosInstance.interceptors.response.use(
  (res) => {
    console.log("성공! 인터셉터");
    return res;
  },
  async (err) => {
    console.log("토큰이 필요한 요청시 response 인터셉터 에러");
    try {
      console.log("인터셉터 err", err);
      if (err.response.status === 401) {
        const reFreshToken = getReFreshTokenFromLocalStorage() || "테스트";
        // const reFreshToken = "임시";

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
          const config = err.config;
          config.headers.Authorization = accessToken;

          return authenticatedAxiosInstance(config);
        }
      }
    } catch (e) {
      console.log("인터셉터의 에러", e);
      localStorage.clear();
      alert("리프레시 만료, 로그아웃 됩니다.");
      location.href = "/";
      return Promise.reject(e);
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
