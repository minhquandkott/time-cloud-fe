import React, {Component} from 'react';
import ViewTime from './viewTime/ViewTime';
import timeCloudAPI from '../../../apis/timeCloudAPI';
import './TimerByDay.css';

class TimerByDay extends Component {

    state = {
        times: []
    }

    fetchTimes = (day) => {
        timeCloudAPI().get(`users/${localStorage.getItem("userId")}/times`)
        .then(res => {
            let times = res.data;
            times = times.filter((time) => {
                let timeDate = new Date(time.createAt);
                return day.getFullYear() === timeDate.getFullYear()
                        && day.getMonth() === timeDate.getMonth()
                        && day.getDate() === timeDate.getDate();
            });
            this.setState({
                times: times
            });
        })
    }

    componentDidMount = () => {
        const {day} = this.props;
        this.fetchTimes(day);
    }

    componentDidUpdate = (preProps,preState ) => {
        const {day} = this.props;
        if(day !== preProps.day) {
            this.fetchTimes(day);
        }
        
    }

    render() {
        const {times} = this.state;
        return (
            <div className="timer_by_day">
                {
                    times?.map(time => {
                        return <ViewTime key={time.id} time={time} />
                    })
                }
            </div>
        )
    }
}

export default TimerByDay;