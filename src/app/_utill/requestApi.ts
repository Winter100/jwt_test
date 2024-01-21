import { requestAddress } from "./httpAddress";

interface optionType {
  method: string;
  headers?: any;
  body?: any;
}

export async function requestApi(pathName: string, option: optionType) {
  try {
    const response = await fetch(`${requestAddress}/${pathName}`, option);

    console.log("response", await response.json());

    // if (response.status === 401) {
    //   console.log("시작");
    //   const data = await retrunNewAccessToken(pathName, option);
    //   console.log("리프레쉬 완료 후 다시 요청함: ", data);
    //   return;
    // }

    if (!response.ok) {
      throw new Error("fetch 실패");
    }

    // const data = await response.json();
    console.log("fetch 완료");

    return await response.json();
  } catch (e) {
    console.log("requestApi 에러: ", e);
  }
}

export async function retrunNewAccessToken(
  pathName: string,
  option: optionType
) {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) return;

    // const formData = new FormData();
    const params = new URLSearchParams();
    params.append("refreshToken", refreshToken);

    const refreshRequestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    };

    const newTokenData = await requestApi("token", refreshRequestOption);
    console.log("newTokenData", newTokenData);

    if (newTokenData) {
      localStorage.setItem("accessToken", newTokenData.accessToken);

      return await requestApi(pathName, option);
    }

    return;
  } catch (e) {
    console.log(e);
  }
}
