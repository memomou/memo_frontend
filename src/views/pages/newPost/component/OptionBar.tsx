import { FlattenedItem } from "../../../../components/SideBar/SortableTree/types";

interface OptionsBarProps {
  items: FlattenedItem[];
  initItemId: number;
  visibilityId: number;
  onItemChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onVisibilityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OptionsBar = ({ items, initItemId, visibilityId, onItemChange, onVisibilityChange }: OptionsBarProps) => (
  <div className="options-bar flex justify-between items-center">
      <select name="category" value={initItemId} onChange={onItemChange} className="text-base bg-white border border-gray-300 rounded-md px-2 py-1">
        <option className="text-gray-700" value={0}>카테고리 선택</option>
        {items?.map((item) => (
          <option className="text-gray-700" key={item.id} value={item.id}>
            {item.parentId ? `- ${item.name}` : item.name}
          </option>
        ))}
      </select>
    <div className="visibility-toggle">
      <select name="visibility" value={visibilityId} onChange={onVisibilityChange} className="text-base bg-white border border-gray-300 rounded-md px-2 py-1">
        <option value={1}>전체 공개</option>
        <option value={2}>비공개</option>
      </select>
    </div>
  </div>
);

export default OptionsBar;