import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

const WorkspaceNameArea = () => {
  return (
    <WorkspaceNameContainer>
      <WorkspaceName>UTokyo Tech Club</WorkspaceName>
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
