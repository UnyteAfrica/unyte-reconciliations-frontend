import { saveAs } from "file-saver";
import { BiDownload } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type DataType = { [key: string]: string }[];

type DownloadButtonProps = {
  data: DataType;
  className?: string;
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  className,
}) => {
  // Convert data (array of objects) to CSV format
  const convertToCSV = (data: DataType) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const handleDownload = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  return (
    <button
      onClick={handleDownload}
      className={twMerge("bg-[#25D366] rounded text-white", className)}
    >
      <div className="space-x-2 flex flex-row items-center px-4 py-2 ">
        <span className="text-base">Download</span>
        <BiDownload />
      </div>
    </button>
  );
};
