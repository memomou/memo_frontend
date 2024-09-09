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

export const authorAtom = atom<UserState | undefined>({
  key: 'author',
  default: undefined,
});

interface CategoriesState {
  id: number;
  categoryName: string;
  pos: number;
  user: UserState;
}

export const authorCategoriesAtom = atom<CategoriesState[]>({
  key: 'authorCategories',
  default: [],
});

export const selectedCategoriesAtom = atom<CategoriesState | undefined>({
  key: 'selectedCategory',
  default: undefined,
});
