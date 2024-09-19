import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../components/atom/atoms';
import { axiosInstance } from '../../../helpers/helper';
import { UserSettingContainer } from './UserSettingPage.style';

function UserSettingPage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      console.log('프로필 정보:', response.data);
      setUser(response.data.user);
      setNickname(response.data.user.nickname || '');
    } catch (error) {
      console.error('프로필 정보를 가져오는데 실패했습니다:', error);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.patch('/users/me/profile', { nickname });
      alert('닉네임이 성공적으로 업데이트되었습니다.');
      fetchUserProfile();
    } catch (error) {
      console.error('닉네임 업데이트에 실패했습니다:', error);
      alert('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage) {
      alert('업로드할 이미지를 선택해주세요.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', profileImage);
      await axiosInstance.put('/users/me/profile/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      fetchUserProfile();
    } catch (error) {
      console.error('프로필 이미지 업데이트에 실패했습니다:', error);
      alert('프로필 이미지 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <UserSettingContainer>
      <h1>사용자 설정</h1>
      <form onSubmit={handleNicknameSubmit}>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <button type="submit">닉네임 저장</button>
      </form>
      <form onSubmit={handleImageSubmit}>
        <div>
          <label htmlFor="profileImage">프로필 이미지:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {previewImage && (
          <div>
            <img src={previewImage} alt="프로필 미리보기" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        <button type="submit">이미지 저장</button>
      </form>
    </UserSettingContainer>
  );
}

export default UserSettingPage;
