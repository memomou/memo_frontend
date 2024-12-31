import { UserState } from "./users.type";

export interface CommentType {
  id: string;
  postId?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: UserState;
}
