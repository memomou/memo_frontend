import { CustomElement } from "./slate";
import { UserState } from "./users.type";

export interface CategoriesState {
  id: number;
  categoryName: string;
  pos: number;
  user: UserState;
  tempPostCount: number;
  postCount: number;
}

export interface PostFile {
  id: number;
  originalFilename: string;
  fileSize: number;
  createdAt: string;
  url: string;
};

export interface tempPostType {
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
}

export enum Visibility {
  PUBLIC = 1,
  PRIVATE = 2,
}

export enum PostStatus {
  DRAFT = 1, // 임시 글 게시판에서 작성한 글
  PUBLISHED = 2, // 게시판에서 작성한 글
  UNREGISTERED = 3, // 게시글의 일부만 올라가 있는 경우 (이미지 등을 업로드하여 자동 임시 저장이 되어있으나 게시글 작성이 완료되지 않은 경우)
}

export interface PostImageType {
  id: number;
  url: string;
}

export interface PostType {
  id: string;
  createdAt: string;
  author: UserState;
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
  category?: CategoriesState;
  postFiles: PostFile[];
  statusId: PostStatus;
  updatedAt: string;
  visibilityId: Visibility;
  tempPost?: tempPostType;
};
