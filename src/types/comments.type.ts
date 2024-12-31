import { UserState } from "./users.type";

export interface CommentType {
  id?: number;
  content?: string;
  createdAt?: string;
  user?: UserState;
}