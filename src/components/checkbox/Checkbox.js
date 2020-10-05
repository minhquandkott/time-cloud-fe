import "./Checkbox.css";
import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const {
    id,
    onCheckboxChanged,
    showUnCheck,
    css,
    checked,
    setPointerEvents,
  } = props;
  const checkboxId = `checkbox${id}`;

  return (
    <div className="checkbox" style={{ ...css }}>
      <input
        checked={checked}
        type="checkbox"
        id={`${checkboxId}`}
        onChange={(event) => {
          onCheckboxChanged(event);
        }}
      />
      <label
        htmlFor={`${checkboxId}`}
        style={{ pointerEvents: setPointerEvents ? "none" : "initial" }}
      >
        <CheckBoxIcon
          className={
            showUnCheck ? "checkbox__checked display_none" : "checkbox__checked"
          }
        />
        {showUnCheck ? (
          <CheckBoxOutlineBlankIcon className="checkbox__un_check" />
        ) : null}
        {props.children}
      </label>
    </div>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  id: PropTypes.string,
  onCheckboxChanged: PropTypes.func,
  showUnCheck: PropTypes.bool,
  css: PropTypes.object,
  checked: PropTypes.bool,
  setPointerEvents: PropTypes.bool,
};
