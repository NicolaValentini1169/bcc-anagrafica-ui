import React from "react";
import { NavLink } from "react-router-dom";

const PrivateNavLink = ({ isAuthoraized = true, label, ...rest }) => {
  return isAuthoraized ? (
    <NavLink className="nav-item nav-link navButton" {...rest}>
      {label}
    </NavLink>
  ) : null;
};

export default PrivateNavLink;
