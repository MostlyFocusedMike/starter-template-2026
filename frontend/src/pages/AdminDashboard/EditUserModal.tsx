import Modal from "../../components/Modal"
import type { UpdatableUserValues } from "./UsersTable";

type Props = {
  modalDetails: {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    closeModal: () => void | undefined;
    openModal: () => void | undefined;
  };
  handleSubmit: (_e: React.SubmitEvent<Element>) => Promise<void>;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  updatedUserData: UpdatableUserValues
}
export default function EditUserModal({ updatedUserData, modalDetails, handleChange, handleSubmit }: Props) {
  return <Modal
    header={"Edit User Settings"}
    dialogRef={modalDetails.dialogRef}
    handleClose={modalDetails.closeModal}
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
}