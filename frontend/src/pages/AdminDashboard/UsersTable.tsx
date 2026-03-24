import useModal, { type ModalDetails } from "../../lib/components/Modal/useModal";
import { useState } from "react";
import { useSession } from "../../lib/auth-client";
import EditUserModal from "./ModalEditUser";
import BasicHeader from "../../lib/components/table-elements/BasicHeader";
import BasicTextCell from "../../lib/components/table-elements/BasicTextCell";
import BasicCell from "../../lib/components/table-elements/BasicCell";
import BasicRow from "../../lib/components/table-elements/BasicRow";
import { useGetAllUsers } from "../../api/auth-hooks";
import LoadingOrErrorCard from "../../lib/components/LoadingOrErrorCard";
import ResetPasswordModal from "./ModalResetPassword";

const defaultUpdatedUserValues = { id: '', name: '', email: '', role: 'user' };
export type UpdatableUserValues = typeof defaultUpdatedUserValues;

export default function UsersTable() {
  const session = useSession();
  const [updatedUserData, setUpdatedUserData] = useState<UpdatableUserValues>(defaultUpdatedUserValues);
  const { data: usersData, isPending, error } = useGetAllUsers();

  const editUserModalDetails = useModal();
  const resetPasswordModalDetails = useModal();

  const handleModalOpen = (user: UpdatableUserValues, modalDetails: ModalDetails) => {
    setUpdatedUserData(user);
    modalDetails.openModal();
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
                  onClick={() => handleModalOpen({ id, email, role, name }, editUserModalDetails)}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 active:scale-95 text-white transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={id === session?.data?.user.id || name === 'Admin'}
                >Edit User</button>
              </BasicCell>
              <BasicCell>
                <button
                  onClick={() => handleModalOpen({ id, email, role, name }, resetPasswordModalDetails)}
                  className="px-4 py-1 rounded-full text-sm font-medium bg-red-800 hover:bg-red-700 active:scale-95 text-white transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
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
      users={users}
      setUpdatedUserData={setUpdatedUserData}
    />
    <ResetPasswordModal
      modalDetails={resetPasswordModalDetails}
      updatedUserData={updatedUserData}
    />
  </>;
}