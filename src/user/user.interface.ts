export interface UserData {
  email: string;
  username: string;
  token?: string;
}

export interface UserRO {
  user: UserData;
}