import React from "react";
import timeCloudAPI from "../../apis/timeCloudAPI";
import "./Profile.css";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import UserInfo from "./userInfo/UserInfo";

class Profile extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    timeCloudAPI()
      .get(`users/${localStorage.getItem("userId")}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          user: response.data,
        });
      });
  }
  render() {
    var { user } = this.state;
    return (
      <div className="profile">
        <div className="profile_upper">
          <div className="profile_content">
            <div className="profile_left__image">
              <img
                alt=""
                src={
                  user
                    ? user.avatar
                      ? user.avatar
                      : user.gender
                      ? male
                      : female
                    : male
                }
              />
            </div>
            <span>ABC</span>
            <div className="user_content">
              {user ? <UserInfo user={user} /> : ""}
            </div>
          </div>
        </div>
        <div className="profile_lower"></div>
      </div>
    );
  }
}

export default Profile;
