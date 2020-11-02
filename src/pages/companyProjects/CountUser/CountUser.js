import React from "react";
import "./CountUser.css";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../utils/Utils";

class CountUser extends React.Component {
  state = {
    tracked: 0,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (!this.props.rowStatus) {
      timeCloudAPI()
        .get(
          `tasks/${this.props.taskId}/users/${this.props.ele.id}/total-times`
        )
        .then((response) => {
          if (this._isMounted) {
            this.setState({
              tracked: convertSecondToHour(response.data),
            });
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var { ele, index, amount, rowStatus, renderFlag = () => {} } = this.props;
    if (rowStatus) {
      if (index > 2) {
        return (
          <div key={index} className="count_user">
            {" "}
            {`+${amount - 3}`}{" "}
          </div>
        );
      } else {
        return (
          <div>
            <img
              key={index}
              alt=""
              src={ele.avatar ? ele.avatar : ele.gender ? male : female}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="count_user_item">
          <div className="count_user_item__left">
            <img
              key={index}
              alt=""
              src={ele.avatar ? ele.avatar : ele.gender ? male : female}
            />
            <div className="count_user_item__name">{ele.name}</div>
            {renderFlag(ele)}
          </div>
          <div className="count_user_item__right">{this.state.tracked}</div>
        </div>
      );
    }
  }
}

export default CountUser;
