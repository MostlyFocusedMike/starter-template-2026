import { useSession } from "../lib/auth-client";
import { NavLink } from "react-router";

export default function MainHeader() {
  const linkClass = "[&.active]:underline"
  const { data } = useSession();

  return <header className="w-full bg-slate-950 text-slate-50 p-2 flex justify-end border-b-2 border-slate-400">
    <nav>
      <ul className="flex gap-2">
        <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
        {data && <li><NavLink to="/profile" className={linkClass} end>Profile</NavLink></li>}

        {!data && <li><NavLink to="/login" className={linkClass} end>Login</NavLink></li>}
        {!data && <li><NavLink to="/sign-up" className={linkClass} end>Sign Up</NavLink></li>}
      </ul>
    </nav>
  </header>
}