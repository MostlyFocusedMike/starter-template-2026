
import { Navigate } from "react-router";
import { useSession } from "../../lib/auth-client"
import { isAdmin } from "../../lib/auth-utils";
import UsersTable from "./UsersTable";

export default function AdminDashboard() {
  const { data } = useSession();

  if (!isAdmin(data)) return <Navigate to="/not-found" />

  return <div>
    <h1>Admin Dashboard</h1>
    <h2>Users</h2>
    <UsersTable />
  </div>
}