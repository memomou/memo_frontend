import { atom } from "recoil";
import { CustomElement } from "../../types/slate";

interface UserState {
  id?: number;
  createdAt?: string;
  email?: string;
  nickname?: string;
  role?: 'admin' | 'user'| null | undefined;
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

export interface PostType {
  id: string;
  createdAt: string;
  author: UserState;
  title: string;
  content: string;
  contentSlate: (CustomElement)[];
  category: CategoriesState;
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
