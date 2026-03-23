import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "./auth-api"


const USERS = 'USERS'

export const AUTH_QUERY_KEYS = { USERS }

export const useGetAllUsers = () => {
  return useQuery({ queryKey: [USERS], queryFn: getAllUsers })

}
