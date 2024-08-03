import { atom } from "recoil";

export const userAtom = atom({
  key: 'user',
  default: {
    isLogin: false,
    id: undefined,
    email: undefined,
    nickname: undefined,
    role: undefined,
  }
});
