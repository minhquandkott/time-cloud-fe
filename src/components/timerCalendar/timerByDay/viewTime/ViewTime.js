import React, {Component} from 'react';
import Point from '../../../point/Point';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {v4} from 'uuid';

import './ViewTime.css';

class ViewTime extends Component {

    from_to = () => {
        const {time} = this.props;
        const startTime = new Date(time.startTime);
        const endTime = new Date(time.endTime);
        let hourStart = this.convertHours(startTime.getHours(), startTime.getMinutes());
        let hourEnd = this.convertHours(endTime.getHours(), endTime.getMinutes());
        return <>
            {`${hourStart} `}
            <ArrowRightAltIcon />
            {` ${hourEnd}`}
        </>
    }

    getHours = (time) => {
        const startTime = new Date(time.startTime);
        const endTime = new Date(time.endTime);
        let seconds = (endTime.getTime() - startTime.getTime())/1000;
        let hours = seconds/60/60;
        let rhours = Math.floor(hours);
        let rminutes = Math.round((hours - rhours) * 60)
        return `${rhours}:${rminutes < 10 ? `0${rminutes}` : rminutes}`;
    }

    convertHours(hour, minutes) {
        if(hour > 12) return `${hour-12}:${minutes ? minutes : "00"}PM`;
        else return `${hour}:${minutes ? minutes : "00"}AM`;
    }

    render() {
        let {time} = this.props;
        return (
            <div className="view_time">
                <div className="view_time__description ">
                    {time.description}
                </div>
                <div className="view_time__project_task ">
                    <Point
                        color= {time.task.project.color}
                        pointSize="15"
                        title={`${time.task.project.name}`}
                        key={v4()}
                    />
                    <Point
                        color= "#aaaaab"
                        pointSize="7"
                        title={`${time.task.name}`}
                        key={v4()}
                    />
                </div>
                <div className="view_time__from_to ">
                    {this.from_to()}
                </div>
                <div className="view_time__total ">
                    {this.getHours(time)}
                </div>
            </div>
        )
    }
}

export default ViewTime;