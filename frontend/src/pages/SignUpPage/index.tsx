import { signUp, useSession } from "../../lib/auth-client";
import { useGoToPreviouslyFromLocation } from "../../lib/hooks";

export default function SignUpPage() {
  const goBackToWhereUserCameFrom = useGoToPreviouslyFromLocation();
  const { refetch } = useSession();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { email, password, name } = Object.fromEntries(new FormData(e.target)) as { [key: string]: string }

    try {
      const { error } = await signUp.email({ email, password, name });

      if (error) return console.error(error)

      await refetch();
      goBackToWhereUserCameFrom();
    } catch (error) {
      console.log('it really fucked:', error);
    }
  }

  return <div className="m-2">
    <h1 className="text-3xl mb-4">Sign up!</h1>
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl">Create your user</h2>
      <label className="block">
        Email:
        <input type="text" name="email" className="border rounded px-1 m-1" />
      </label>
      <label>
        Name:
        <input type="text" className="border rounded px-1 m-1" name="name" />
      </label>
      <label className="block">
        Password:
        <input type="text" className="border rounded px-1 m-1" name="password" />
      </label>

      <button className="border rounded-full px-3 hover:bg-gray-200 active:bg-gray-400">Submit</button>
    </form>
  </div>;
}