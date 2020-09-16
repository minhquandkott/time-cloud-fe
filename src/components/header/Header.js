import React from "react";
import "./Header.css";
import Logo from "../logo/Logo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__logo">
        <Logo />
        TimeCloud
      </div>
      <div className="header__feature">
        <a href="/">Your timer</a>
        <a href="/">Time off</a>
        <a href="/">Report</a>
      </div>
      <div className="header__account">
        <img
          alt="avatar"
          src={
            props.user?.avatar
              ? props.user.avatar
              : "https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
          }
        />
        <p>{props.user?.name}</p>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(Header);
