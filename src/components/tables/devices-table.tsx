import { DeviceTableEntry } from "../../types/types";
import { Table } from "../table";

type DevicesTableProps = {
  deviceTableEntries: DeviceTableEntry[];
};

export const DevicesTable: React.FC<DevicesTableProps> = ({
  deviceTableEntries,
}) => {
  return (
    <Table
      headers={[
        "Policy No.",
        "Device Name",
        "Model",
        "Device IMEI",
        "Policy Type",
      ]}
    >
      {deviceTableEntries.map((entry, idx) => (
        <tr key={idx} className="border-b font-medium">
          <td className="p-4 text-center">{entry.policyNo}</td>
          <td className="p-4 text-center">{entry.device.name}</td>
          <td className="p-4 text-center">{entry.device.model}</td>
          <td className="p-4 text-center">{entry.device.imei}</td>
          <td className="p-4 text-center">{entry.policyType}</td>
        </tr>
      ))}
    </Table>
  );
};
