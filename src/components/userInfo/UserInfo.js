import React from "react";
import "./UserInfo.css";
import Avatar from "../avatar/Avatar";
import PropTypes from "prop-types";

const UserInfo = ({ user, children, cssForUsername }) => {
  return (
    <Avatar avatarSize="3rem" avatar={user?.avatar} alt={user?.email}>
      <span className="user_info__name" style={{ ...cssForUsername }}>
        {user?.username}
      </span>
      {children}
    </Avatar>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  user: PropTypes.object,
  cssForUsername: PropTypes.object,
};
