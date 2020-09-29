import "./Manage.css";
import React, { useEffect } from "react";
import Table from "../../components/table/Table";
import { connect } from "react-redux";
import { fetchMembers, selectMember } from "../../redux/actions";
import Point from "../../components/point/Point";

const Manage = (props) => {
  useEffect(() => {
    props.fetchMembers(47);
  },[]);
  const cssHeader = {
    textAlign: "left",
  };
  const columns = {
    action: {
      key: "action",
      width: "10%",
      convertData: (element) => {
        return <input type="checkbox" />;
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
      width: "40%",
      cssHeader,
      convertData: (userRole) => userRole.user.email,
    },
    access: {
      key: "access",
      label: "access",
      width: "30%",
      cssHeader,
      convertData: (userRole) => {
        return (
          <Point color="E74C3C" pointSize="20" title={userRole.role.name} />
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
      return { ...member, id: member.user.id };
    }),
  };
};
export default connect(mapStateToProp, {
  fetchMembers,
  selectMember,
})(Manage);
