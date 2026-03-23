import { useQueryClient } from "@tanstack/react-query";
import { updateUserAsAdmin } from "../../api/auth-api";
import useModal from "../../components/Modal/useModal";
import { useState } from "react";
import { useSession } from "../../lib/auth-client";
import EditUserModal from "./EditUserModal";
import BasicHeader from "../../components/table-elements/BasicHeader";
import BasicTextCell from "../../components/table-elements/BasicTextCell";
import BasicCell from "../../components/table-elements/BasicCell";
import BasicRow from "../../components/table-elements/BasicRow";
import { useGetAllUsers } from "../../api/auth-hooks";
import LoadingOrErrorCard from "../../components/LoadingOrErrorCard";

const defaultUpdatedUserValues = { id: '', name: '', email: '', role: 'user' };
export type UpdatableUserValues = typeof defaultUpdatedUserValues;

export default function UsersTable() {
  const session = useSession();
  const { data: usersData, isPending, error } = useGetAllUsers();
  const queryClient = useQueryClient();

  const editUserModalDetails = useModal();
  const [updatedUserData, setUpdatedUserData] = useState<UpdatableUserValues>(defaultUpdatedUserValues);

  const handleEditUserSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const originalUserData = users.find((user) => user.id === updatedUserData.id);
    if (!originalUserData) return console.error('Could not find original User');

    updateUserAsAdmin(queryClient, originalUserData, updatedUserData);

    editUserModalDetails.closeModal();
  };

  const handleEditClick = (user: UpdatableUserValues) => {
    setUpdatedUserData(user);
    editUserModalDetails.openModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setUpdatedUserData({ ...updatedUserData, [input.name]: input.value });
  };

  if (isPending || error) return <LoadingOrErrorCard isPending error={error} />;

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
            </BasicRow>;
          })
        }
      </tbody>
    </table>

    <EditUserModal
      modalDetails={editUserModalDetails}
      updatedUserData={updatedUserData}
      handleSubmit={handleEditUserSubmit}
      handleChange={handleChange}
    />
  </>;
}