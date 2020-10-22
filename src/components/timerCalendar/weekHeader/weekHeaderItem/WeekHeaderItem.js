import React, {Component} from 'react';
import './WeekHeaderItem.css';
import timeCloudAPI from '../../../../apis/timeCloudAPI';


class WeekHeaderItem extends Component {

    state = {
        totalTime: 0
    }

    fetchTotalTime = (date) => {
        let dateURL = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            timeCloudAPI().get(`users/${localStorage.getItem("userId")}/date/${dateURL}/total-times`)
            .then(res => {
                this.setState({
                    totalTime: res.data
                })
            })
    }

    componentDidUpdate = (preProps, preState) => {
        const {date} = this.props;
        if(date !== preProps.date) {
            this.fetchTotalTime(date);
        }
    }

    componentDidMount = () => {
        const {date} = this.props;
        this.fetchTotalTime(date);
    }

    getHours = (seconds) => {
        let hours = seconds/60/60;
        let rhours = Math.floor(hours);
        let rminutes = Math.round((hours - rhours) * 60);
        return `${rhours}:${rminutes < 10 ? `0${rminutes}` : rminutes}`;
    }

    render() {
        const {day} = this.props;
        const {totalTime} = this.state;
            return (
                <div className="week_header_item">
                    <p className="week_header_item__day">
                        {day}
                    </p>
                    <p className="week_header_item__total_time">
                        {this.getHours(totalTime)}
                    </p>
                </div>
            )
    }
}

export default WeekHeaderItem;