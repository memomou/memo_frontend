import { Element } from 'slate'

export type UserType = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  role: 'admin' | 'user'| null | undefined;
};
