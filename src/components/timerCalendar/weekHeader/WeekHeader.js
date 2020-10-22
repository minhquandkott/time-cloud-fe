import React, {Component} from 'react';
import './WeekHeader.css';
import TimerByDay from '../timerByDay/TimerByDay';
import WeekHeaderItem from './weekHeaderItem/WeekHeaderItem';
import TotalTimeByWeek from './totalTimeByWeek/TotalTimeByWeek';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Mon"];

class WeekHeader extends Component {

    state = {
        date : null,
        selectedIndex: -1
    }
    buttonSelected = React.createRef();

    check = (day) => {
        let temp = new Date();
        let check = false;
        if (day > temp) {
            check = true;
        }
        return check;
    }

    listDays = (dates) => {
        let result = days.map((day, index) => {
            const isDisable = this.check(dates[index]);
            return <button 
                        style={{
                            background: this.state.selectedIndex === index ? "#f3f4f9" : "white",
                            color: this.state.selectedIndex === index ? "var(--color-button)" : isDisable ? "#c1c1c1" : "black",
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

        this.setState({
            date: date,
            selectedIndex: index
        })
    }

    render() {
        const {days} = this.props;
        const {date} = this.state;
        return (
            <div>
                <div className="week_header">
                    {this.listDays(days)}
                    <div className="week_header__total">
                        <TotalTimeByWeek days={days} />
                    </div>
                </div>
                {date ? <TimerByDay day={date}/> : ""}
            </div>
        )
    }
}
export default WeekHeader;