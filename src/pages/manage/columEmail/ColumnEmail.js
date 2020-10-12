import "./ColumnEmail.css";

import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import ToolTip from "../../../components/tooltip/Tooltip";
import RoleList from "../roleList/RoleList";
import { connect } from "react-redux";

const ColumnEmail = ({ userRole, selectedMember }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onButtonClick = (event) => {
    setShowTooltip(!showTooltip);
  };
  console.log(showTooltip);
  useEffect(() => {
    if (selectedMember?.user.id !== userRole.user.id) setShowTooltip(false);
  }, [selectedMember, userRole.user.id]);

  return (
    <div className="column_email ">
      <span>{userRole?.user?.email}</span>
      <button
        className={!showTooltip ? "visible_hover" : ""}
        onClick={onButtonClick}
      >
        <CreateIcon
          style={{
            fontSize: "2rem",
            color: "var(--color-dark-tertiary)",
          }}
        />
      </button>
      <ToolTip
        maxWidth="19rem"
        css={{
          boxShadow: "var(--box-shadow-secondary)",
          borderRadius: ".5rem",
          padding: ".5rem 1rem",
        }}
        isShow={showTooltip && selectedMember?.user.id === userRole.user.id}
      >
        <RoleList />
      </ToolTip>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedMember } = state.members;
  return {
    selectedMember,
  };
};

export default connect(mapStateToProps)(ColumnEmail);
