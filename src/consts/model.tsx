// テーブルのデータ型を定義する

export type Workspace = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Channel = {
  id: string;
  name: string;
  createUserId: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
};

export type MessageUser = {
  id: string;
  text: string;
  channelId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userUsername: string;
  userPassword: string;
  userEmail: string;
  userCreatedAt: string;
  userUpdatedAt: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
