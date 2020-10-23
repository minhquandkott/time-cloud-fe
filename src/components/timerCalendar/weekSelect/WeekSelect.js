import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./WeekSelect.css";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getNextWeek, getLastWeek } from '../../../redux/actions/index';

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]


class WeekSelect extends Component {

    checkWeek = (days) => {
        let temp = new Date();
        let check = false;
        days.forEach(day => {
            if (temp.getFullYear() === day.getFullYear() && temp.getMonth() === day.getMonth() && temp.getDate() === day.getDate()) {
                check = true;
            }
        })
        return check;
    }

    onNextWeek = () => {
        this.props.getNextWeek(this.props.week.lastDay);
    }

    onLastWeek = () => {
        this.props.getLastWeek(this.props.week.firstDay);
    }

    render(){
        let {week, days} = this.props;
        var check = this.checkWeek(days);
        let weekName = `${month[week.firstDay?.getMonth()]} ${week.firstDay?.getDate()} - ${month[week.lastDay?.getMonth()]} ${week.lastDay?.getDate()}`
        return (
            <div className="week_select">
                <button onClick={this.onLastWeek}> <NavigateBeforeIcon style= {{fontSize:"1.5rem"}}  /> </button>
                <div className="week_select__name"> {weekName} </div>
                <button disabled={check} style={{backgroundColor: check ? "#f5f2f2" : ""}} onClick={this.onNextWeek}> <NavigateNextIcon style= {{fontSize:"1.5rem"}}  /> </button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        week: state.week
    }
}

export default connect(mapStateToProps ,{ getLastWeek, getNextWeek})(WeekSelect);