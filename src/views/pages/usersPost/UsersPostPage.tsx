import React, { useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { axiosInstance } from "../../../helpers/helper";
import { PageContainer } from "./UsersPostPage.style";
import { SideBar } from "../../../components/SideBar/SideBar";
import Content from "./Content";
import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom } from "../../../components/atom/atoms";
import { useAuthorInfo } from "../../../hooks/useAuthorInfo";

export function UsersPostPage() {
  const { nickname } = useParams();
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const { author, authorCategories } = useAuthorInfo(nickname);
  const [searchParams, setSearchParams] = useSearchParams();

  // 특정 쿼리 파라미터 값 가져오기
  const selectedCategoryName = searchParams.get('category');

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
