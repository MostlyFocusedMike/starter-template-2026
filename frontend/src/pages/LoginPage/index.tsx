import { signIn, useSession } from "../../lib/auth-client";
import { useGoToPreviouslyFromLocation } from "../../lib/hooks";

export default function LoginPage() {
  const goBackToWhereUserCameFrom = useGoToPreviouslyFromLocation();
  const { refetch } = useSession();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target)) as { [key: string]: string };
    const { error } = await signIn.email({ email, password, });

    if (error) return console.error(error);

    await refetch();
    goBackToWhereUserCameFrom();
  };

  return <div className="m-2">
    <h1 className="text-3xl mb-4">Login Page</h1>
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl">Log in</h2>
      <label className="block">
        Email:
        <input type="text" name="email" className="border rounded px-1 m-1" />
      </label>
      <label className="block">
        Password:
        <input type="text" className="border rounded px-1 m-1" name="password" />
      </label>

      <button className="border rounded-xl px-3 hover:bg-gray-200 active:bg-gray-400">Submit</button>
    </form>
  </div>;
}