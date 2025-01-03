import { useGoogleLogin } from '@react-oauth/google';
import { GoogleButton } from './GoogleLoginButton.style';
import { axiosInstance } from '../../../../helpers/helper';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../../../types/users.type';

export const GoogleLoginButton = ({userLogin}: {userLogin: (user: any) => void}) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('tokenResponse', tokenResponse);
        const response = await axiosInstance.post('/auth/oauth/google/login', {
          accessToken: tokenResponse.access_token,
        });
        console.log('response', response);
        if (response.data.token) {
          userLogin(response.data);
        }
      } catch (error) {
        console.error('Google 로그인 실패:', error);
      }
    },
  });

  return (
    <GoogleButton
      onClick={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <img src="/google-icon.svg" alt="Google" />
      Google로 계속하기
    </GoogleButton>
  );
};