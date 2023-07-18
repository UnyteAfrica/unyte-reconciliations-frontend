import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";

function PaginationComponent({ count, handleChange, page }) {
  return <Pagination count={count} onChange={handleChange} page={page} />;
}

PaginationComponent.propTypes = {
  count: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default PaginationComponent;
