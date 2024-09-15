import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { axiosInstance } from '../helpers/helper';
import { authorAtom, authorCategoriesAtom } from '../components/atom/atoms';

export function useAuthorInfo(nickname: string | undefined) {
  const [author, setAuthor] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] = useRecoilState(authorCategoriesAtom);

  const fetchAuthorInformation = useCallback(async () => {
    if (!nickname) return;

    try {
      const response = await axiosInstance.get(`/users/nickname/${nickname}`);
      if (author?.id !== response.data.user.id) {
        setAuthor(response.data.user);

        const categoriesResponse = await axiosInstance.get(`/categories`, {
          params: { userId: response.data.user.id }
        });
        setAuthorCategories(categoriesResponse.data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch user or categories:", error);
    }
  }, [nickname, author, setAuthor, setAuthorCategories]);

  useEffect(() => {
    fetchAuthorInformation();
  }, [fetchAuthorInformation]);

  return { author, authorCategories };
}