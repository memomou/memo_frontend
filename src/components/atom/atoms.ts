import { atom } from "recoil";
import { CustomElement } from "../../types/slate";
import { Element} from "slate";

export enum Visibility {
  PUBLIC = 1,
  PRIVATE = 2,
}

export enum PostStatus {
  DRAFT = 1,
  PUBLISHED = 2,
  UNREGISTERED = 3,
}

export interface UserState {
  id?: number;
  createdAt?: string;
  email?: string;
  nickname?: string;
  role?: 'admin' | 'user'| null | undefined;
  profileImage?: PostImageType;
  profileDescription?: string;
}

export interface PostImageType {
  id: number;
  url: string;
}

export const userAtom = atom<UserState | undefined>({
  key: 'user',
  default: undefined,
});

export const authorAtom = atom<UserState | undefined>({
  key: 'author',
  default: undefined,
});

export interface CategoriesState {
  id: number;
  categoryName: string;
  pos: number;
  user: UserState;
}

export interface tempPostType {
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
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

const defaultValue : Element[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  }
]

export const defaultPostValue: PostType = {
  title: '',
  contentSlate: defaultValue,
  postFiles: [],
  category: undefined,
  author: {
    nickname: '',
    id: 0
  },
  content: '',
  createdAt: '',
  id: '',
  statusId: PostStatus.PUBLISHED,
  updatedAt: '',
  visibilityId: Visibility.PUBLIC,
}


export interface PostFile {
  id: number;
  originalFilename: string;
  fileSize: number;
  createdAt: string;
  url: string;
};

export const authorCategoriesAtom = atom<CategoriesState[]>({
  key: 'authorCategories',
  default: [],
});

export const selectedCategoriesAtom = atom<CategoriesState | undefined>({
  key: 'selectedCategory',
  default: undefined,
});

export const postsAtom = atom<PostType[]>({
  key: 'posts',
  default: [],
});
