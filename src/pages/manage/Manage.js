import "./Manage.css";
import React, { useEffect } from "react";
import Table from "../../components/table/Table";
import { connect } from "react-redux";
import { fetchMembers, selectMember } from "../../redux/actions";
import Point from "../../components/point/Point";
import CreateIcon from "@material-ui/icons/Create";

const Manage = (props) => {
  const maxRole = props.members.reduce((preV, curV) => {
    return preV > curV.roles.length ? preV : curV.roles.length;
  }, 0);
  
  useEffect(() => {
    props.fetchMembers(52);
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
      convertData: (userRole) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: ".5rem",
          }}
        >
          <span>{userRole.user.email}</span>
          <button
            style={{
              borderRadius: "50%",
              outline: "none",
              border: "none",
              boxShadow: "var(--box-shadow-secondary)",
              padding: ".5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="visible_hover"
          >
            <CreateIcon
              style={{
                fontSize: "2rem",
                color: "var(--color-dark-tertiary)",
              }}
            />
          </button>
        </div>
      ),
    },
    access: {
      key: "access",
      label: "access",
      width: "40%",
      cssHeader,
      convertData: (userRole) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {userRole.roles.map((role) => (
              <Point
                color="E74C3C"
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
          <button style={{}}>Invite</button>
        </div>
      </div>
      <div className="manage__context"></div>
      <Table
        columns={columns}
        data={props.members}
        onClickHandler={(element) => console.log(element)}
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
