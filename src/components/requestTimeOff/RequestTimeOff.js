import React, {userState, useEffect, useState} from 'react';
import {months} from '../../utils/Utils';
import './RequestTimeOff.css';
import TimeOffActions from './timeOffActions/TimeOfActions';
import Avatar from '../../components/avatar/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {connect} from 'react-redux';
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RequestTimeOff = (({data, user}) => {



    const countDayOff = () => {
        return Math.floor((data.endOn.getTime()-data.startOn.getTime())/(1000 * 60 * 60 * 24)) + 1;
    }

    return (
        <div
            className="request_time_off"
        >
            <div className="request_time_off__left">
                <div className="request_time_off__left__data">
                    <p> {data.status} </p>
                    <div className="request_time_off__left__start">
                        <div className="request_time_off__left__start__info">
                            <div className="day_month">
                                {`${days[data.startOn.getDay()]}, ${months[data.startOn.getMonth()]}`}
                            </div>
                            <div className="date">
                                {data.startOn.getDate()}
                            </div>
                        </div>
                    </div>
                    <div className="request_time_off__left__end">
                        <div className="day_month">
                            {`${days[data.endOn.getDay()]}, ${months[data.endOn.getMonth()]}`}
                        </div>
                        <div className="date">
                            {data.endOn.getDate()}
                        </div>
                    </div>
                    <div className="request_time_off__center">
                        <ArrowRightAltIcon/>
                        <p> {`(${countDayOff()} days)`} </p>
                    </div>
                </div>
            </div>
            <div className="request_time_off__right">
                <div className="request_time_off__right__actions">
                    <TimeOffActions />
                </div>
                {data.decription}
                <div className="request_time_off__right__info">
                    <Avatar
                        avatar={user?.avatar}
                        avatarSize="2rem"
                        css={{
                            fontSize: "1.5rem",
                            color: "#030303"
                        }}
                    > 
                        {`${user?.name}`}
                    </Avatar>
                    <p> {" requested 5 minutes ago"} </p>
                    <FiberManualRecordIcon
                        style={{
                            color: "#DDDDDD",
                            fontSize: ".8rem",
                            margin: "0 1rem"
                        }}
                    />
                    <p> {"Waiting for approval"} </p>
                </div>
            </div>
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(RequestTimeOff);