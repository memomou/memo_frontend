import Button from "./Button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
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
  border-radius: ${(props) => props.$radiusPx || '10px'};
`;

const Input = styled.input.attrs({
  type: 'password',
})<TextProps>
  `
  background-color: ${(props) => props.$bgColor};
  font-size: 2rem;
  height: 50px;
`;

function App() {
  return (
    <Router>
      <div className="App">
      <Container>
      <Text $bgColor="tomato">Text </Text>
      <RadiusText $bgColor="gray" $radiusPx="15px">RadiusText </RadiusText>
      </Container>
      <Input $bgColor="lightblue" />
      <Routes>
        <Route path="/btn/:id" element={<Button />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
