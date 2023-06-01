import React from "react";
import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

type Props = {
  workspaceName: string;
};

const WorkspaceNameArea = (props: Props) => {
  return (
    <WorkspaceNameContainer>
      <WorkspaceName>{props.workspaceName}</WorkspaceName>
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
