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
      setUser(response.data);
      setNickname(response.data.nickname || '');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 닉네임 업데이트
      await axiosInstance.patch('/users/me/profile', { nickname });

      // 프로필 이미지 업데이트
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);
        await axiosInstance.put('/users/me/profile/images', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert('프로필이 성공적으로 업데이트되었습니다.');
      fetchUserProfile(); // 업데이트된 정보 다시 불러오기
    } catch (error) {
      console.error('프로필 업데이트에 실패했습니다:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <UserSettingContainer>
      <h1>사용자 설정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
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
        <button type="submit">저장</button>
      </form>
    </UserSettingContainer>
  );
}

export default UserSettingPage;
