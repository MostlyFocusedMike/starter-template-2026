
import { Navigate } from "react-router";
import { useSession } from "../../lib/auth-client"
import { isAdmin } from "../../lib/auth-utils";
import UsersTable from "./UsersTable";
import useModal from "../../components/Modal/useModal";
import Modal from "../../components/Modal";

export default function AdminDashboard() {
  const { data } = useSession();
  const { dialogRef, openModal, closeModal } = useModal()

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    closeModal();
  }

  if (!isAdmin(data)) return <Navigate to="/not-found" />

  return <div>
    <h1>Admin Dashboard</h1>
    <h2>Users</h2>
    <UsersTable />
    <button
      onClick={openModal}
      className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 active:scale-95 text-white transition-all"
    >TEST MODAL</button>
    <Modal
      header={"Edit User Settings"}
      dialogRef={dialogRef}
      handleClose={closeModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />

      <fieldset>
        <legend>Skill Level</legend>
        <label>
          <input type="radio" name="skill" value="beginner" defaultChecked />
          Beginner
        </label>
        <label>
          <input type="radio" name="skill" value="proficient" />
          Proficient
        </label>
      </fieldset>
    </Modal>
  </div>
}