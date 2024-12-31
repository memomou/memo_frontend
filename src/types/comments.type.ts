import { UserState } from "./users.type";

export interface CommentType {
  id?: number;
  postId?: number;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: UserState;
}
