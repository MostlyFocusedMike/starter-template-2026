import { authClient } from "../lib/auth-client";
import fetchHelper, { makeMutateOpts } from "./fetch-util";
import type { User } from "./types";
import type { UpdatableUserValues } from "../pages/AdminDashboard/UsersTable";
import type { QueryClient } from "@tanstack/react-query";

export const getAllUsers = async () => {
  const { data: users, error } = await authClient.admin.listUsers({
    query: {
      limit: 100,
      sortBy: "name",
      sortDirection: "desc",
    },
  });

  if (error) {
    console.error('Load all users error', error);
    throw new Error(error.message);
  }

  return { result: (users.users as unknown as User[]), metadata: { total: users.total } };
};

// outdated
export const createITEM = async (newData: unknown) => {
  return await fetchHelper<unknown>('/users', makeMutateOpts(newData));
};

export const updateUserAsAdmin = async (queryClient: QueryClient, originalUserData: User, updatedUserData: UpdatableUserValues) => {
  const { id: userId, name, email, role } = updatedUserData;
  if (!originalUserData) return console.error('Could not find original User');

  const hasUpdated = (name !== originalUserData.name && name)
    || (email !== originalUserData.email && email)
    || (role !== originalUserData.role);

  if ((name !== originalUserData.name && name) || (email !== originalUserData.email && email)) {
    const opts = { userId, data: { name: name.trim(), email: email.trim() } };
    const { error } = await authClient.admin.updateUser(opts);
    if (error) console.error(error);
  }

  if (role !== originalUserData.role) {
    const opts = { userId, role: role as 'user' | 'admin' };
    const { error } = await authClient.admin.setRole(opts);
    if (error) console.error(error);
  }

  if (hasUpdated) queryClient.invalidateQueries({ queryKey: ['USERS'] });
};

export const updateUserPasswordAsAdmin = async (userId: string, newPassword: string) => {
  return await authClient.admin.setUserPassword({ userId, newPassword });
};