import React, { Component } from "react";
import { connect } from "react-redux";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "../../../modal/Modal";
import "./ViewTime.css";
import ProjectTask from "../../../projectTask/ProjectTask";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import Spinner from "../../../loading/spinner/Spinner";
import {
  removeTimeOfSelectedDay,
  editTimeOfListTime,
  fetchTimes,
  setSelectedTime,
  getNearestTime,
  updateTimeOfSelectedDay,
  setTimes,
} from "../../../../redux/actions";
import {
  removeSpace,
  convertHours,
  convertSecondToHour,
  equalDateTime,
} from "../../../../utils/Utils";
import { USER_ID } from "../../../../utils/localStorageContact";
import ViewTimeDDTask from "./viewTimeDDTask/ViewTimeDDTask";
import ViewTimeDDTime from "./viewTimeDDTime/ViewTimeDDTime";

class ViewTime extends Component {
  state = {
    showModal: false,
    isDeleting: false,
    descriptionInput: this.props.time.description,
    showTaskDD: false,
    showStartTimeDD: false,
    showEndTimeDD: false,
  };

  timeRef = React.createRef();
  componentDidMount() {
    this.timeRef.current = this.props.time;
  }
  from_to = () => {
    const { time } = this.props;
    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
    let hourStart = convertHours(startTime.getHours(), startTime.getMinutes());

    let hourEnd = convertHours(endTime.getHours(), endTime.getMinutes());
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className="view_time__from_to__time"
      >
        <span
          onClick={() => {
            this.setState({ showStartTimeDD: !this.state.showStartTimeDD });
          }}
          className={this.state.showStartTimeDD ? "active" : ""}
        >
          {hourStart}{" "}
        </span>
        <ArrowRightAltIcon />
        <span
          onClick={() => {
            this.setState({ showEndTimeDD: !this.state.showEndTimeDD });
          }}
          className={this.state.showEndTimeDD ? "active" : ""}
        >
          {hourEnd}
        </span>
      </div>
    );
  };

  getHours = (time) => {
    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
    let seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    return convertSecondToHour(seconds);
  };

  onButtonDeleteClick() {
    this.setState({ showModal: true });
  }
  onDeleteTime() {
    const { time } = this.props;

    this.setState(
      {
        showModal: false,
        isDeleting: true,
      },
      () => {
        timeCloudAPI()
          .delete(`times/${time.id}`)
          .then(() => {
            this.props.removeTimeOfSelectedDay(time);
            this.setState({ isDeleting: false });
          });
      }
    );
  }

  editTime = () => {
    let { time } = this.props;
    this.setState({ isDeleting: true });
    timeCloudAPI()
      .put(`times/${time.id}`, {
        description: this.state.descriptionInput,
        mileSecondStartTime: new Date(time.startTime).getTime(),
        mileSecondEndTime: new Date(time.endTime).getTime(),
        userId: time.user.id,
        taskId: time.task.id,
      })
      .then((res) => {
        const savedTime = res.data;
        this.setState({ isDeleting: false });
        this.timeRef.current = savedTime;
        this.props.editTimeOfListTime(savedTime);
        this.props.fetchTimes(localStorage.getItem(USER_ID));
        this.props.updateTimeOfSelectedDay(time);
      });
  };

  renderModalAction() {
    return (
      <div className="view_time__modal_action">
        <button onClick={() => this.onDeleteTime()}>Delete</button>
        <button onClick={() => this.setState({ showModal: false })}>
          Cancel
        </button>
      </div>
    );
  }

  renderModalContent() {
    let { time } = this.props;
    return (
      <div className="view_time__modal_content">
        <p>Are you sure to delete this Time?</p>
        <div>
          <ProjectTask
            projectName={time.task.project.name}
            taskName={time.task.name}
            projectColor={time.task.project.color}
          />
          <span>
            "{time.description}" with {this.getHours(time)}h
          </span>
        </div>
      </div>
    );
  }

  onEditDescription = () => {
    this.setState(
      { descriptionInput: removeSpace(this.state.descriptionInput) },
      () => {
        if (this.state.descriptionInput) {
          if (
            this.state.descriptionInput !== this.timeRef.current.description
          ) {
            this.editTime();
          }
        } else {
          this.setState({
            descriptionInput: this.timeRef.current.description,
          });
        }
      }
    );
  };

  onDDTaskClose = () => {
    let { time } = this.props;
    this.setState({ showTaskDD: false });
    if (this.timeRef.current.task.id !== time.task.id) {
      this.editTime();
    }
  };

  onDDTimeClose = () => {
    const { time } = this.props;
    const preTime = this.timeRef.current;
    this.setState({ showStartTimeDD: false, showEndTimeDD: false });
    if (
      time.endTime !== preTime.endTime ||
      time.startTime !== preTime.startTime
    ) {
      this.editTime();
    }
  };

  onChangeStartTimeHandler = (newStartTime) => {
    const { times, time, setTimes } = this.props;
    const temp = { ...time };
    temp.startTime = newStartTime.toISOString();
    setTimes(
      times.map((ele) => {
        if (ele.id === time.id) {
          return temp;
        }
        return ele;
      })
    );
  };

  onChangeEndTimeHandler = (newEndTime) => {
    const { times, time, setTimes } = this.props;
    const temp = { ...time };
    temp.endTime = newEndTime.toISOString();
    setTimes(
      times.map((ele) => {
        if (ele.id === time.id) {
          return temp;
        }
        return ele;
      })
    );
  };

  onDiscardChangedDDTime = () => {
    const { times, setTimes } = this.props;
    const preTime = this.timeRef.current;
    setTimes(
      times.map((ele) => {
        if (ele.id === preTime.id) {
          return preTime;
        }
        return ele;
      })
    );
  };

  checkOnOfLastTimeButtonDisable = () => {
    const { preNearestTime, time } = this.props;
    if (preNearestTime) {
      if (
        equalDateTime(
          new Date(preNearestTime?.endTime),
          new Date(time.startTime)
        )
      ) {
        return false;
      }
      return true;
    }
  };

  render() {
    let { time, preNearestTime, nextNearestTime } = this.props;
    return (
      <div
        className="view_time"
        onClick={() => {
          this.props.setSelectedTime(time);
          this.props.getNearestTime(time);
        }}
      >
        <div className="view_time__description ">
          <input
            value={this.state.descriptionInput}
            onChange={(e) =>
              this.setState({ descriptionInput: e.target.value })
            }
            maxLength="30"
            onBlur={() => this.onEditDescription()}
          />
        </div>
        <div className="view_time__project_task ">
          <ViewTimeDDTask
            isShow={this.state.showTaskDD}
            onCloseHandler={this.onDDTaskClose}
            task={time.task}
          />
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              this.setState({ showTaskDD: !this.state.showTaskDD })
            }
          >
            <ProjectTask
              projectName={time.task.project.name}
              taskName={time.task.name}
              projectColor={time.task.project.color}
            />
          </div>
        </div>
        <div className="view_time__from_to ">
          <ViewTimeDDTime
            time={time.startTime}
            isShow={this.state.showStartTimeDD}
            onCloseHandler={this.onDDTimeClose}
            preTime={this.timeRef.current?.startTime}
            preNearestTime={preNearestTime?.endTime}
            nextNearestTime={time.endTime}
            onChangeTime={this.onChangeStartTimeHandler}
            onDiscardChanged={this.onDiscardChangedDDTime}
            actionExtractTitle="End of last timer"
            conditionDisableActionExtract={this.checkOnOfLastTimeButtonDisable}
          />
          <ViewTimeDDTime
            time={time.endTime}
            isShow={this.state.showEndTimeDD}
            onCloseHandler={this.onDDTimeClose}
            preTime={this.timeRef.current?.endTime}
            preNearestTime={time.startTime}
            nextNearestTime={nextNearestTime?.startTime}
            onChangeTime={this.onChangeEndTimeHandler}
            onDiscardChanged={this.onDiscardChangedDDTime}
          />
          {this.from_to()}
        </div>
        <div className="view_time__total ">{this.getHours(time)}</div>
        <div className="view_time__action">
          {!this.state.isDeleting ? (
            <button onClick={() => this.onButtonDeleteClick()}>
              <DeleteForeverIcon />
            </button>
          ) : (
            <Spinner />
          )}
        </div>
        <Modal
          onCloseModal={() => this.setState({ showModal: false })}
          show={this.state.showModal}
          title="Delete time!"
          renderContent={() => this.renderModalContent()}
          renderAction={() => this.renderModalAction()}
          cssBody={{ minWidth: "35rem" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    selectedTime,
    selectedIndex,
    preNearestTime,
    nextNearestTime,
    times,
  } = state.week;
  return {
    selectedTime,
    selectedIndex,
    preNearestTime,
    nextNearestTime,
    times,
  };
};

export default connect(mapStateToProps, {
  removeTimeOfSelectedDay,
  editTimeOfListTime,
  fetchTimes,
  setSelectedTime,
  getNearestTime,
  updateTimeOfSelectedDay,
  setTimes,
})(ViewTime);
