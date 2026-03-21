import { useQuery } from "@tanstack/react-query"
import { getAllUsers as queryFn } from "../../api/user"

export default function UsersTable() {
  const { data, isPending, error } = useQuery({ queryKey: ['USERS'], queryFn })

  if (isPending) return <p>Loading</p>
  if (error) return <p>Could not load users</p>

  const { result: users } = data;
  return <table className="w-60 text-left table-auto min-w-max">
    <thead>
      <tr>
        <th className="p-4 border-b border-slate-300 bg-slate-50">
          <p className="block text-sm font-normal leading-none text-slate-500">
            Email
          </p>
        </th>
        <th className="p-4 border-b border-slate-300 bg-slate-50">
          <p className="block text-sm font-normal leading-none text-slate-500">
            Name
          </p>
        </th>
        <th className="p-4 border-b border-slate-300 bg-slate-50">
          <p className="block text-sm font-normal leading-none text-slate-500">
            Role
          </p>
        </th>
        <th className="p-4 border-b border-slate-300 bg-slate-50">
          <p className="block text-sm font-normal leading-none text-slate-500"></p>
        </th>
      </tr>
    </thead>
    <tbody>
      {
        users.map(({ id, email, role, name }) => {
          return <tr key={id} className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                {email}
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                {name}
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                {role}
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <button className="border rounded-full px-2 block text-sm font-semibold text-slate-800">
                Edit
              </button>
            </td>
          </tr>
        })
      }
    </tbody>
  </table>
}