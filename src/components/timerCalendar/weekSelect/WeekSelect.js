import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./WeekSelect.css";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getNextWeek, getLastWeek } from '../../../redux/actions/index';
import {months} from '../../../utils/Utils';

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

    checkLastWeek = (days, dayCreateProject) => {
        let day = new Date(dayCreateProject);
        let dayFormat = new Date(days[0].getFullYear(), days[0].getMonth(), days[0].getDate());
        if(dayFormat <= day) return true;
        return false;
    }

    onNextWeek = () => {
        this.props.getNextWeek(this.props.week.lastDay);
    }

    onLastWeek = () => {
        this.props.getLastWeek(this.props.week.firstDay);
    }

    render(){
        let {week, days, dayCreateProject} = this.props;
        let checkLastWeek = false;
        if(dayCreateProject) checkLastWeek = this.checkLastWeek(days, dayCreateProject);
        var check = this.checkWeek(days);
        let weekName = `${months[week.firstDay?.getMonth()]} ${week.firstDay?.getDate()} - ${months[week.lastDay?.getMonth()]} ${week.lastDay?.getDate()}`
        return (
            <div className="week_select">
                <button disabled = {checkLastWeek} style={{backgroundColor: checkLastWeek ? "#f5f2f2" : ""}} onClick={this.onLastWeek}> <NavigateBeforeIcon style= {{fontSize:"1.5rem"}}  /> </button>
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