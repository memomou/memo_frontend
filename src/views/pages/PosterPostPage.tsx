import PosterNewForm from "./posterPostPage.style";
import {StyledSlateEditor, StyledEditable} from "./posterPostPage.style";
import { Styled } from "./authPage.style";

function PosterPostPage(props: any) {
  return (
    <Styled>
      <PosterNewForm $width="500px">
        <input type="text" placeholder="제목"  />
        <div className="editor-wrapper">
          <StyledSlateEditor
            renderEditable={(editableProps) => <StyledEditable {...editableProps} />}
          />
        </div>
        <button type="submit">Submit</button>
      </PosterNewForm>
    </Styled>
  );
}

export default PosterPostPage;
