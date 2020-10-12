import "./RoleItem.css";
import React from "react";
import Point from "../../../../components/point/Point";
import Checkbox from "../../../../components/checkbox/Checkbox";
import { deleteUserRole, addUserRole } from "../../../../redux/actions";
import { connect } from "react-redux";

const RoleItem = ({
  role,
  isSelected,
  id,
  addUserRole,
  deleteUserRole,
  changeRoleLoading,
}) => {
  const onCheckboxChanged = (e) => {
    if (isSelected) {
      deleteUserRole(role.id);
    } else {
      addUserRole(role.id);
    }
  };

  return (
    <Checkbox
      checked={isSelected ? isSelected : false}
      id={`${role.id}_${id ? id : 0}`}
      onCheckboxChanged={onCheckboxChanged}
      showUnCheck={true}
      css={{
        borderBottom: "2px solid var(--color-light-tertiary)",
        padding: ".7rem",
      }}
      setPointerEvents={changeRoleLoading}
    >
      <Point title={role.name} color={`#${role.color}`} pointSize="2rem" />
    </Checkbox>
  );
};
const mapStateToProps = (state) => {
  const { changeRoleLoading } = state.members;
  return {
    changeRoleLoading,
  };
};
export default connect(mapStateToProps, {
  addUserRole,
  deleteUserRole,
})(RoleItem);
