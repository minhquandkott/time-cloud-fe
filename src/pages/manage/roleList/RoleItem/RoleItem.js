import "./RoleItem.css";

import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Point from "../../../../components/point/Point";

const RoleItem = ({ role, onCheckBoxChecked }) => {
  const roleId = `role${role.id}`;
  return (
    <div className="role_item">
      <input
        type="checkbox"
        id={`${roleId}`}
        onChange={(event) => onCheckBoxChecked(event, role)}
      />
      <label htmlFor={`${roleId}`}>
        <CheckBoxIcon className="checked" />
        <Point title={role.name} color="EFA00B" pointSize="2rem" />
      </label>
    </div>
  );
};

export default RoleItem;
