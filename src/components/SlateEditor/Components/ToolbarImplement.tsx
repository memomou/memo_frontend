import { BlockButton, MarkButton } from "../components";
import { ReactComponent as BoldIcon } from "../Toolbar/assets/icons/BoldIcon.svg";
import { ReactComponent as ItalicIcon } from "../Toolbar/assets/icons/ItalicIcon.svg";
import { Toolbar } from "../components";
import HeadingButton from "./HeadingButton";
const ToolbarImplement = () => {
  return (
    <Toolbar className="toolbar">
      <MarkButton format="bold" icon="format_bold">
        <BoldIcon />
      </MarkButton>
      <MarkButton format="italic" icon="format_italic">
        <ItalicIcon />
      </MarkButton>
      <HeadingButton level={1} />
      <HeadingButton level={2} />
      <HeadingButton level={3} />
      <BlockButton format="numbered-list" icon="format_list_numbered" />
      <BlockButton format="bulleted-list" icon="format_list_bulleted" />
    </Toolbar>
  );
};

export default ToolbarImplement;
