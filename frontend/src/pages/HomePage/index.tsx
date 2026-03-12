import { useSession } from "../../lib/auth-client"

export default function HomePage() {
  const { data, error, isPending, isRefetching, /* refetch */ } = useSession();
  console.log('isPending:', isPending);
  console.log('isRefetching:', isRefetching);
  console.log('error:', error);
  console.log('thing:', data);

  return <div className="m-2">
    <h1 className="text-3xl font-bold">
      hello_world
    </h1>
  </div>
}