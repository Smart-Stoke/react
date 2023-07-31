export type Role = 'user' | 'admin';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};

type Token = {
  token: string;
  expires: Date;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type AuthUser = {
  user: User;
  tokens: Tokens;
};
