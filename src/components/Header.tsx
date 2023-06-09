import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";

// 一番上に表示する検索バーのcontainer

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoutButton>Log out</LogoutButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background: ${ColorConsts.ColorTheme.basic};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;

export default Header;

// ログアウトボタン
const LogoutButton = styled.button`
  background: ${ColorConsts.ColorTheme.basic};
  color: ${ColorConsts.ColorTheme.white};
  border: 1px solid ${ColorConsts.ColorTheme.white};
  outline: none;
  cursor: pointer;
  font-size: ${ColorConsts.ColorTheme.basic};
  font-weight: ${FontConsts.FontWeight.bold};
  padding: 0px 20px;
  line-height: 28px;
  border-radius: 3px;
  margin-right: 10px;
  transition: 0.2s;
  :hover {
    background: ${ColorConsts.ColorTheme.white};
    color: ${ColorConsts.ColorTheme.basic};
  }
`;
