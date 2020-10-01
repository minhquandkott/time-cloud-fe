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

  const onRoleSelected = (role) => setRoles([...roles, role]);
  const onRoleUnSelect = (role) =>
    setRoles([...roles.filter((roleE) => roleE.id !== role.id)]);

  console.log(roles);
  useEffect(() => {}, []);
  return (
    <div className="role_list">
      {roleList.map((ele) => (
        <RoleItem
          role={ele}
          key={ele.id}
          onRoleSelected={onRoleSelected}
          onRoleUnSelect={onRoleUnSelect}
        />
      ))}
    </div>
  );
};

export default RoleList;
