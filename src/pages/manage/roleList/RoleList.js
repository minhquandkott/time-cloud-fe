import React, { useState, useEffect } from "react";
import "./RoleList.css";
import RoleItem from "./RoleItem/RoleItem";

const roleList = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Bdmin" },
  { id: 3, name: "Cdmin" },
];
const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const onCheckBoxChecked = (event, role) => {
    const { checked } = event.target;
    if (checked) {
      setRoles([...roles, role]);
    } else {
      setRoles([...roles.filter((roleE) => roleE.id !== role.id)]);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="role_list">
      {roleList.map((ele) => (
        <RoleItem
          role={ele}
          key={ele.id}
          onCheckBoxChecked={onCheckBoxChecked}
        />
      ))}
    </div>
  );
};

export default RoleList;
