import { useParams } from "react-router-dom";
import Content from "./Content";
import { SideBar } from "./SideBar";
import { PageContainer } from "./UsersPostPage.style";

import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom } from "../../../components/atom/atoms";

import { useRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import { axiosInstance } from "../../../helpers/helper";

import { useSearchParams } from 'react-router-dom';

export function UsersPostPage() {
  const { nickname } = useParams();
  const [author, setAuthor] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] = useRecoilState(authorCategoriesAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);

  const [searchParams, setSearchParams] = useSearchParams();

  // 특정 쿼리 파라미터 값 가져오기
  const selectedCategoryName = searchParams.get('category');

  // 1. 저자 정보 Fetch 함수
  const fetchAuthorInformation = useCallback(async () => {
    if (!nickname) return;

    try {
      const response = await axiosInstance.get(`/users/nickname/${nickname}`);
      if (author?.id !== response.data.user.id) {
        setAuthor(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }, [nickname, author, setAuthor]);

  // 2. 저자 카테고리 Fetch 함수
  const fetchAuthorCategories = useCallback(async (userId) => {
    if (!userId) return;

    try {
      const categoriesResponse = await axiosInstance.get(`/categories`, {
        params: { userId }
      });
      console.log('Categories:', categoriesResponse);
      setAuthorCategories(categoriesResponse.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [setAuthorCategories]);

  // 4. 처음 로드 시 사용자 정보와 카테고리 정보 Fetch
  useEffect(() => {
    fetchAuthorInformation(); // Fetch author
  }, [fetchAuthorInformation]);

  useEffect(() => {
    if (author?.id) {
      fetchAuthorCategories(author.id); // Fetch categories based on author
    }
  }, [author?.id, fetchAuthorCategories]);

  // 5. 선택된 카테고리가 변경될 때마다 해당 카테고리 정보를 가져옴
  useEffect(() => {
    if (!selectedCategoryName || !authorCategories) {
      setSelectedCategory(undefined);
      return;
    }
    if (authorCategories) {
      const selectedCategoryObj = authorCategories.find((category) => category.categoryName === selectedCategoryName);
      if (selectedCategoryObj) {
        setSelectedCategory(selectedCategoryObj);
      }
    }
  }, [authorCategories, selectedCategoryName]);

  return (
    <PageContainer>
      <SideBar />
      <Content />
    </PageContainer>
  );
}
