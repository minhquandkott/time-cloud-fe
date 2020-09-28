import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";
import {
  createTime,
  saveTime,
  fetchTimes,
  selectTime,
  selectTask,
} from "../../redux/actions";
import Counter from "../counter/Counter";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Spinner from "../loading/spinner/Spinner";
import DropDownTime from "../dropdown/DropDown";
import TaskItem from "../tasks/taskItem/TaskItem";
import Point from "../point/Point";
import ProjectTask from "../projectTask/ProjectTask";
class Time extends React.Component {
  renderInput = ({ input, meta, className, ...attributes }) => {
    return (
      <input
        {...attributes}
        {...input}
        className={className}
        autoComplete="off"
      />
    );
  };
  componentDidMount() {
    this.props.fetchTimes(this.props.userId);
  }

  onClickToSelectTime = (time, event) => {
    event.preventDefault();
    this.props.selectTime(time);
    this.props.selectTask(
      this.props.tasks.find((task) => task.id === time.task.id)
    );
  };
  onFormSubmit = ({ description, name }) => {
    if (description !== "" && name !== "") {
      if (!this.props.isCounting) {
        this.props.createTime();
      } else {
        this.props.createTime();
      }
    } else {
    }
  };

  renderRecentTask = () => {
    return this.props.times.map((time) => {
      return (
        <TaskItem
          task={time.task}
          key={time.id}
          title={time.description}
          methodHandlerReplacement={(event) =>
            this.onClickToSelectTime(time, event)
          }
        >
          <ProjectTask
            projectName={time.task.project.name}
            taskName={time.task.name}
          />
        </TaskItem>
      );
    });
  };

  renderListTask = () => {
    const { projects, tasks } = this.props;
    let projectMap = new Map();
    projects.forEach((project) => {
      const taskList = tasks.filter((task) => task.project.id === project.id);
      projectMap.set(project, taskList);
    });
    const sortedProjectMap = new Map(
      [...projectMap.entries()].sort((preEntries, postEntries) => {
        return postEntries[1].length - preEntries[1].length;
      })
    );

    const returnValue = [];
    sortedProjectMap.forEach((tasks, project) => {
      if (tasks.length) {
        returnValue.push(
          <div className="project" key={project.id}>
            <div className="project__name">
              <Point color="80A1D4" pointSize="20px" title={project.name}>
                <p
                  className="project__company_name"
                  style={{
                    color: "#80A1D4",
                  }}
                >
                  ( {project.company.name} )
                </p>
              </Point>
            </div>
            <div className="project__task">
              {tasks.map((task) => {
                return <TaskItem task={task} key={task.id} />;
              })}
            </div>
          </div>
        );
      }
    });
    return returnValue;
  };

  onSaveButtonClick = (event) => {
    this.props.saveTime(this.props.description);
    if (this.props.isSavingSuccess) {
      this.props.reset();
    }
  };

  render() {
    const { selectedTask } = this.props;
    return (
      <div className="time">
        <form
          className="form"
          onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        >
          <div className="time__left">
            <Field
              name="description"
              type="text"
              component={this.renderInput}
              placeholder="Description..."
              className="form__input form__input__description"
            />

            <DropDownTime title="recent_task">
              <div className="drop_down__recent_task">
                {this.renderRecentTask()}
              </div>
            </DropDownTime>
          </div>
          <div className="time__middle">
            <label htmlFor="task">
              {selectedTask ? (
                <ProjectTask
                  projectName={selectedTask.project.name}
                  taskName={selectedTask.name}
                />
              ) : (
                <p>Task...</p>
              )}
            </label>
            <input type="checkbox" id="task" />
            <DropDownTime>
              <div className="drop_down__list_task">
                {this.renderListTask()}
              </div>
            </DropDownTime>
          </div>
          <div className="time__right">
            <Counter />
            <button className="form__button">
              {this.props.isCounting ? (
                <PauseIcon className="form__icon__pause" />
              ) : (
                <PlayCircleFilledWhiteIcon className="form__icon__play" />
              )}
            </button>
            {!this.props.isCounting && this.props.beginTime ? (
              <div
                className="form__icon__save"
                onClick={this.onSaveButtonClick}
              >
                {this.props.isSaving ? <Spinner /> : <SaveAltIcon />}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { tasks, projects, times, time, auth } = state;
  const {
    isCounting,
    isSaving,
    beginTime,
    selectedTask,
    isSavingSuccess,
  } = time;
  const { userId } = auth;
  const { selectedTime } = times;
  return {
    initialValues: {
      name: selectedTask?.name,
      description: selectedTime?.description ? selectedTime.description : "",
    },
    isCounting,
    isSaving,
    description: state.form.trackTimeForm?.values.description,
    beginTime,
    tasks: tasks.tasks,
    selectedTask,
    projects: projects.projects,
    times: times.times,
    isSavingSuccess,
    userId,
  };
};

const trackTimeForm = reduxForm({
  form: "trackTimeForm",
  enableReinitialize: true,
})(Time);

export default connect(mapStateToProps, {
  createTime,
  saveTime,
  fetchTimes,
  selectTime,
  selectTask,
})(trackTimeForm);
