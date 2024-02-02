import { create } from "zustand";

interface socialNameType {
  socialLoginName: string;
  setSocialLoginName: (name: string) => void;
}

export const useSocialLoginName = create<socialNameType>((set) => ({
  socialLoginName: "",

  setSocialLoginName: (name: string) => set(() => ({ socialLoginName: name })),
}));
