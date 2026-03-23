export default function BasicHeader({ columns }: { columns: string[] }) {
  return <thead>
    <tr>
      {
        columns.map((columnName, idx) => {
          return <th key={idx} className="p-4 border-b border-slate-300 bg-slate-50">
            <p className="block text-sm font-normal leading-none text-slate-500">
              {columnName}
            </p>
          </th>
        })
      }
    </tr>
  </thead>
}