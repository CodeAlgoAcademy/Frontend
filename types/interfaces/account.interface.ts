export interface IStore {
  user: IUser;
  access_token: string;
}

export interface IUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: {
    id: number;
    role_name: string;
    description: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
