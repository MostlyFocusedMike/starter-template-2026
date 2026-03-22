import { authClient } from "../lib/auth-client";
import fetchHelper, { makeMutateOpts } from "./fetch-util";
import type { User } from "./types";

export const getAllUsers = async () => {
  const { data: users, error } = await authClient.admin.listUsers({
    query: {
      limit: 100,
      sortBy: "name",
      sortDirection: "desc",
    },
  });

  if (error) {
    console.error('Load all users error', error)
    throw new Error(error.message)
  }

  console.log('users:', users.users);
  return { result: (users.users as unknown as User[]), metadata: { total: users.total } };
};

// outdated
export const createITEM = async (newData: unknown) => {
  return await fetchHelper<unknown>('/users', makeMutateOpts(newData));
}