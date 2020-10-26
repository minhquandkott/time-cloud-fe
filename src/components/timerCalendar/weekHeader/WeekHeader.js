import React, {Component} from 'react';
import './WeekHeader.css';
import TimerByDay from '../timerByDay/TimerByDay';
import WeekHeaderItem from './weekHeaderItem/WeekHeaderItem';
import TotalTimeByWeek from './totalTimeByWeek/TotalTimeByWeek';
import {setDaySelected} from '../../../redux/actions/index';
import {connect} from 'react-redux';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

class WeekHeader extends Component {


    checkFuture = (day) => {
        let temp = new Date();
        let check = false;
        if (day > temp) {
            check = true;
        }
        return check;
    }

    checkCurrentDay = (days) => {
        let curr = new Date();
        let result = 0;
        days.map((day, index) => {
            if(day.getFullYear() === curr.getFullYear() && day.getMonth() === curr.getMonth() && day.getDate() === curr.getDate()) {
                result = index;
            }
        });
        return result;
    }

    componentDidUpdate = (preProps, preState) => {
        const {days} = this.props;
        let index = this.checkCurrentDay(days);
        if(days !== preProps.days) {
            this.props.setDaySelected(days[index], index);
        }
    }

    componentDidMount = () => {
        const {days} = this.props;
        let result = this.checkCurrentDay(days);
        this.props.setDaySelected(days[result], result);
    }

    listDays = (dates) => {
        const {week} = this.props;
        let result = days.map((day, index) => {
            const isDisable = this.checkFuture(dates[index]);
            return <button 
                        style={{
                            background: week.selectedIndex === index ? "#f3f4f9" : "white",
                            color: week.selectedIndex === index ? "var(--color-button)" : isDisable ? "#c1c1c1" : "black",
                            pointerEvents: isDisable ? "none" : "initial",
                        }}
                        
                        key={index}
                        onClick={() => this.displayTimes(dates[index],index)
                    }>
                        <WeekHeaderItem day={day} date={dates[index]} />
                    </button>
        })
        return result;
    }

    displayTimes = (date, index) => {
        this.props.setDaySelected(date, index);
    }

    render() {
        const {days} = this.props;
        const {selectedDay, selectedIndex} = this.props.week;
        return (
            <div>
                <div className="week_header">
                    {this.listDays(days)}
                    <div className="week_header__total">
                        <TotalTimeByWeek days={days} />
                    </div>
                </div>
                {selectedDay ? <TimerByDay day={selectedDay}/> : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        week: state.week
    }
}
export default connect(mapStateToProps, {setDaySelected})(WeekHeader);