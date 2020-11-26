import React from "react";
import "./UserInfo.css";
import Avatar from "../avatar/Avatar";

const UserInfo = ({
  avatar,
  primaryInfo,
  secondaryInfo,
  flag,
  children,
  cssForPrimaryInfo,
  cssFlag,
}) => {
  return (
    <Avatar avatarSize="3.5rem" avatar={avatar} alt={primaryInfo}>
      <div className="user_info__content">
        <p className="user_info__primary" style={{ ...cssForPrimaryInfo }}>
          {primaryInfo}
        </p>
        {flag ? (
          <span
            className="user_info__flag"
            style={{
              display: "inline-block",
              ...cssFlag,
            }}
          >
            {flag}
          </span>
        ) : null}
        <p className="user_info__secondary">{secondaryInfo}</p>
      </div>
      <div></div>
      {children}
    </Avatar>
  );
};

export default UserInfo;
