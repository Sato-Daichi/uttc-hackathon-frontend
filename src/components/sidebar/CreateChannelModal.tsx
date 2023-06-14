import {
  Button,
  ErrorText,
  FormContainer,
  TextInput,
  Title,
} from "../PopUpForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL } from "../../env";
import { useContext } from "react";
import ChannelsContext from "../../store/channels-context";
import SelectedChannelContext from "../../store/selected-channel-context";
import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import { Channel } from "../../consts/model";
import WorkspaceContext from "../../store/workspace-context";
type CreateChannelForm = {
  name: string;
  description: string;
};

const CreateChannelModal = (props: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  const { workspaceId } = useContext(WorkspaceContext);
  const { channels, setChannels } = useContext(ChannelsContext);
  const { setSelectedChannel } = useContext(SelectedChannelContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateChannelForm>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<CreateChannelForm> = async (
    data: CreateChannelForm
  ) => {
    try {
      // チャンネルを作成
      const res = await fetch(BACKEND_URL + "/channel/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          createUserId: localStorage.getItem("logInUserId"),
          workspaceId: workspaceId,
        }),
      });
      if (!res.ok) {
        console.error("failed to create channel");
        return;
      }

      const resChannel: Channel = await res.json();

      const newChannels = [...channels, resChannel];
      setChannels(newChannels);

      setSelectedChannel(resChannel);
      props.setShowModal(false);

      reset();
    } catch (error) {
      alert("チャンネルの作成に失敗しました");
      console.error(error);
    }
  };

  if (!props.showModal) return null;

  return (
    <CreateChannelModalContainer
      onClick={() => {
        props.setShowModal(false);
      }}
    >
      <CreateChannelModalWindow onClick={(e) => e.stopPropagation()}>
        <Title>チャンネルを作成</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            placeholder="チャンネル名"
            {...register("name", { required: "この項目は必須です" })}
          />
          {errors.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
          <TextInput
            type="text"
            placeholder="チャンネルの説明"
            {...register("description")}
          />
          <Button type="submit">作成</Button>
        </FormContainer>
      </CreateChannelModalWindow>
    </CreateChannelModalContainer>
  );
};

export default CreateChannelModal;

const CreateChannelModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateChannelModalWindow = styled.div`
  z-index: 1;
  background: ${ColorConsts.ColorTheme.white};
  border-radius: 10px;
`;
