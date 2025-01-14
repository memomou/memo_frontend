import React from 'react'
import { SettingWindowWrapper } from './SettingWindow.style'
import SideBar from './SideBar'
import Content from './Content'

export default function SettingWindow() {
  return (
    <SettingWindowWrapper>
      <SideBar />
      <Content />
    </SettingWindowWrapper>
  )
}
