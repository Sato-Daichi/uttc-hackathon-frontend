import { createContext } from "react";

type WorkspaceContextValue = {
  workspaceId: string | undefined;
  setWorkspaceId: (workspaceId: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue>(
  {} as WorkspaceContextValue
);

export default WorkspaceContext;
