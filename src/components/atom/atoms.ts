import { atom } from "recoil";
import { Element} from "slate";
import { UserState } from "../../types/users.type";
import { CategoriesState, PostStatus, PostType, Visibility } from "../../types/post";

export const userAtom = atom<UserState | undefined>({
  key: 'user',
  default: undefined,
});

export const authorAtom = atom<UserState | undefined>({
  key: 'author',
  default: undefined,
});


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
