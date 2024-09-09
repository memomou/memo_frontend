import { Link, useParams } from "react-router-dom";
import {
  authorAtom,
  authorCategoriesAtom,
  selectedCategoriesAtom,
} from "../../../components/atom/atoms";
import { SideBarContainer } from "./SideBar.style";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { axiosInstance } from "../../../helpers/helper";

export function SideBar() {
  const { nickname } = useParams();
  const [author, setAuthor] = useRecoilState(authorAtom);
  const [authorCategories, setAuthorCategories] =
    useRecoilState(authorCategoriesAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoriesAtom);

  return (
    <SideBarContainer>
      <h1 className="nickname">@{author?.nickname}</h1>
      <Link to={`/${author?.nickname}`}>
        <div className={`category ${!selectedCategory ? "selected" : ""}`}> 전체 게시글 </div>
      </Link>
      {authorCategories?.map((category) => {
        return (

            <Link to={`/${author?.nickname}?category=${category.categoryName}`} key={category.id}>
              <div className={`category${category.id === selectedCategory?.id ? " selected" : ""}`}>
              {category.categoryName}
              </div>
            </Link>
        );
      })}
    </SideBarContainer>
  );
}
