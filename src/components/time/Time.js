import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";
import { createTime, saveTime } from "../../redux/actions";
import Counter from "../counter/Counter";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Spinner from "../loading/spinner/Spinner";
import Dropdown from "../dropdown/DropDown";
import TaskItem from "../tasks/taskItem/TaskItem";
import Point from "../point/Point";
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
  componentDidMount() {}

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
    return this.props.tasks.map((task) => {
      return <TaskItem task={task} key={task.id} />;
    });
  };

  renderListTask = () => {
    const { projects, tasks } = this.props;
    let projectMap = new Map();
    projects.forEach((project) => {
      const taskList = tasks.filter((task) => task.project.id === project.id);
      projectMap.set(project.name, taskList);
    });
    const sortedProjectMap = new Map(
      [...projectMap.entries()].sort((preEntries, postEntries) => {
        return postEntries[1].length - preEntries[1].length;
      })
    );

    const returnValue = [];
    sortedProjectMap.forEach((tasks, projectName) => {
      if (tasks.length) {
        returnValue.push(
          <React.Fragment>
            <div className="project__name">
              <Point color="80A1D4" fontSize="20px" title={projectName} />
            </div>
            <div className="project__task">
              {tasks.map((task) => {
                return <TaskItem task={task} />;
              })}
            </div>
          </React.Fragment>
        );
      }
    });
    return returnValue;
  };

  onSaveButtonClick = (event) => {
    this.props.reset();
    this.props.saveTime(this.props.description);
  };

  onSaveButtonClick;
  render() {
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

            <Dropdown title="recent task">
              <div className="drop_down__recent__task">
                {this.renderRecentTask()}
              </div>
            </Dropdown>
          </div>
          <div className="time__middle">
            {this.props.selectedTask ? (
              <Point
                color="80A1D4"
                fontSize="30px"
                title={this.props.selectedTask.project.name}
              />
            ) : null}
            <Field
              name="name"
              type="text"
              component={this.renderInput}
              placeholder="Task..."
              className="form__input form__input__task"
            />
            <Dropdown>
              <div className="drop_down__list_task">
                {this.renderListTask()}
              </div>
            </Dropdown>
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
  const { isCounting, isSaving, beginTime, selectedTask } = state.time;
  const { tasks, projects } = state;
  return {
    initialValues: { name: selectedTask?.name, description: "" },
    isCounting,
    isSaving,
    description: state.form.trackTimeForm?.values.description,
    beginTime,
    tasks: tasks.tasks,
    selectedTask,
    projects: projects.projects,
  };
};

const trackTimeForm = reduxForm({
  form: "trackTimeForm",
  enableReinitialize: true,
})(Time);

export default connect(mapStateToProps, {
  createTime,
  saveTime,
})(trackTimeForm);
