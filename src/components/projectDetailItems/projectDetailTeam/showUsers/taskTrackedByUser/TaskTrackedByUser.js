import React from 'react';
import timeCloudAPI from '../../../../../apis/timeCloudAPI';
import {convertSecondToHour} from '../../../../../utils/Utils';
import './TaskTrackedByUser.css';

class TaskTrackedByUser extends React.Component {

    state= {
        tracked: 0
    }
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true
        timeCloudAPI().get(`tasks/${this.props.taskId}/users/${this.props.userId}/total-times`)
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
            <div className="list_tasks__tracked">
                <span> {this.state.tracked} </span>
            </div>
        )
    }
}

export default TaskTrackedByUser