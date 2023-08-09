export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface BodyLogin {
  email: string;
  password: string;
}
