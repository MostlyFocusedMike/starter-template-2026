import { useNavigate } from "react-router";
import { useSession, signOut } from "../../lib/auth-client";

export default function ProfilePage() {
  const { data, isPending, error } = useSession();
  const navigate = useNavigate();

  if (isPending) return <p>loading</p>;
  if (error) return <p>Error {error.message}</p>;
  if (!data) return null;

  const handleSignOut = async () => {
    await signOut({ fetchOptions: { onSuccess: () => navigate("/login") } });
  };

  const { user, session } = data;

  return <div className="m-2">
    <h1 className="text-3xl">{user.name}</h1>
    <p className="text-xl">Role: {user.role}</p>
    <p>Email: {user.email}</p>

    <p>Logs you out at {new Date(session.expiresAt).toLocaleString()}</p>

    <button onClick={handleSignOut} className="border rounded-full px-3 hover:bg-gray-200 active:bg-gray-400">Sign Out</button>
  </div>;
}
