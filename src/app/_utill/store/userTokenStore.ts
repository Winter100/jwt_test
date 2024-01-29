import { create } from "zustand";

interface userType {
  accessToken: string;
  refreshToken: string;

  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}
export const userTokenStore = create<userType>((set) => ({
  accessToken: "",
  refreshToken: "",
  setAccessToken: (accessToken) =>
    set((state) => ({ ...state, accessToken: accessToken })),
  setRefreshToken: (refreshToken) =>
    set((state) => ({ ...state, refreshToken: refreshToken })),
}));
