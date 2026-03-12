import fetchHelper, { makeMutateOpts } from "./fetch-util";
import type { User } from "./types";

export const getAllUsers = async () => {
  return await fetchHelper<User[]>('/users');
};

// outdated
export const createITEM = async (newData: unknown) => {
  return await fetchHelper<unknown>('/users', makeMutateOpts(newData));
}