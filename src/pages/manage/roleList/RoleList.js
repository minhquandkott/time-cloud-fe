import React from "react";
import "./RoleList.css";
import { connect } from "react-redux";
import RoleItem from "./RoleItem/RoleItem";
import { ROLE_LIST } from "../../../utils/Utils";

const RoleList = ({ selectedMember }) => {
  return (
    <div className="role_list">
      {ROLE_LIST.map((ele) => (
        <RoleItem
          id={selectedMember?.id}
          role={ele}
          key={ele.id}
          isSelected={selectedMember?.roles?.some((role) => role.id === ele.id)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedMember } = state.members;
  return {
    selectedMember,
  };
};

export default connect(mapStateToProps)(RoleList);
