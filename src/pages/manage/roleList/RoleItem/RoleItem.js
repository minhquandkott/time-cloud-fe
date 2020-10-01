import "./RoleItem.css";
import React from "react";
import Point from "../../../../components/point/Point";
import Checkbox from "../../../../components/checkbox/Checkbox";

const RoleItem = ({ role, onRoleSelected, onRoleUnSelect }) => {
  const onCheckboxChanged = (e) => {
    const { checked } = e.target;
    if (checked) {
      onRoleSelected(role);
    } else {
      onRoleUnSelect(role);
    }
  };
  return (
    <Checkbox
      id={role.id}
      onCheckboxChanged={onCheckboxChanged}
      showUnCheck={true}
    >
      <Point title={role.name} color="EFA00B" pointSize="2rem" />
    </Checkbox>
  );
};

export default RoleItem;
