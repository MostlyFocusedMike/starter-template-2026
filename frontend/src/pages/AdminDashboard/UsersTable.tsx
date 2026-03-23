import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers as queryFn } from "../../api/user";
import useModal from "../../components/Modal/useModal";
import { useState } from "react";
import { authClient, useSession } from "../../lib/auth-client";
import EditUserModal from "./EditUserModal";
import BasicHeader from "../../components/table-elements/BasicHeader";
import BasicTextCell from "../../components/table-elements/BasicTextCell";
import BasicCell from "../../components/table-elements/BasicCell";
import BasicRow from "../../components/table-elements/BasicRow";

const defaultUpdatedUserValues = {
  id: '',
  name: '',
  email: '',
  role: 'user',
}
export type UpdatableUserValues = typeof defaultUpdatedUserValues;

export default function UsersTable() {
  const session = useSession();
  const { data: usersData, isPending, error } = useQuery({
    queryKey: ['USERS'],
    queryFn
  })
  const queryClient = useQueryClient();

  const editUserModal = useModal()
  const [updatedUserData, setUpdatedUserData] = useState<UpdatableUserValues>(defaultUpdatedUserValues);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { id: userId, name, email, role } = updatedUserData;
    const originalUserData = users.find((user) => user.id === userId)
    if (!originalUserData) return console.error('Could not find original User');

    const hasUpdated = (name !== originalUserData.name && name)
      || (email !== originalUserData.email && email)
      || (role !== originalUserData.role)

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

    editUserModal.closeModal();
  }

  const handleEditClick = (user: UpdatableUserValues) => {
    setUpdatedUserData(user);
    editUserModal.openModal();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setUpdatedUserData({ ...updatedUserData, [input.name]: input.value });
  }

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Could not load users</p>

  const { result: users } = usersData;

  return <>
    <table className="w-60 text-left table-auto min-w-max">
      <BasicHeader columns={['Email', 'Name', 'Role', '', '']} />
      <tbody>
        {
          users.map(({ id, email, role, name }) => {
            return <BasicRow key={id}>
              <BasicTextCell>{email}</BasicTextCell>
              <BasicTextCell>{name}</BasicTextCell>
              <BasicTextCell isCode>{role}</BasicTextCell>
              <BasicCell>
                <button
                  onClick={() => handleEditClick({ id, email, role, name })}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 active:scale-95 text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={id === session?.data?.user.id || name === 'Admin'}
                >Edit User</button>
              </BasicCell>
              <BasicCell>
                <button
                  className="px-4 py-1 rounded-full text-sm font-medium bg-red-800 hover:bg-red-700 active:scale-95 text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={id === session?.data?.user.id || name === 'Admin'}
                >Reset Password</button>
              </BasicCell>
            </BasicRow>
          })
        }
      </tbody>
    </table>

    <EditUserModal
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      dialogRef={editUserModal.dialogRef}
      closeModal={editUserModal.closeModal}
      updatedUserData={updatedUserData}
    />
  </>
}