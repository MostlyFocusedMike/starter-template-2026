// role is always present, but in UserWithRole it's not? pain with validation
export type User = {
  role: string;
  banned: boolean | null;
  banReason?: string | null | undefined;
  banExpires?: Date | null | undefined;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

export type FlexibleObject = {
  [key: string]: unknown;
}