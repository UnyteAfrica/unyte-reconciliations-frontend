import { PropsWithChildren } from "react";

type TableProps = {
  headers: string[];
};

export const Table: React.FC<PropsWithChildren<TableProps>> = ({
  headers,
  children,
}) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-200 text-[#333333]">
        <tr>
          {headers.map((head, i) => {
            return (
              <th key={i} className="p-4 text-center">
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white text-[#333333]">{children}</tbody>
    </table>
  );
};
