import PropTypes from "prop-types";

import Table from "../Components/Table";

function PendingClaims({ tableHead, tableBody }) {
  return (
    <>
      <div id="policies-table" className="mb-10">
        <Table tableHead={tableHead} tableBody={tableBody} tableType="claims" />
      </div>
    </>
  );
}

PendingClaims.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PendingClaims;
