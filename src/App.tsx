import Body from "./views/Body";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Wrapper from "./views/Wrapper";

function App() {
  return (
      <div className="App">
        <Wrapper>
          <Header />
          <Body />
          <Footer />
        </Wrapper>
      </div>
  );
}

export default App;
