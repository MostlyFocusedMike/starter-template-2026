import type { ReactNode } from "react";

export default function BasicCell({ children }: { children?: ReactNode }) {
  return <td className="p-4 border-b border-slate-200">
    {children}
  </td>;
}