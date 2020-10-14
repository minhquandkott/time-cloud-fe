import "./Manage.css";
import React, { useEffect } from "react";
import Table from "../../components/table/Table";
import { connect } from "react-redux";
import { fetchMembers, selectMember } from "../../redux/actions";
import Point from "../../components/point/Point";
import classes from "./Manage.module.css";
import ColumnEmail from "./columEmail/ColumnEmail";

const Manage = ({ members, fetchMembers, selectMember }) => {
  const maxRole = members.reduce((preV, curV) => {
    return preV > curV.roles.length ? preV : curV.roles.length;
  }, 0);

  useEffect(() => {
    fetchMembers(52);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cssHeader = {
    textAlign: "left",
  };

  const columns = {
    action: {
      key: "action",
      width: "5%",
      convertData: (element) => {
        return <input type="checkbox" className="visible_hover" />;
      },
      cssData: {
        textAlign: "center",
      },
    },
    name: {
      key: "name",
      label: "name",
      width: "20%",
      cssHeader,
      cssData: {
        textTransform: "capitalize",
      },
      convertData: (userRole) => userRole.user.name,
    },
    email: {
      key: "email",
      label: "email",
      width: "35%",
      cssHeader,
      convertData: (userRole) => {
        return <ColumnEmail userRole={userRole} />;
      },
    },
    access: {
      key: "access",
      label: "access",
      width: "40%",
      cssHeader,
      convertData: (userRole) => {
        return (
          <div className={`${classes.access} ${classes.flex}`}>
            {userRole.roles
              .sort((ele1, ele2) => ele1.id - ele2.id)
              .map((role) => (
                <Point
                  color= {`#${role.color}`}
                  pointSize="15"
                  title={role.name}
                  css={{ flex: `${(10 / maxRole) * 0.1}` }}
                  key={role.id}
                />
              ))}
          </div>
        );
      },
    },
  };

  return (
    <div className="manage">
      <div className="manage__header">
        <h2>Admin</h2>
        <div>
          <input type="text" placeholder="Add new member by email address..." />
          <button>Invite</button>
        </div>
      </div>
      <div className="manage__context"></div>
      <Table
        columns={columns}
        data={members}
        onClickHandler={(element) => selectMember(element)}
      />
    </div>
  );
};
const mapStateToProp = (state) => {
  const { members } = state.members;
  return {
    members: members.map((member) => {
      return { ...member };
    }),
  };
};
export default connect(mapStateToProp, {
  fetchMembers,
  selectMember,
})(Manage);
