export function getAccessTokenFromLocalStorage() {
  return localStorage.getItem("accessToken");
}

export function getReFreshTokenFromLocalStorage() {
  return localStorage.getItem("refreshToken");
}

export function setAccessTokenFromLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}
export function setReFreshTokenFromLocalStorage(refreshToken: string) {
  localStorage.setItem("refreshToken", refreshToken);
}
