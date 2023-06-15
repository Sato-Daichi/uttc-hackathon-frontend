import { SideNameContainer } from "./SideName";

const CreateChannelButton = (props: {
  setShowModal: (showModal: boolean) => void;
}) => {
  return (
    <SideNameContainer
      hover={true}
      onClick={() => {
        props.setShowModal(true);
      }}
    >
      + チャンネルを新規作成
    </SideNameContainer>
  );
};

export default CreateChannelButton;
