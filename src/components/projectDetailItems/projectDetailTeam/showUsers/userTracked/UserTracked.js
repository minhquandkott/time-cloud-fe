import React from "react";
import timeCloudAPI from "../../../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../../../utils/Utils";

class UserTracked extends React.Component {
  state = {
    tracked: 0,
  };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        timeCloudAPI().get(`projects/${this.props.projectId}/users/${this.props.user.id}/total-times`)
        .then(response => {
            if(this._isMounted) {
                this.setState({
                    tracked: convertSecondToHour(response.data)
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <span style={{
                color: "var(--color-button)",
                fontWeight: 500,
                fontSize: "2rem"
           }}> {this.state.tracked} </span>
        )
    }
}

export default UserTracked;
