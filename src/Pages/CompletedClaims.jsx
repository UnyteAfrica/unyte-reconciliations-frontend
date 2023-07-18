import PropTypes from "prop-types";

import Table from "../Components/Table";

function CompletedClaims({ tableHead, tableBody }) {
  return (
    <>
      <div id="policies-table" className="mb-10">
        <Table tableHead={tableHead} tableBody={tableBody} tableType="claims" />
      </div>
    </>
  );
}

CompletedClaims.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CompletedClaims;
