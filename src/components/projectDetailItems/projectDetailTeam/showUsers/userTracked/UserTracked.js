import React from 'react';
import timeCloudAPI from "../../../../../apis/timeCloudAPI";
import {convertSecondToHour} from '../../../../../utils/Utils';

class UserTracked extends React.Component {

    state = {
        tracked: 0
    }

    componentDidMount() {
        timeCloudAPI().get(`users/${this.props.user.id}/total-times`)
        .then(response => {
            this.setState({
                tracked: convertSecondToHour(response.data)
            })
        })
    }

    render() {
        return (
            <span> {this.state.tracked} </span>
        )
    }
}

export default UserTracked;