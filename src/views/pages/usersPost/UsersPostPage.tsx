import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PageContainer } from "./UsersPostPage.style";
import { SideBar } from "../../../components/SideBar/SideBar";
import Content from "./Content";
import { postsAtom, PostType, selectedCategoriesAtom } from "../../../components/atom/atoms";
import { useAuthorInfo } from "../../../hooks/useAuthorInfo";
import { axiosInstance } from "../../../helpers/helper";

export function UsersPostPage() {
  const { nickname } = useParams();
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const {author, authorCategories } = useAuthorInfo(nickname);
  const [, setPosts] = useRecoilState(postsAtom);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!author?.id) return;
        if (selectedCategoryName && selectedCategoryName !== selectedCategory?.categoryName) {
          return;
        }
        // 카테고리가 선택되어 있고, 선택된 카테고리가 변경되지 않았을 때만 해당 카테고리의 게시글을 가져옴
        if (selectedCategory && selectedCategory.categoryName !== selectedCategoryName) {
          console.log('카테고리 업데이트중이라 미요청함');
          console.log('Selected category:', selectedCategory);
          return;
        }

        const response = await axiosInstance.get('/posts', {
          params: {
            author_id: author?.id,
            category_id: selectedCategory?.id,
          },
        });
        console.log('Posts:', response);
        const fetchedPosts = response.data.posts.data as PostType[];
        fetchedPosts.map((post) => {
          post.content = post.content.replace(/<[^>]+>/g, '');
          return post;
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [selectedCategory, author?.id, setPosts, selectedCategoryName]);

  return (
    <PageContainer>
      <SideBar />
      <Content />
    </PageContainer>
  );
}
