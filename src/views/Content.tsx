import Button from "../components/Button";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RadiusText } from "../components/Text";
import Input from "../components/Input";
import Form from "../components/Form";

import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.ContentbgColor};
  border-right: 1px solid black;
`;

function Content() {
  return (
    <Styled>
      <Router>
        <Routes>
          <Route path="/components/form" element={<Form></Form>} />
          <Route
            path="/components/text"
            element={
              <RadiusText $bgColor="gray" $radiusPx="15px">
                RadiusText{" "}
              </RadiusText>
            }
          />
          <Route path="/components/input" element={<Input />} />
          <Route path="/btn/:id" element={<Button />} />
        </Routes>
      </Router>
    </Styled>
  );
}

export default Content;
