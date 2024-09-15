import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { axiosInstance } from "../../helpers/helper";
import { SideBarContainer } from "./SideBar.style";
import {
  authorAtom,
  authorCategoriesAtom,
  selectedCategoriesAtom,
  userAtom,
} from "../../components/atom/atoms";

interface SideBarProps {
  showAddCategory?: boolean;
}

export function SideBar({ showAddCategory = true }: SideBarProps) {
  const { nickname } = useParams();
  const [author] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] =
    useRecoilState(authorCategoriesAtom);
  const [selectedCategory] = useRecoilState(
    selectedCategoriesAtom
  );
  const [currentUser] = useRecoilState(userAtom);

  // 카테고리 추가 상태 관리
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const inputBtnRef = useRef<HTMLButtonElement>(null);
  const newCategoryRef = useRef<HTMLDivElement>(null);
  const isShakingRef = useRef(false);

  // 현재 사용자가 카테고리 소유자인지 확인
  const isCurrentUserOwner = currentUser?.id === author?.id;

  // 카테고리 추가 함수
  const handleAddCategory = async () => {
    if (inputRef.current && !newCategory) {
      // input 값이 비어 있으면 흔들림 효과 실행
      if (inputBtnRef.current && !isShakingRef.current) {
        inputBtnRef.current.classList.add("shake");
        isShakingRef.current = true; // 흔들림 중임을 기록
        setTimeout(() => {
          if (inputBtnRef.current) {
            inputBtnRef.current.classList.remove("shake"); // 흔들림 효과 제거
            isShakingRef.current = false; // 흔들림 종료 기록
          }
        }, 300);
      }
    } else {
      // 새로운 카테고리를 배열에 추가 (실제로는 API 호출)
      const newCategoryResponse = await axiosInstance.post('/categories', {categoryName: newCategory});
      setAuthorCategories([...authorCategories, newCategoryResponse.data]);
      console.log('New category:', newCategoryResponse);
      setNewCategory(""); // 입력 필드 초기화
      setIsAddingCategory(false); // 입력 필드 닫기
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    // 클릭한 곳이 newCategoryRef 안이 아니면 isAddingCategory를 false로 설정
    if (newCategoryRef.current && !newCategoryRef.current.contains(event.target as Node)) {
      setIsAddingCategory(false);
    }
  };

  useEffect(() => {
    if (isAddingCategory) {
      document.addEventListener("mousedown", handleClickOutside); // mousedown 이벤트 리스너 추가
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // 리스너 제거
    }

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingCategory]);

  useEffect(() => {
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCategory]); // isAddingCategory가 변경될 때마다 실행

  return (
    <SideBarContainer>
      <h1 className="nickname">@{nickname}</h1>
      <Link to={`/${author?.nickname}`}>
        <div className={`category ${!selectedCategory ? "selected" : ""}`}>
          전체 게시글
        </div>
      </Link>
      {authorCategories?.map((category, index) => {
        return (
          <Link
            to={`/${author?.nickname}?category=${category.categoryName}`}
            key={category.id || `category-${index}`}
          >
            <div
              className={`category${
                category.id === selectedCategory?.id ? " selected" : ""
              }`}
            >
              <span className="categoryName">{category.categoryName}</span>
            </div>
          </Link>
        );
      })}
      {/* 카테고리 추가 버튼 */}
      {isCurrentUserOwner && showAddCategory && !isAddingCategory && (
        <div
          className="category plus"
          onClick={() => {
            setIsAddingCategory(true);
          }}
        >
          +
        </div>
      )}
      {/* 카테고리 입력 필드 */}
      {isCurrentUserOwner && showAddCategory && (
        <div
          className={`category categoryInsert ${
            !isAddingCategory && "invisible"
          }`}
          ref={newCategoryRef}
        >
          <input
            className="categoryInput"
            type="text"
            ref={inputRef}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="카테고리 추가"
          />
          <button ref={inputBtnRef} onClick={handleAddCategory} className="">V</button>
        </div>
      )}
    </SideBarContainer>
  );
}
