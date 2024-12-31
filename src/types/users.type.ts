import { PostImageType } from "./post";

export interface UserState {
  id?: number;
  createdAt?: string;
  email?: string;
  nickname?: string;
  role?: 'admin' | 'user'| null | undefined;
  profileImage?: PostImageType;
  profileDescription?: string;
}
