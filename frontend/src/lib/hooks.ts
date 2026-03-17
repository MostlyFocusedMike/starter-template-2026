import { useLocation, useNavigate } from "react-router"
import { useSession } from "./auth-client";

export const useGoToPreviouslyFromLocation = (defaultFrom = '/profile') => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => navigate(location.state?.from?.pathname || defaultFrom);
}

export const useIsAdmin = () => {
  const { data } = useSession();

  return data?.user.role === "admin";
}