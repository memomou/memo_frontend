import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageContainer } from "./UsersPostPage.style";
import { SideBar } from "../../../components/SideBar/SideBar";
import Content from "./Content";
import { selectedCategoriesAtom, userAtom } from "../../../components/atom/atoms";
import { useAuthorInfo } from "../../../hooks/useAuthorInfo";
export function UsersPostPage({isTempPostPage = false}: {isTempPostPage?: boolean}) {
  const { nickname } = useParams();
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const { authorCategories } = useAuthorInfo(nickname);
  const currentUser = useRecoilValue(userAtom);
  const [searchParams] = useSearchParams();

  // 특정 쿼리 파라미터 값 가져오기
  const selectedCategoryName = searchParams.get('category');

  // 선택된 카테고리가 변경될 때마다 해당 카테고리 정보를 가져옴
  useEffect(() => {
    if (!selectedCategoryName || !authorCategories) {
      setSelectedCategory(undefined);
      return;
    }
    const selectedCategoryObj = authorCategories.find((category) => category.categoryName === selectedCategoryName);
    if (selectedCategoryObj) {
      setSelectedCategory(selectedCategoryObj);
    }
  }, [authorCategories, selectedCategoryName, setSelectedCategory]);

  return (
    <PageContainer>
      <SideBar isTempPostPage={isTempPostPage} />
      <Content selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} currentUser={currentUser} isTempPostPage={isTempPostPage} />
    </PageContainer>
  );
}
