export type UserType = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  role: 'admin' | 'user'| null | undefined;
};

export type PostType = {
  id: string;
  createdAt: boolean;
  author: User;
  title: string;
  content: string;
  contentSlate: string;
};
