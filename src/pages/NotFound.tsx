import React, { useContext } from "react";
import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { useNavigate } from "react-router-dom";
import LogInUserContext from "../store/login-user-context";

const NotFound = () => {
  const navigate = useNavigate();
  const { logInUsername, setLogInUsername } = useContext(LogInUserContext);
  const onClickHomeButton = () => {
    // ホーム画面に遷移
    if (logInUsername) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <BackGround>
      <PopUpContainer>
        <Title>404 Page Not Found !</Title>
        <HomeButton onClick={onClickHomeButton}>ホームに戻る</HomeButton>
      </PopUpContainer>
    </BackGround>
  );
};

export default NotFound;

const BackGround = styled.div`
  background-color: ${ColorConsts.ColorTheme.background};
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpContainer = styled.div`
  background-color: ${ColorConsts.ColorTheme.white};
  width: 500px;
  height: 150px;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const HomeButton = styled.button`
  background-color: ${ColorConsts.ColorTheme.white};
  border: 1px solid ${ColorConsts.ColorTheme.black};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${ColorConsts.ColorTheme.black};
    color: ${ColorConsts.ColorTheme.white};
  }
`;
