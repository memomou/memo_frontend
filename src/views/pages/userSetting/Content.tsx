import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContentWrapper } from './Content.style';
import ContentProfile from './ContentProfile';
import ContentPassword from './ContentPassword';
import { UserState } from '../../../types/users.type';

export default function Content() {
  const { setting } = useParams();  // URL 파라미터 가져오기
  // setting 파라미터에 따라 적절한 컴포넌트 렌더링
  const renderContent = () => {
    switch(setting) {
      case 'profile':
        return <ContentProfile />;
      case 'password':
        return <ContentPassword />;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}
