import React from 'react'
import { userAtom } from '../../../components/atom/atoms';
import { useRecoilState } from 'recoil';
import { ContentPasswordWrapper } from './ContentPassword.style';
import { axiosInstance } from '../../../helpers/helper';

export default function ContentPassword() {
  const [user] = useRecoilState(userAtom);
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [newPasswordError, setNewPasswordError] = React.useState('');
  const [confirmError, setConfirmError] = React.useState('');

  const validatePassword = (password: string) => {
    if (password.length === 0) {
      return '비밀번호가 비어있습니다.';
    }
    if (password.length < 3 || password.length > 20) {
      return '비밀번호는 3~20자 사이여야 합니다.';
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    const newPasswordValidation = validatePassword(newPassword);
    let confirmValidation = '';

    if (newPassword !== passwordConfirm) {
      confirmValidation = '새 비밀번호가 일치하지 않습니다.';
    }

    // 에러 상태 업데이트
    setNewPasswordError(newPasswordValidation);
    setConfirmError(confirmValidation);

    // 모든 검증을 통과한 경우에만 제출
    if (!newPasswordValidation && !confirmValidation) {
      console.log('비밀번호 변경 요청');
      // TODO: API 호출
      try {
        const response = await axiosInstance.patch('/auth/password', {
          currentPassword: password,
          newPassword,
        });
        console.log(response);
        alert('비밀번호가 변경되었습니다.');
      } catch (error: any) {
        console.error(error);
        alert(`비밀번호 변경에 실패했습니다. \n\n${error.response.data.message}`);
      }
    }
  };
  return (
    <ContentPasswordWrapper>
      <span className='title'>비밀번호 관리</span>
      <div className='user-info'>
        유저 정보
      </div>
      <div className='id'>
        ID:
      </div>
      <div className='email'>
        {user?.email}
      </div>
      <form className='password-form' onSubmit={handleSubmit}>
        <div className='change-password-title'>비밀번호 변경</div>
        <div className='password-section'>
          <label htmlFor='password'>현재 비밀번호</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={handlePasswordChange}
          />
          <label htmlFor='newPassword'>새 비밀번호</label>
          <input
            type='password'
            id='newPassword'
            name='newPassword'
            onChange={handleNewPasswordChange}
          />
          {newPasswordError && <span className='error-message'>{newPasswordError}</span>}

          <label htmlFor='passwordConfirm'>새 비밀번호 확인</label>
          <input
            type='password'
            id='passwordConfirm'
            name='passwordConfirm'
            onChange={handlePasswordConfirmChange}
          />
          {confirmError && <span className='error-message'>{confirmError}</span>}
        </div>
        <button className='save-button' type='submit'>비밀번호 변경</button>
      </form>
    </ContentPasswordWrapper>
  )
}
