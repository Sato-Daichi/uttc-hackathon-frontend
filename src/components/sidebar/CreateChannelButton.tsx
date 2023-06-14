import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";

const CreateChannelButton = (props: {
  setShowModal: (showModal: boolean) => void;
}) => {
  return (
    <CreateChannelButtonContainer
      onClick={() => {
        props.setShowModal(true);
      }}
    >
      + チャンネルを追加
    </CreateChannelButtonContainer>
  );
};

export default CreateChannelButton;

const CreateChannelButtonContainer = styled.button<{ onClick: any }>`
  padding: 0px 20px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 3px;
  height: 28px;
  line-height: 28px;

  :hover {
    background: ${ColorConsts.ColorTheme.basic};
    color: ${ColorConsts.ColorTheme.white};
    cursor: pointer;
  }

  /* ボタン特有のUIを削除する */
  border: none;
  background: none;
  outline: none;
  text-align: left;
  text-decoration: none;
`;
