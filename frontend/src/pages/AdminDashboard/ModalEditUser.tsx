import { useQueryClient } from "@tanstack/react-query";
import { updateUserAsAdmin } from "../../api/auth-api";
import Modal from "../../lib/components/Modal";
import type { ModalDetails } from "../../lib/components/Modal/useModal";
import type { UpdatableUserValues } from "./UsersTable";
import type { User } from "../../api/types";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  modalDetails: ModalDetails;
  setUpdatedUserData: Dispatch<SetStateAction<UpdatableUserValues>>;
  updatedUserData: UpdatableUserValues
  users: User[];
}
export default function EditUserModal({ updatedUserData, modalDetails, setUpdatedUserData, users }: Props) {
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const originalUserData = users.find((user) => user.id === updatedUserData.id);
    if (!originalUserData) return console.error('Could not find original User');

    updateUserAsAdmin(queryClient, originalUserData, updatedUserData);
    modalDetails.closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setUpdatedUserData({ ...updatedUserData, [input.name]: input.value });
  };

  return <Modal
    header="Edit User Settings"
    dialogRef={modalDetails.dialogRef}
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
  </Modal>;
}