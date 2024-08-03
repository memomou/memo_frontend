import { useRecoilValue } from "recoil";
import Body from "./views/Body";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Wrapper from "./views/Wrapper";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userAtom } from "./components/atom/atoms";
function App() {
  const user = useRecoilValue(userAtom);
  return (
      <div className="App">
        <Router>
          <Wrapper>
            <Header />
            <Body />
            <Footer />
          </Wrapper>
        </Router>
      </div>
  );
}

export default App;
