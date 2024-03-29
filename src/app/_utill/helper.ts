const ACCESS_TOKEN_KEY_NAME = "accessToken";
const REFRESH_TOKEN_KEY_NAME = "refreshToken";
const SOCIAL_NAME = "socialName";

export function getAccessTokenFromLocalStorage() {
  return localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
}

export function getReFreshTokenFromLocalStorage() {
  return localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
}
export function getSocialNameFromLocalStorage() {
  return localStorage.getItem(SOCIAL_NAME);
}

export function setAccessTokenFromLocalStorage(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, accessToken);
}
export function setReFreshTokenFromLocalStorage(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
}
export function setSocialNameFromLocalStorage(socialName: string) {
  localStorage.setItem(SOCIAL_NAME, socialName);
}

export function clearAllTokensFromLocalStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
}
export function clearSocialNameFromLocalStorage() {
  localStorage.removeItem(SOCIAL_NAME);
}

export const USES_TOKEN = "usesToken";
export const DOES_NOT_USE_TOKEN = "doesNotUseToken";
