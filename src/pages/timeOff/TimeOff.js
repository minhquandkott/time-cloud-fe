import React, {userState, useEffect} from 'react';
import PageDesign from '../../components/pageDesign/PageDesign';
import RequestTimeOff from '../../components/requestTimeOff/RequestTimeOff';
import history from '../../history/index';
import CreateRequestTimeOff from '../createRequestTimeOff/CreateRequestTimeOff';
import "./TimeOff.css";

const TimeOff = (() => {
    
    const data = {
        startOn: new Date(2020, 10, 23),
        endOn: new Date(),
        decription: "Dear Mr.Christophe, At the current time, all of my work is completed. We use a lot of white space and thin line icon. So I want to tell you about the days off.",
        createAt: new Date(2020, 9, 20),
        approvedBy: "Christophe",
        approvedAt: new Date(2020, 9, 21),
        status: "Pending"
    }

    const rightHeader = () => {
        return <button onClick = {() => history.push('/create-request-time-off')} >Request time off</button>
    }

    return (
        <div className="time_off">
            <PageDesign
                title="Time Off"
                headerRight= {rightHeader()}
            >
            <div className="time_off__limit">
                <span>5</span> days userd / <span>7</span> remaining
            </div>
            <div className="time_off_requests">
                <RequestTimeOff data={data}/>
            </div>
            </PageDesign>
            
        </div>
    )
});

export default TimeOff;
