import React from "react";

function CheckBox(props) {
  return (
    <div class="form-check">
      <input className="form-check-input" type="checkbox" {...props} />
    </div>
  );
}

export default CheckBox;
