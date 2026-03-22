import { useLocation, useNavigate } from "react-router"

export const useGoToPreviouslyFromLocation = (defaultFrom = '/profile') => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => navigate(location.state?.from?.pathname || defaultFrom);
}
