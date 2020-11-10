import "./Avatar.css";
import female from "../../assets/images/female.png";
import PropTypes from "prop-types";
import React from "react";

const Avatar = ({ avatar, avatarSize, children, alt, css, cssImage }) => {
  return (
    <div className="avatar" style={{...css}}>
      <img
        src={avatar ? avatar : female}
        alt={alt ? alt : ""}
        className="avatar__img"
        style={{ width: avatarSize, height: avatarSize, ...cssImage }}
      />
      {children}
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
