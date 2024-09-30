const OptionsBar = ({ categories, selectedCategoryId, visibilityId, onCategoryChange, onVisibilityChange }) => (
  <div className="options-bar">
    <div>
      <select name="category" value={selectedCategoryId} onChange={onCategoryChange}>
        <option value={0}>카테고리 선택</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
    <div className="visibility-toggle">
      <select name="visibility" value={visibilityId} onChange={onVisibilityChange}>
        <option value={1}>전체 공개</option>
        <option value={2}>비공개</option>
      </select>
    </div>
  </div>
);

export default OptionsBar;