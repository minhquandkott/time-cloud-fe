import React, { Component } from "react";
import { connect } from "react-redux";
import Point from "../../../point/Point";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { v4 } from "uuid";
import Modal from "../../../modal/Modal";
import "./ViewTime.css";
import ProjectTask from "../../../projectTask/ProjectTask";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import { removeTimeSelectedDay } from "../../../../redux/actions";
import Spinner from "../../../loading/spinner/Spinner";

class ViewTime extends Component {
  state = {
    showModal: false,
    isDeleting: false,
  };
  from_to = () => {
    const { time } = this.props;
    const startTime = new Date(time.startTime);
    const endTime = new Date(time.endTime);
    let hourStart = this.convertHours(
      startTime.getHours(),
      startTime.getMinutes()
    );

    let hourEnd = this.convertHours(endTime.getHours(), endTime.getMinutes());
    return (
      <>
        {`${hourStart} `}
        <ArrowRightAltIcon />
        {` ${hourEnd}`}
      </>
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
            this.props.removeTimeSelectedDay(time);
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

  render() {
    let { time } = this.props;
    return (
      <div className="view_time">
        <div className="view_time__description ">{time.description}</div>
        <div className="view_time__project_task ">
          <Point
            color={time.task.project.color}
            pointSize="15"
            title={`${time.task.project.name}`}
            key={v4()}
          />
          <Point
            color="#aaaaab"
            pointSize="7"
            title={`${time.task.name}`}
            key={v4()}
          />
        </div>
        <div className="view_time__from_to ">{this.from_to()}</div>
        <div className="view_time__total ">{this.getHours(time)}</div>
        {!this.state.isDeleting ? (
          <button
            className="view_time__action"
            onClick={() => this.onButtonDeleteClick()}
          >
            <DeleteForeverIcon />
          </button>
        ) : (
          <div className="view_user__spinner">
            <Spinner />
          </div>
        )}

        <Modal
          onCloseModal={() => this.setState({ showModal: false })}
          show={this.state.showModal}
          title="Delete time!"
          renderContent={() => this.renderModalContent()}
          renderAction={() => this.renderModalAction()}
        />
      </div>
    );
  }
}

export default connect(null, { removeTimeSelectedDay })(ViewTime);
