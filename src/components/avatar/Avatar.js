import "./Avatar.css";
import female from "../../assets/images/female.png";
import PropTypes from "prop-types";
import React from "react";

const Avatar = ({ avatar, avatarSize, children, alt }) => {
  return (
    <div className="avatar">
      <img
        src={!avatar ? female : avatar}
        alt={alt ? alt : ""}
        className="avatar__img"
        style={{ width: avatarSize, height: avatarSize }}
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
