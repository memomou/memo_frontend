import { useRecoilState } from "recoil";
import Body from "./views/Body";
import Footer from "./views/Footer";
import Header from "./views/header/Header";
import Wrapper from "./views/Wrapper";
import { BrowserRouter as Router } from "react-router-dom";
import { userAtom } from "./components/atom/atoms";
import "./App.css";
import { axiosInstance } from './helpers/helper';
import { useEffect } from "react";
function App() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/users/me');
        if (response.data.user && response.data.user.id !== user?.id) {
          console.log('set user data Successful:', response);
          setUser({...response.data.user});
        }
        console.log('already setted same user data');
      } catch (error) {
        console.error("failed to get user data:", error);
      }
    };
    if (!localStorage.getItem('accessToken')) {
      console.log('No access token');
      return;
    }
    if (user?.id) {
      fetchUserData();
    }
  }, [setUser, user?.id]); // 빈 배열로 설정

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
