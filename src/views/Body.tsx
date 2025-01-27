import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Root from "./pages/root/Root";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignUpPage";
import PosterPostPage from "./pages/newPost/PosterPostPage";
import DetailPostPage from "./pages/detailPost/DetailPostPage";
import { UsersPostPage } from "./pages/usersPost/UsersPostPage";
import UserSettingPage from "./pages/userSetting/UserSettingPage";

function Body() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/:nickname/posts/saves" element={<UsersPostPage isTempPostPage={true} />} />
          <Route path="/:nickname/post/:id" element={<DetailPostPage />} />
          <Route path="/:nickname" element={<UsersPostPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/post/write" element={<PosterPostPage/>} />
          <Route path="/user/setting/:setting/*" element={<UserSettingPage />} />
        </Routes>
    </>
  );
}

export default Body;
