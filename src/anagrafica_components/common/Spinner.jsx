import React from "react";

function Spinner(props) {
  return (
    <React.Fragment>
      <span class="spinner-border text-success mb-1" role="status">
        <span class="sr-only">Loading...</span>
      </span>
    </React.Fragment>
  );
}

export default Spinner;
