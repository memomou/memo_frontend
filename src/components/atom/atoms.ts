import { atom } from "recoil";

interface UserState {
  isLogin: boolean;
  id?: number;
  email?: string;
  nickname?: string;
  role?: string;
}

export const userAtom = atom<UserState | undefined>({
  key: 'user',
  default: {
    isLogin: false,
    id: undefined,
    email: undefined,
    nickname: undefined,
    role: undefined,
  }
});
