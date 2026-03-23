import type { ReactNode } from "react";
import BasicCell from "./BasicCell";

export default function BasicTextCell({ children, isCode }: { children?: ReactNode, isCode?: boolean }) {
  return <BasicCell>
    <p className="block text-sm text-slate-800">
      {isCode ? <code>{children}</code> : children}
    </p>
  </BasicCell>
}