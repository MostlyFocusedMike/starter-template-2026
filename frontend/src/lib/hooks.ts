import { useLocation, useNavigate } from "react-router";

// This works in conjunction with the auth gate properly setting the .from
export const useGoToPreviouslyFromLocation = (defaultFrom = '/profile') => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => navigate(location.state?.from?.pathname || defaultFrom);
};
