import axios, { AxiosError } from "axios";
import { requestAddress } from "./httpAddress";
import {
  clearAllTokensFromLocalStorage,
  DOES_NOT_USE_TOKEN,
  getReFreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
  USES_TOKEN,
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
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

const authenticatedAxiosInstance = axios.create({
  baseURL: requestAddress,
});

export async function requestApi(
  options: optionType,
  selectedAxiosInstance: typeof USES_TOKEN | typeof DOES_NOT_USE_TOKEN
) {
  try {
    let response;

    if (selectedAxiosInstance === USES_TOKEN) {
      response = await authenticatedAxiosInstance({
        url: options.url,
        method: options.method,
        headers: options.headers,
        data: options.data,
      });
    } else if (selectedAxiosInstance === DOES_NOT_USE_TOKEN) {
      response = await unauthenticatedAxiosInstance({
        url: options.url,
        data: options.data,
      });
    } else {
      //그외의 접근들...
      return (response = "");
    }

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response;
    } else {
      // 위와 같이 작동함
      const error = e as AxiosError;
      return error.response;
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
      return Promise.reject(err);
    } catch (e) {
      console.log(e);
      return Promise.reject(err);
    }
  }
);

authenticatedAxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    try {
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
      } else {
        //err.response 속성이 401이 아닐경우의 모든 에러 핸들링 코드...
        return;
      }
    } catch (e) {
      clearAllTokensFromLocalStorage();
      alert("리프레시 만료, 로그아웃 됩니다.");
      location.href = "/";
      return;
    }
    return Promise.reject(err);
  }
);
