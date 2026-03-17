import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../../api/user"

export default function UsersList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['USERS'],
    queryFn: getAllUsers,
  })

  if (isPending) return <p>Loading</p>
  if (error) return <p>Could not load users</p>

  console.log('data:', data);
  const { result } = data;
  return <ul>
    {
      result.map((user) => {
        return <li key={user.id}>
          <p>email:  {user.email}</p>
          <p>role:  {user.role}</p>
          <button className="border rounded-full m-1 px-2 ">Edit</button>
        </li>
      })
    }
  </ul>
}