import Modal from "../../lib/components/Modal";
import type { ModalDetails } from "../../lib/components/Modal/useModal";
import type { UpdatableUserValues } from "./UsersTable";

type Props = {
  modalDetails: ModalDetails;
  updatedUserData: UpdatableUserValues;
}
export default function ResetPasswordModal({ modalDetails }: Props) {
  return <Modal
    header={"Reset User's Password"}
    dialogRef={modalDetails.dialogRef}
    submitButtonText="Set New Password"
    headerBg="bg-red-950"
    handleSubmit={() => { }}
  >
    <div>
      <label htmlFor="password">New Password: </label>
      <input
        type="text"
        id="password"
        name="password"
        className="border px-1 mx-1 rounded"
      />
    </div>
  </Modal>;
}