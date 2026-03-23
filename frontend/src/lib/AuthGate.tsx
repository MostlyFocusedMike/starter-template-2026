import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSession } from "./auth-client";

// By default, all routes are protected
const publicRoutes = [
  '/login',
  '/sign-up'
];

/**
 * This gate allows us to gracefully handle users trying to access protected routes,
 * getting redirected to login, and then being redirected right back to where they
 * were.
 *
 * It also blocks signed in users from seeing login pages when already logged in
 *
 * This is authentication, not authorization
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: userSession, isPending } = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending) return;

    if (!userSession && !publicRoutes.includes(location.pathname)) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    // can't signup or login if you already have a session
    if (userSession && (['/login', '/sign-up'].includes(location.pathname))) {
      const from = location.state?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    }
  }, [userSession, isPending, location, navigate]);

  return isPending ? null : children;
}