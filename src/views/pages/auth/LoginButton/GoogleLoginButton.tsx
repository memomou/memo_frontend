import { useGoogleLogin } from '@react-oauth/google';
import { GoogleButton } from './GoogleLoginButton.style';
import { axiosInstance } from '../../../../helpers/helper';

export const GoogleLoginButton = ({userLogin}: {userLogin: (user: any) => void}) => {
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
      type="button"
      aria-label="Google 계정으로 시작하기"
    >
      <img
        src="/google-icon-logo.svg"
        alt=""
        width="18"
        height="18"
        style={{ marginRight: '8px' }}
      />
      <span>Google 계정으로 시작하기</span>
    </GoogleButton>
  );
};
