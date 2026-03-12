import { Navigate } from "react-router";
import { useSession } from "../../lib/auth-client"

export default function ProfilePage() {
  const { data, isPending, error } = useSession();

  if (isPending) return <p>loading</p>
  if (error) return <p>Error {error.message}</p>
  if (!data) return <Navigate to="/" />

  const { user, session } = data;

  return <div className="m-2">
    <h1>{user.name}</h1>
    <p>Email: {user.email}</p>
    <p>Logs you out at {new Date(session.expiresAt).toLocaleString()}</p>
  </div>
}