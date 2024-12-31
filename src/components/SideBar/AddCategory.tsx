import { useState, useRef, useEffect } from 'react';
import { CategoriesState } from '../../types/post';
import { axiosInstance } from '../../helpers/helper';
import { RiDraggable } from 'react-icons/ri';
import { CategoryItemStyle } from './CategoryItem.style';
interface AddCategoryProps {
  onAddCategory: (newCategory: CategoriesState) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAddCategory }) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBtnRef = useRef<HTMLButtonElement>(null);
  const newCategoryRef = useRef<HTMLDivElement>(null);
  const isShakingRef = useRef(false);

  const handleAddCategory = async () => {
    if (inputRef.current && !newCategory) {
      if (inputBtnRef.current && !isShakingRef.current) {
        inputBtnRef.current.classList.add("shake");
        isShakingRef.current = true;
        setTimeout(() => {
          if (inputBtnRef.current) {
            inputBtnRef.current.classList.remove("shake");
            isShakingRef.current = false;
          }
        }, 300);
      }
    } else {
      const newCategoryResponse = await axiosInstance.post('/categories', { categoryName: newCategory });
      onAddCategory(newCategoryResponse.data);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (newCategoryRef.current && !newCategoryRef.current.contains(event.target as Node)) {
      setIsAddingCategory(false);
    }
  };

  useEffect(() => {
    if (isAddingCategory) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingCategory]);

  useEffect(() => {
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingCategory]);

  return (
    <CategoryItemStyle>
      {!isAddingCategory && (
        <div className="buttonWrapper category plus" onClick={() => setIsAddingCategory(true)}>
          +
        </div>
      )}
      {isAddingCategory && (
        <div className="buttonWrapper category categoryInsert" ref={newCategoryRef}>
          <input
            className="categoryInput"
            type="text"
            ref={inputRef}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="카테고리 추가"
          />
          <button ref={inputBtnRef} onClick={handleAddCategory}>
            V
          </button>
        </div>
      )}
      <button className='hidden'>
        <RiDraggable />
      </button>
    </CategoryItemStyle>
  );
};

export default AddCategory;
