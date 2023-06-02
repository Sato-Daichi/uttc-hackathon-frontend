import React from "react";
import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";

type Props = {
  name: string;
  hover: boolean;
};

const SideName = (props: Props) => {
  return (
    <SideNameContainer hover={props.hover}># {props.name}</SideNameContainer>
  );
};

export default SideName;

// チャンネル名やDMの相手の名前を表示する
const SideNameContainer = styled.div<{ hover: boolean }>`
  padding: 0px 20px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 3px;
  height: 28px;
  line-height: 28px;
  ${(props) =>
    props.hover &&
    `:hover {
    background: ${ColorConsts.ColorTheme.basic};
    color: ${ColorConsts.ColorTheme.white};
  }`}
`;
