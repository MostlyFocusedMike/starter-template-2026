import type { ReactNode } from "react";

export default function BasicRow({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-slate-50">{children}</tr>
}