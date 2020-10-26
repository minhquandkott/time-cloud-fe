import React, {Component} from 'react';
import './TotalTimeByWeek.css';
import timeCloudAPI from '../../../../apis/timeCloudAPI';

class TotalTimeByWeek extends Component {

    state = {
        totalTime: 0
    }

    getHours = (seconds) => {
        let hours = seconds/60/60;
        let rhours = Math.floor(hours);
        let rminutes = Math.round((hours - rhours) * 60);
        return `${rhours}:${rminutes < 10 ? `0${rminutes}` : rminutes}`;
    }

    fetchTotalTimeByWeek = (days) => {
        let date = `${days[0].getFullYear()}-${days[0].getMonth() + 1}-${days[0].getDate()}`;
        timeCloudAPI().get(`users/${localStorage.getItem("userId")}/week/${date}/total-times`)
        .then(res => {
            this.setState({
                totalTime: res.data
            })
        })
    }

    componentDidMount = () => {
        const {days} = this.props;
        this.fetchTotalTimeByWeek(days);
    }

    componentDidUpdate = (preProps, preState) => {
        const {days} = this.props;
        if(days !== preProps.days) {
            this.fetchTotalTimeByWeek(days);
        }
    }

    render() {
        const {totalTime} = this.state;
        return (
            <div className="total_time_by_week">
                <div className="total_time_by_week__title">
                    Total
                </div>
                <div className="total_time_by_week__hours">
                    {this.getHours(totalTime)}
                </div>
            </div>
        )
    }
}

export default TotalTimeByWeek;