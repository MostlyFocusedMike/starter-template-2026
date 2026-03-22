import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers as queryFn } from "../../api/user";
import useModal from "../../components/Modal/useModal";
import Modal from "../../components/Modal";
import { useState } from "react";
import { authClient, useSession } from "../../lib/auth-client";

const defaultUpdatedUserValues = {
  id: '',
  name: '',
  email: '',
  role: 'user',
}
type UpdatableValues = typeof defaultUpdatedUserValues;

export default function UsersTable() {
  const session = useSession();
  const { data: usersData, isPending, error } = useQuery({
    queryKey: ['USERS'],
    queryFn
  })
  const queryClient = useQueryClient();

  const { dialogRef, openModal, closeModal } = useModal()
  const [updatedUserData, setUpdatedUserData] = useState<typeof defaultUpdatedUserValues>(defaultUpdatedUserValues);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const originalUserData = users.find((user) => user.id === updatedUserData.id)
    if (!originalUserData) return console.error('Could not find original User')

    if (updatedUserData.name !== originalUserData.name && updatedUserData.name) {
      const { error } = await authClient.admin.updateUser({
        userId: updatedUserData.id,
        data: { name: updatedUserData.name.trim() },
      });
      if (error) console.error(error);
    }

    if (updatedUserData.role !== originalUserData.role) {
      const { error } = await authClient.admin.setRole({
        userId: `${updatedUserData.id}`,
        role: updatedUserData.role as 'user' | 'admin'
      });
      if (error) console.error(error);
    }

    queryClient.invalidateQueries({ queryKey: ['USERS'] });

    closeModal();
  }

  const handleEditClick = (user: UpdatableValues) => {
    setUpdatedUserData(user);
    openModal();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    setUpdatedUserData({ ...updatedUserData, [input.name]: input.value });
  }

  if (isPending) return <p>Loading</p>
  if (error) return <p>Could not load users</p>

  const { result: users } = usersData;

  return <>
    <table className="w-60 text-left table-auto min-w-max">
      <thead>
        <tr>
          <th className="p-4 border-b border-slate-300 bg-slate-50">
            <p className="block text-sm font-normal leading-none text-slate-500">
              Email
            </p>
          </th>
          <th className="p-4 border-b border-slate-300 bg-slate-50">
            <p className="block text-sm font-normal leading-none text-slate-500">
              Name
            </p>
          </th>
          <th className="p-4 border-b border-slate-300 bg-slate-50">
            <p className="block text-sm font-normal leading-none text-slate-500">
              Role
            </p>
          </th>
          <th className="p-4 border-b border-slate-300 bg-slate-50"></th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user) => {
            const { id, email, role, name } = user;

            return <tr key={id} className="hover:bg-slate-50">
              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                  {email}
                </p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                  {name}
                </p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                  {role}
                </p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <button
                  onClick={() => handleEditClick({ id, email, role, name })}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 active:scale-95 text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 cursor-not-allowed"
                  disabled={id === session?.data?.user.id || name === 'Admin'}
                >Edit User</button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>

    <Modal
      header={"Edit User Settings"}
      dialogRef={dialogRef}
      handleClose={closeModal}
      handleSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedUserData?.name}
          onChange={handleChange}
          className="border px-1 mx-1 rounded"
        />
      </div>
      <div className="my-2">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={updatedUserData?.email}
          onChange={handleChange}
          className="border px-1 mx-1 rounded w-65"
        />
      </div>

      <fieldset>
        <legend>Role</legend>
        <label>User
          <input
            type="radio"
            name="role"
            value="user"
            checked={updatedUserData.role === 'user'}
            onChange={handleChange}
            className="mx-1"
          />
        </label>
        <label className="mx-2">Admin
          <input
            type="radio"
            name="role"
            value="admin"
            checked={updatedUserData.role === 'admin'}
            onChange={handleChange}
            className="mx-1"
          />
        </label>
      </fieldset>
    </Modal>
  </>
}