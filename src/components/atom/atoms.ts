import { atom } from "recoil";

interface UserState {
  id?: number;
  email?: string;
  nickname?: string;
  role?: string;
}

export const userAtom = atom<UserState | undefined>({
  key: 'user',
  default: undefined,
});
