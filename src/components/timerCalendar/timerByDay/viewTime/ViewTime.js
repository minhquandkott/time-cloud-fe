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
} from "../../../../redux/actions";
import { removeSpace, convertHours } from "../../../../utils/Utils";
import { USER_ID } from "../../../../utils/localStorageContact";
import ViewTimeDDTask from "./viewTimeDDTask/ViewTimeDDTask";
import ViewTimeDDTime from "./viewTimeDDTime/ViewTimeDDTime";

class ViewTime extends Component {
  state = {
    showModal: false,
    isDeleting: false,
    descriptionInput: this.props.time.description,
    showTaskDD: false,
    showTimeDD: false,
  };

  descriptionInputRef = React.createRef();
  from_to = () => {
    const { time } = this.props;
    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
    let hourStart = convertHours(startTime.getHours(), startTime.getMinutes());

    let hourEnd = convertHours(endTime.getHours(), endTime.getMinutes());
    return (
      <div
        onClick={() => this.setState({ showTimeDD: true })}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {`${hourStart} `}
        <ArrowRightAltIcon />
        {` ${hourEnd}`}
      </div>
    );
  };

  getHours = (time) => {
    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
    let seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    let hours = seconds / 60 / 60;
    let rhours = Math.floor(hours);
    let rminutes = Math.round((hours - rhours) * 60);
    return `${rhours}:${rminutes < 10 ? `0${rminutes}` : rminutes}`;
  };

  convertHours(hour, minutes) {
    if (hour > 12) return `${hour - 12}:${minutes ? minutes : "00"}PM`;
    else return `${hour}:${minutes ? minutes : "00"}AM`;
  }

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
        const { time } = this.props;
        if (this.state.descriptionInput) {
          if (
            this.state.descriptionInput !== this.descriptionInputRef.current
          ) {
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
                this.setState({ isDeleting: false });
                this.props.editTimeOfListTime(res.data);
                this.props.fetchTimes(localStorage.getItem(USER_ID));
              });
          }
        } else {
          if (this.state.descriptionInput === "")
            this.setState({
              descriptionInput: this.descriptionInputRef.current,
            });
        }
      }
    );
  };

  onDDTaskClose = (task) => {
    const { time } = this.props;
    this.setState({ showTaskDD: false });
    if (task.id !== this.props.selectedTime.task.id) {
      this.setState({ isDeleting: true });
      timeCloudAPI()
        .put(`times/${time.id}`, {
          description: this.state.descriptionInput,
          mileSecondStartTime: new Date(time.startTime).getTime(),
          mileSecondEndTime: new Date(time.endTime).getTime(),
          userId: time.user.id,
          taskId: task.id,
        })
        .then((res) => {
          this.setState({ isDeleting: false });
          this.props.fetchTimes(localStorage.getItem(USER_ID));
        });
    }
  };

  onDDTimeClose = () => {
    const { time, selectedTime } = this.props;
    this.setState({ showTimeDD: false });
    if (
      time.endTime !== selectedTime.endTime ||
      time.startTime !== selectedTime.startTime
    ) {
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
          this.setState({ isDeleting: false });
          this.props.updateTimeOfSelectedDay(time);
        });
    }
  };

  render() {
    let { time } = this.props;
    this.descriptionInputRef.current = time.description;
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
            time={time}
            isShow={this.state.showTimeDD}
            onCloseHandler={this.onDDTimeClose}
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
  const { selectedTime, selectedIndex } = state.week;
  return {
    selectedTime,
    selectedIndex,
  };
};

export default connect(mapStateToProps, {
  removeTimeOfSelectedDay,
  editTimeOfListTime,
  fetchTimes,
  setSelectedTime,
  getNearestTime,
  updateTimeOfSelectedDay,
})(ViewTime);
