import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

export type Workspace = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  workspace: Workspace | undefined;
};

const WorkspaceNameArea = (props: Props) => {
  return (
    <WorkspaceNameContainer>
      <WorkspaceName>
        {props.workspace === undefined ? "" : props.workspace.name}
      </WorkspaceName>
    </WorkspaceNameContainer>
  );
};

export default WorkspaceNameArea;

const WorkspaceNameContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${ColorConsts.ColorTheme.background};
  border: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
`;

const WorkspaceName = styled.div`
  font-weight: 800;
  font-size: 18px;
`;
