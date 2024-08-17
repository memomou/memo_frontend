import { useRecoilState, useRecoilValue } from "recoil";
import Body from "./views/Body";
import Footer from "./views/Footer";
import Header from "./views/header/Header";
import Wrapper from "./views/Wrapper";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userAtom } from "./components/atom/atoms";
import "./App.css";
import { axiosInstance } from './helpers/helper';
import { useEffect } from "react";
function App() {
  const [, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/users/me');
        console.log('Login Successful:', response);
        setUser({...response.data.user});
      } catch (error) {
        console.error("Login Failed:", error);
      }
    };
    if (!localStorage.getItem('accessToken')) {
      console.log('No access token');
      return;
    }

    fetchUserData();
  }, [setUser]); // 빈 배열로 설정

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
