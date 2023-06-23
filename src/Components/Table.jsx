import PropTypes from "prop-types";
import Status from "./Status"

function Table({ tableHead, tableBody, tableType }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-200 text-[#333333]">
        <tr>
          {tableHead.map((head, i) => {
            return (
              <th key={i} className="p-4 text-left">
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white text-[#333333]">
        {tableType === "policies"
          ? tableBody.map((body, i) => (
              <tr key={i} className="border-b font-medium">
                <td className="p-4">{body.ref}</td>
                <td className="p-4">{body.number}</td>
                <td className="p-4">{body.insurer}</td>
                <td className="p-4">{body.date}</td>
                <td className="p-4">{body.price}</td>
              </tr>
            ))
          : tableBody.map((body, i) => (
              <tr key={i} className="border-b font-medium">
                <td className="p-4">{body.number}</td>
                <td className="p-4">{body.email}</td>
                <td className="p-4">{body.date}</td>
                <td className="p-4">{body.insurer}</td>
                <td className="p-4"><Status status={body.status} /></td>
                <td className="p-4">{body.estimate}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableType: PropTypes.string.isRequired,
};

export default Table;
