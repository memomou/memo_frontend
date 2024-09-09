import { useParams } from "react-router-dom";
import Content from "./Content";
import { SideBar } from "./SideBar";
import { PageContainer } from "./UsersPostPage.style";

import { authorAtom, authorCategoriesAtom, selectedCategoriesAtom } from "../../../components/atom/atoms";

import { useRecoilState } from "recoil";
import { useEffect } from "react";
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
  const selectedCategoryObj = authorCategories?.find((category) => category.categoryName === selectedCategoryName);
  useEffect(() => {
    if (selectedCategoryObj && selectedCategory?.id !== selectedCategoryObj.id) {
      console.log('Selected Category:', selectedCategoryObj);
      setSelectedCategory(selectedCategoryObj);
    } else {
      console.log('Selected Category:', selectedCategoryObj);
      setSelectedCategory(undefined);
    }
  }, [selectedCategoryObj]);

  useEffect(() => {
    console.log('SideBar:', nickname);
    const fetchAuthorInformation = async () => {
      try {
        {
          const response = await axiosInstance.get(`/users/nickname/${nickname}`);
          if (author?.id !== response.data.user.id) {
            console.log('Author:', response);
            setAuthor(response.data.user);
          }
        }
        {
          const categories = await axiosInstance.get(`/categories`, {
            params: {
              userId: author?.id,
            }
          });
          console.log('Categories:', categories);
          setAuthorCategories(categories.data.categories);
        }

      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (nickname)
      fetchAuthorInformation();
    return () => {
    };
  }, []);
  return (
    <PageContainer>
      <SideBar />
      <Content />
    </PageContainer>
  );
}
