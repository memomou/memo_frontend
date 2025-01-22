import React, { useState } from 'react'
import { NavLinks, NavMenuWrapper } from './NavMenu.style'
import { Link } from 'react-router-dom';

interface NavItem {
  title: string,
  link: string,
}

interface Props {
  title: string,
  navList: NavItem[],
}

const renderItems = (items: NavItem[]) => items.map((item, index) => (
  <ul key={index}>
      {item.link
          ? <Link to={item.link}>{item.title}</Link>
          : <span>
                {item.title}
            </span>
      }
  </ul>
))

export default function NavMenu({title, navList}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavMenuWrapper
    >
      {/* 모바일 버전 메뉴 버튼 css 를 container1 로 변경 (container 라는 클래스는 tailwind 에서 사용하는 클래스이므로 사용하지 않음)  */}
      <div className="container1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="title">{title}</div>
        <div className={`hamburger ${isOpen ? 'close' : ''}`}>
                    <span className="meat"></span>
                    <span className="meat"></span>
                    <span className="meat"></span>
                    <span className="meat"></span>
                </div>
      </div>
      <NavLinks className={`menu ${isOpen ? 'active' : ''}`}
        $itemCount={navList.length}
        onClick={() => setIsOpen(false)}
      >
        <span></span>
        {renderItems(navList)}
        <span></span>
      </NavLinks>
    </NavMenuWrapper>
  )
}

