import { useMediaQuery } from "@/utils/hooks";
import { DeviceTableEntry } from "../../types/types";
import { Table } from "../table";

type DevicesTableProps = {
  deviceTableEntries: DeviceTableEntry[];
};

export const DevicesTable: React.FC<DevicesTableProps> = ({
  deviceTableEntries,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {deviceTableEntries.map((entry, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {entry.device.name}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {entry.policyType}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">
                {entry.device.model}
              </em>
              <em className="not-italic text-[#828282]">{entry.device.imei}</em>
            </div>
          </div>
        ))}
      </div>
    );

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
