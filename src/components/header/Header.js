import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import Logo from "../logo/Logo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  function onClickHandler() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    window.addEventListener("mouseup", (event) => {
      if (
        event.target.parentElement !==
        dropDownRef.current?.previousElementSibling
      ) {
        setIsOpen(false);
      }
    });
  }, []);

  const features = props.user?.roles?.some(
    (ele) => ele.id === 1 || ele.id === 3
  ) ? (
    <React.Fragment>
      <Link to="/timer">Your timer</Link>
      <Link
        to={{
          pathname: "/report",
          state: localStorage.getItem("userId"),
        }}
      >
        Report
      </Link>
      <Link to="/manage">Manage</Link>
      <Link to="/projects">Project</Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to="/timer">Your timer</Link>
      <Link
        to={{
          pathname: "/report",
          state: localStorage.getItem("userId"),
        }}
      >
        Report
      </Link>
    </React.Fragment>
  );

  return (
    <div className="header">
      <div className="header__logo">
        <Logo />
        TimeCloud
      </div>
      <div className="header__feature">{features}</div>
      <div className="header__account">
        <img
          alt="avatar"
          src={
            props.user?.avatar
              ? props.user.avatar
              : "https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
          }
        />

        <p>{props.user?.name ? props.user.name : ""}</p>
        <button onClick={onClickHandler}>
          <ArrowDropDownIcon />
        </button>
        <div
          className={`header__drop_down ${isOpen ? "active" : ""}`}
          ref={dropDownRef}
        >
          <p>Profile</p>
          <p>Setting</p>
          <p
            onClick={() => {
              props.logout();
            }}
          >
            Log Out
          </p>
        </div>
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

export default connect(mapStateToProps, {
  logout,
})(Header);
