import { useEffect } from "react";
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

  // 특정 쿼리 파라미터 값 가져오기
  const selectedCategoryName = searchParams.get('category');
  const selectedSubCategoryName = searchParams.get('subCategory');

  // 선택된 카테고리가 변경될 때마다 해당 카테고리 정보를 가져옴
  useEffect(() => {
    if (!selectedCategoryName || !authorCategories) {
      setSelectedCategory(undefined);
      return;
    }
    const selectedCategoryObj = authorCategories.find((category) => category.categoryName === selectedCategoryName);
    const selectedSubCategoryObj = selectedCategoryObj?.children.find((category) => category.categoryName === selectedSubCategoryName);
    if (selectedSubCategoryObj || selectedCategoryObj) {
      console.log('selectedSubCategoryObj: ', selectedSubCategoryObj);
      console.log('selectedCategoryObj: ', selectedCategoryObj);
      setSelectedCategory(selectedSubCategoryObj || selectedCategoryObj);
    }
  }, [authorCategories, selectedCategoryName, setSelectedCategory, selectedSubCategoryName]);

  return (
    <PageContainer>
      <SideBar isTempPostPage={isTempPostPage} />
      <CategoryMenu selectedCategory={selectedCategory} authorCategories={authorCategories || []} />
      <Content selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} currentUser={currentUser} isTempPostPage={isTempPostPage} />
    </PageContainer>
  );
}
