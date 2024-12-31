import React, { useState, useEffect,useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { axiosInstance, changeDateFormat } from "../../../helpers/helper";
import {ContentContainer} from './Content.style';
import { Link, useSearchParams } from "react-router-dom";
import { authorAtom, selectedCategoriesAtom, authorCategoriesAtom, userAtom, postsAtom } from "../../../components/atom/atoms";
import { PostStatus, PostType } from "../../../types/post";

export const Content = ({isTempPostPage = false}: {isTempPostPage?: boolean}) => {
  const [author] = useRecoilState(authorAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);
  const [,setAuthorCategories] = useRecoilState(authorCategoriesAtom);
  const currentUser = useRecoilValue(userAtom);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const editInputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useRecoilState(postsAtom);


  useEffect(() => {
    if (editingCategoryId !== null) {
      editInputRef.current?.focus();
    }
  }, [editingCategoryId]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    console.log(e.target.value);
    const response = await axiosInstance.get('/posts', {
      params: {
        content_or_title_include: e.target.value,
        author_id: author?.id,
        category_id: selectedCategory?.id,
        status_id: isTempPostPage ? PostStatus.DRAFT : PostStatus.PUBLISHED
    }});

    const searchedPosts = response.data.posts.data as PostType[];
    searchedPosts.map((post) => {
      post.content = post.content.replace(/<[^>]+>/g, '');
      return post;
    });
    setPosts(searchedPosts);
    console.log('Searched Posts:', response);
  }

  const handleEditCategory = (categoryId: number, categoryName: string) => {
    setEditingCategoryId(categoryId);
    setEditCategoryName(categoryName);
  };

  const handleUpdateCategory = async (categoryId: number) => {
    try {
      const body = { categoryName: editCategoryName };
      console.log('카테고리 업데이트 요청 body:', body);
      console.log('카테고리 업데이트 요청 categoryId:', categoryId);

      const response = await axiosInstance.patch(`/categories/${categoryId}`, body);
      const updatedCategory = response.data;
      setAuthorCategories(prevCategories =>
        prevCategories.map(cat => cat.id === Number(categoryId) ? updatedCategory : cat)
      );
      setEditingCategoryId(null);

      // URL 쿼리 파라미터 업데이트
      if (selectedCategory?.id === Number(categoryId)) {
        setSearchParams({ category: editCategoryName });
      }
    } catch (error) {
      console.error('카테고리 수정 실패:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      // 카테고리에 속한 게시글 수 확인
      const response = await axiosInstance.get('/posts', {
        params: {
          category_id: categoryId,
          take: 1
        }
      });

      if (response.data.posts.data.length > 0) {
        alert('이 카테고리에 게시글이 있어 삭제할 수 없습니다.');
        return;
      }

      if (window.confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
        await axiosInstance.delete(`/categories/${categoryId}`);
        setAuthorCategories(prevCategories =>
          prevCategories.filter(cat => cat.id !== Number(categoryId))
        );
        if (selectedCategory?.id === Number(categoryId)) {
          setSelectedCategory(undefined);
          // 쿼리 파라미터에서 카테고리 제거
          searchParams.delete('category');
          setSearchParams(searchParams);
        }
      }
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <ContentContainer>
      <div className="recentPosterWrapper">
        <div className="topContainer">
            <span className="recentPostText">
              {searchInputValue ? `- 검색 결과 (${posts.length})` :
                editingCategoryId === selectedCategory?.id ? (
                  <>
                    <input
                      ref={editInputRef}
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <div className="mdf">
                      <button className="save-btn" onClick={() => handleUpdateCategory(selectedCategory.id)}>저장</button>
                      <span className="separator">|</span>
                      <button className="cancel-btn" onClick={() => setEditingCategoryId(null)}>취소</button>
                    </div>
                  </>
                ) : (
                  <span className="categoryName">
                    - {selectedCategory?.categoryName || "전체 게시글"}
                  </span>
                )
              }
            {currentUser?.id === author?.id && selectedCategory && !editingCategoryId && (
              <span className="mdf">
                <button className="edit-btn" onClick={() => handleEditCategory(selectedCategory.id, selectedCategory.categoryName)}>변경</button>
                <span className="separator">|</span>
                <button className="delete-btn" onClick={() => handleDeleteCategory(selectedCategory.id)}>삭제</button>
              </span>
            )}
            </span>
          <span className="searchInputWrapper">
            <svg width="17" height="17" viewBox="0 0 17 17"><path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"></path></svg>
            <input className="searchInput" type="text" placeholder="검색" value={searchInputValue} onChange={handleInputChange} />
          </span>
        </div>
        {posts.length > 0 ? (
          <div className="recentPosts">
            {posts.map((post) => (
              <Link to={`/${post.author.nickname}/post/${post.id}`} key={post.id}>
                <div className="post">
                  <div className="top-wrapper">
                    <div className="title">{post.title}</div>
                  </div>
                  <div className="content">
                    <p>{post.content}</p>
                  </div>
                  <div className="bottom-wrapper">
                    <div className="author">작성자: {post.author.nickname}</div>
                    <div className="date">{changeDateFormat(post.createdAt)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-posts-message">
            {searchInputValue
              ? "검색 결과가 없어요. 다른 키워드로 검색해보세요!"
              : "아직 작성된 글이 없어요. 첫 글을 작성해보세요!"}
          </div>
        )}
      </div>
    </ContentContainer>
  );
};

export default Content;
