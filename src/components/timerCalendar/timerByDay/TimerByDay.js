import React, { Component } from "react";
import ViewTime from "./viewTime/ViewTime";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import "./TimerByDay.css";
import Skeleton from "../../../components/loading/skeleton/Skeleton";
import {connect} from 'react-redux';
import {fetchTotalTimeDaySelected} from '../../../redux/actions';

class TimerByDay extends Component {
  
  convertDate = (day) => {
    return `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`;
  }

  componentDidMount = () => {
    const { day } = this.props;
    console.log(day);
    this.props.fetchTotalTimeDaySelected(this.convertDate(day));
  };

  componentDidUpdate = (preProps, preState) => {
    const { day } = this.props;
    if (day !== preProps.day) {
      this.props.fetchTotalTimeDaySelected(this.convertDate(day));
    }
  };

  render() {
    const { times, isLoading } = this.props;
    return (
      <div className="timer_by_day">
        {!isLoading ? (
          times.length ? (
            times.map((time) => {
              return <ViewTime key={time.id} time={time} />;
            })
          ) : (
            <p>
              {" "}
              <PriorityHighIcon style={{ fontSize: "4rem", color: "red" }} />
              Look like you haven't done any time on this day
            </p>
          )
        ) : (
          <Skeleton countItem={3} heightItem="4rem" direction="column" />
        )}
      </div>
    );
  }
}

const mapStateToProps =(state) =>{
   return {
     isLoading: state.week.isLoading,
     times: state.week.listTimeOfSelectedDay
   }
}

export default connect(mapStateToProps, {fetchTotalTimeDaySelected})(TimerByDay);