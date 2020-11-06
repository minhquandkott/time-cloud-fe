import "./ColumnEmail.css";

import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import ToolTip from "../../../components/tooltip/Tooltip";
import RoleList from "../roleList/RoleList";
import { connect } from "react-redux";
import { selectMember } from "../../../redux/actions";

const ColumnEmail = ({ userRole, selectMember }) => {
  const buttonClass = `column_email__button${userRole.id}`;
  const [showTooltip, setShowTooltip] = useState(false);
  const onButtonClick = (event) => {
    selectMember(userRole);
    setShowTooltip(!showTooltip);
    event.stopPropagation();
  };

  useEffect(() => {
    const listElement = [
      document.querySelector(`.${buttonClass}`),
      ...document.querySelectorAll(`.${buttonClass} *`),
    ];
    const onClick = (event) => {
      if (!listElement.find((ele) => ele === event.target)) {
        setShowTooltip(false);
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="column_email ">
      <span>{userRole?.user?.email}</span>
      <button
        className={
          !showTooltip ? `visible_hover ${buttonClass}` : `${buttonClass}`
        }
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
          overflowY: "hidden",
        }}
        isShow={showTooltip}
      >
        <RoleList />
      </ToolTip>
    </div>
  );
};

export default connect(null, { selectMember })(ColumnEmail);
