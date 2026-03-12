import { NavLink } from "react-router";

export default function MainHeader() {
  const linkClass = "[&.active]:underline"

  return <header className="w-full bg-slate-950 text-slate-50 p-2 flex justify-end border-b-2 border-slate-400">
    <nav>
      <ul className="flex gap-2">
        <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
        <li><NavLink to="/more" className={linkClass} end>More</NavLink></li>
      </ul>
    </nav>
  </header>
}