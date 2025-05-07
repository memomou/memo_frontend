import { useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageContainer } from "./UsersPostPage.style";
import { SideBar } from "../../../components/SideBar/SideBar";
import Content from "./Content";
import { authorCategoriesAtom, selectedCategoriesAtom, userAtom } from "../../../components/atom/atoms";
import CategoryMenu from "./CategoryMenu";

export function UsersPostPage({isTempPostPage = false}: {isTempPostPage?: boolean}) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const [authorCategories] = useRecoilState(authorCategoriesAtom);
  const currentUser = useRecoilValue(userAtom);
  const [searchParams] = useSearchParams();

  // URL 파라미터를 메모이제이션
  const { selectedCategoryName, selectedSubCategoryName } = useMemo(() => ({
    selectedCategoryName: searchParams.get('category'),
    selectedSubCategoryName: searchParams.get('subCategory')
  }), [searchParams]);

  // 카테고리 찾기 로직을 메모이제이션
  const findSelectedCategory = useCallback(() => {
    if (!selectedCategoryName || !authorCategories) {
      return undefined;
    }

    const selectedCategoryObj = authorCategories.find(
      (category) => category.categoryName === selectedCategoryName
    );
    
    if (!selectedCategoryObj) {
      return undefined;
    }

    const selectedSubCategoryObj = selectedCategoryObj.children.find(
      (category) => category.categoryName === selectedSubCategoryName
    );

    return selectedSubCategoryObj || selectedCategoryObj;
  }, [authorCategories, selectedCategoryName, selectedSubCategoryName]);

  // 카테고리 선택 로직을 메모이제이션
  const handleCategorySelection = useCallback(() => {
    const category = findSelectedCategory();
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(undefined);
    }
  }, [findSelectedCategory, setSelectedCategory]);

  useEffect(() => {
    handleCategorySelection();
  }, [handleCategorySelection]);

  // 컴포넌트 렌더링 부분을 메모이제이션
  const renderedContent = useMemo(() => (
    <PageContainer>
      <SideBar isTempPostPage={isTempPostPage} />
      <CategoryMenu 
        selectedCategory={selectedCategory} 
        authorCategories={authorCategories || []} 
      />
      <Content 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        currentUser={currentUser} 
        isTempPostPage={isTempPostPage} 
      />
    </PageContainer>
  ), [
    isTempPostPage,
    selectedCategory,
    authorCategories,
    setSelectedCategory,
    currentUser
  ]);

  return renderedContent;
}
