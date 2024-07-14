import { useState } from "react";
import Button from "./Button";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

interface TextProps {
  $bgColor: string;
}

interface RadiusTextProps extends TextProps {
  $radiusPx?: string;
}

const Text = styled.div<TextProps>`
  background-color: ${(props) => props.$bgColor};
  font-size: 2rem;
  height: 50px;
`;

const RadiusText = styled(Text)<RadiusTextProps>`
  border-radius: ${(props) => props.$radiusPx || "10px"};
`;

const Input = styled.input.attrs({
  type: "password",
})<TextProps>`
  background-color: ${(props) => props.$bgColor};
  font-size: 2rem;
  height: 50px;
`;

function App() {
  const [value, setValue] = useState("hi");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = e;
    console.log(value);
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  }

  return (
    <Router>
      <div className="App">
        <Container>
          <Text $bgColor="tomato">Text </Text>
          <RadiusText $bgColor="gray" $radiusPx="15px">
            RadiusText{" "}
          </RadiusText>
        </Container>
        <Input $bgColor="lightblue" />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/btn/:id" element={<Button />} />
        </Routes>
        <form onSubmit={onSubmit} >
          <input type="text" value={value} onChange={onChange} />
          <input type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Router>
  );
}

export default App;
