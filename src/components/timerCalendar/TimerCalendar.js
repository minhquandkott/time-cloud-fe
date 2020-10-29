import React, {Component} from 'react';
import {connect} from 'react-redux';
import WeekSelect from './weekSelect/WeekSelect';
import './TimerCalendar.css';
import WeekHeader from './weekHeader/WeekHeader';
import {getCurrentWeek} from '../../redux/actions';

const listDay = (firstDay, lastDay) => {
    let result = [];
    result.push(firstDay);
    for(let i=1; i<6; i++) {
        let day = new Date(result[i-1]);
        day.setDate(day.getDate() + 1)
        result.push(day);
    }
    result.push(lastDay);
    return result;
}


class TimerCalender extends Component {

    componentDidMount() {
        this.props.getCurrentWeek();
    }

    render(){
        let {firstDay, lastDay} = this.props;
        let days = listDay(firstDay, lastDay);
        if(firstDay) {
            return (
                <div className="timer_calendar">
                    <WeekSelect days={days} />
                    <WeekHeader days={days}/>
                </div>
                )
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    return {
        firstDay: state.week.firstDay,
        lastDay: state.week.lastDay
    }
    
}

export default connect(mapStateToProps, {getCurrentWeek})(TimerCalender);