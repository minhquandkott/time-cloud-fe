import React, {Component} from 'react';
import {connect} from 'react-redux';
import WeekSelect from './weekSelect/WeekSelect';
import './TimerCalendar.css';
import WeekHeader from './weekHeader/WeekHeader';
import {getCurrentWeek} from '../../redux/actions';

const listDay = (week) => {
    let result = [];
    result.push(week.firstDay);
    for(let i=1; i<6; i++) {
        let day = new Date(result[i-1]);
        day.setDate(day.getDate() + 1)
        result.push(day);
    }
    result.push(week.lastDay);
    return result;
}



class TimerCalender extends Component {

    componentDidMount() {
        this.props.getCurrentWeek();
    }

    render(){
        let {week} = this.props;
        let days = listDay(week);
        if(week.firstDay) {
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
        week: state.week
    }
}

export default connect(mapStateToProps, {getCurrentWeek})(TimerCalender);