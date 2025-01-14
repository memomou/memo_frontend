import React from 'react'
import { SideBarWrapper } from './SideBar.style'
import { Link, useParams } from 'react-router-dom'

export default function SideBar() {
  const { setting } = useParams();
  return (
    <SideBarWrapper>
      <ul className='side-bar-list'>
        <li className={setting === 'profile' ? 'focus' : ''}>
          <Link to='/user/setting/profile'>프로필 관리</Link>
        </li>
        <li className={setting === 'password' ? 'focus' : ''}>
          <Link to='/user/setting/password'>비밀번호 변경</Link>
        </li>
        <li className={setting === 'category' ? 'focus' : ''}>
        <Link to='/user/setting/category'>카테고리 관리</Link>
        </li>
      </ul>
    </SideBarWrapper>
  )
}
