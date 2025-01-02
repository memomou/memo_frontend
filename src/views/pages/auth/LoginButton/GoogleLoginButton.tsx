import { useGoogleLogin } from '@react-oauth/google';
import { GoogleButton } from './GoogleLoginButton.style';
import { axiosInstance } from '../../../../helpers/helper';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../../../types/users.type';

export const GoogleLoginButton = ({setUser}: {setUser: (user: UserState) => void}) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axiosInstance.post('/auth/google', {
          token: tokenResponse.access_token,
        });

        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          setUser(response.data.user);
          navigate('/');
        }
      } catch (error) {
        console.error('Google 로그인 실패:', error);
      }
    },
  });

  return (
    <GoogleButton onClick={() => login()}>
      <img src="/google-icon.svg" alt="Google" />
      Google로 계속하기
    </GoogleButton>
  );
};