import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../components/atom/atoms';
import { axiosInstance } from '../../../helpers/helper';
import { ContentProfileWrapper } from './ContentProfile.style';

export default function ContentProfile() {
  const [user, setUser] = useRecoilState(userAtom);
  console.log('user: ', user);
  console.log('user?.nickname: ', user?.nickname);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileDescription, setProfileDescription] = useState(user?.profileDescription || '');

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      console.log('response: ', response);
      setUser(response.data.user);
    } catch (error) {
      console.error('프로필 정보를 가져오는데 실패했습니다:', error);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileDescription(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      await uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      const encodedFilename = encodeURIComponent(file.name);
      const encodedFile = new File([file], encodedFilename, { type: file.type });
      formData.append('image', encodedFile);

      await axiosInstance.put('/users/me/profile/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      fetchUserProfile();
    } catch (error) {
      console.error('프로필 이미지 업로드에 실패했습니다:', error);
      alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        ...(nickname && { nickname }),
        profileDescription
      };
      await axiosInstance.patch('/users/me/profile', userData);

      alert('프로필이 성공적으로 업데이트되었습니다.');
      fetchUserProfile();
    } catch (error) {
      console.error('프로필 업데이트에 실패했습니다:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setProfileDescription(user.profileDescription || '');
      setPreviewImage(user.profileImage?.url || null);
    }
  }, [user]);

  return (
    <ContentProfileWrapper>
    <span className='title'>프로필 관리</span>
    <form onSubmit={handleSubmit}>
      <div className="profile-section">
        <div className="profile-image">
          <img src={previewImage || user?.profileImage?.url || '/defaultAvatar.png'} alt="프로필 이미지" />
          <label htmlFor="profile-image-input" className="edit-button">
            변경
          </label>
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="profile-info">
          <div className="info-item">
            <label htmlFor="nickname">닉네임</label>
            <input id="nickname" type="text" value={nickname} onChange={handleNicknameChange}
            placeholder={user?.nickname || ''}
            />
          </div>
          <div className="info-item">
            <label htmlFor="introduction">한줄 소개</label>
            <input
              id="introduction"
              type="text"
              value={profileDescription}
              onChange={handleIntroductionChange}
              placeholder="나를 한 문장으로 표현해보세요"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="save-button">
        변경사항 저장
      </button>
    </form>
    </ContentProfileWrapper>

  )
}
