import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../components/atom/atoms";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserLogin = (data: any) => {
    setUser(data.user);
    localStorage.setItem('accessToken', data.token.accessToken);
    localStorage.setItem('refreshToken', data.token.refreshToken);
    console.log('location.state', location.state);
    const from = location.state?.from?.pathname || '/';
    const search = location.state?.from?.search || '';
    navigate(`${from}${search}`);
  };

  return { handleUserLogin };
};