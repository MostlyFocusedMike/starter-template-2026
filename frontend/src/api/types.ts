export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type FlexibleObject = {
  [key: string]: unknown;
}