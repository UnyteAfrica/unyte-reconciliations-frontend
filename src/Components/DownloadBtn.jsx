import { saveAs } from "file-saver";
import { BiDownload } from "react-icons/bi";
import PropTypes from "prop-types";

function DownloadBtn({ data }) {
  // Convert data (array of objects) to CSV format
  const convertToCSV = (data) => {
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
    <button onClick={handleDownload} className="bg-[#25D366] rounded">
      <div className="space-x-2 flex flex-row items-center px-4 py-2 text-white">
        <span className="text-base">Download</span>
        <BiDownload />
      </div>
    </button>
  );
}

DownloadBtn.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DownloadBtn;
