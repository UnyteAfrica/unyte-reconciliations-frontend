import PropTypes from "prop-types";

function Status({ status }) {
  return (
    <div
      className={`px-3 py-1.5 bg-opacity-10 rounded inline ${
        status === "completed"
          ? "text-[#25D366] bg-[#25D366]"
          : status === "processing"
          ? "text-[#FF9B00] bg-[#FF9B00]"
          : "text-[#4F4F4F] bg-[#4F4F4F]"
      }`}
    >
      <span className="text-sm">
        {status === "completed"
          ? "Completed"
          : status === "processing"
          ? "Processing"
          : "Submitted"}
      </span>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,  
}

export default Status;
