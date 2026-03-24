import { useState } from "react";
import { updateUserPasswordAsAdmin } from "../../api/auth-api";
import Modal from "../../lib/components/Modal";
import type { ModalDetails } from "../../lib/components/Modal/useModal";
import type { UpdatableUserValues } from "./UsersTable";

type Props = {
  modalDetails: ModalDetails;
  updatedUserData: UpdatableUserValues;
}
export default function ResetPasswordModal({ modalDetails, updatedUserData }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { error } = await updateUserPasswordAsAdmin(updatedUserData.id, newPassword);
    if (error) setErrMsg(error.message || '');
    modalDetails.closeModal();
  };

  const handleClose = () => {
    setNewPassword('');
    setErrMsg('');
  };

  return <Modal
    header={"Reset User's Password"}
    dialogRef={modalDetails.dialogRef}
    submitButtonText="Set New Password"
    headerBg="bg-red-950"
    handleClose={handleClose}
    handleSubmit={handleSubmit}
  >
    <div className="flex">
      <label htmlFor="password">New Password: </label>
      <div>
        <input
          type="text"
          id="password"
          name="password"
          className="border px-1 mx-1 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <small className="block text-sm text-red-800 m-1">{errMsg}</small>
      </div>
    </div>
  </Modal>;
}