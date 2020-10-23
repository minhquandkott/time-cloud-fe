import React, { useEffect, useRef } from "react";
import "./Time.css";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";
import {
  increaseTime,
  beginCountingTime,
  endCountingTime,
  fetchTimes,
  checkTime,
  setDescription,
  saveTime,
} from "../../redux/actions";
import Counter from "../counter/Counter";
import Spinner from "../loading/spinner/Spinner";
import DropDownTime from "../dropdown/DropDown";
import TaskItem from "../tasks/taskItem/TaskItem";
import Point from "../point/Point";
import ProjectTask from "../projectTask/ProjectTask";
import { DESCRIPTION } from "../../utils/localStorageContact";

const Time = ({
  isCounting,
  times,
  projects,
  tasks,
  selectedTask,
  fetchTimes,
  userId,
  description,
  checkTime,
  isSaving,
  setDescription,
  saveTime,
  endCountingTime,
}) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (!selectedTask) {
      checkTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const arrChild = document.querySelectorAll(".time__middle *");
    const checkbox = checkboxRef.current;
    window.addEventListener("click", (event) => {
      if (![...arrChild].some((e) => e === event.target)) {
        checkbox.checked = false;
      }
    });
  }, []);
  useEffect(() => {
    fetchTimes(userId);
  }, [fetchTimes, userId]);

  const onPlayButtonClick = () => {
    if (isCounting) {
      saveTime();
    }
  };

  const renderRecentTask = () => {
    return times.map((time) => {
      return (
        <TaskItem task={time.task} key={time.id} title={time.description}>
          <ProjectTask
            projectName={time.task.project.name}
            taskName={time.task.name}
          />
        </TaskItem>
      );
    });
  };

  const renderListTask = () => {
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
              <Point color="#80A1D4" pointSize="20px" title={project.name}>
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

  const onDesInputChange = (event) => {
    setDescription(event.target.value);
    localStorage.setItem(DESCRIPTION, event.target.value);
  };

  return (
    <div className="time">
      <div className="time__left">
        <input
          placeholder="Description"
          type="text"
          className="form__input form__input__description"
          value={description}
          onChange={onDesInputChange}
          maxLength="30"
        />
        <DropDownTime title="recent_task">
          <div className="drop_down__recent_task">{renderRecentTask()}</div>
        </DropDownTime>
      </div>
      <div className="time__middle">
        <label htmlFor="task" className="time__middle__label">
          {selectedTask ? (
            <ProjectTask
              projectName={selectedTask.project.name}
              taskName={selectedTask.name}
            />
          ) : (
            <p>Task...</p>
          )}
        </label>
        <input type="checkbox" id="task" ref={checkboxRef} />
        <DropDownTime>
          <div className="drop_down__list_task">{renderListTask()}</div>
        </DropDownTime>
      </div>
      <div className="time__right">
        <Counter />
        <button className="form__button" onClick={() => onPlayButtonClick()}>
          {isSaving ? (
            <div className="form__icon__save">
              <Spinner />
            </div>
          ) : isCounting ? (
            <PauseIcon className="form__icon__pause" />
          ) : (
            <PlayCircleFilledWhiteIcon className="form__icon__play" />
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    isCounting,
    intervalId,
    beginTime,
    selectedTask,
    description,
    isSaving,
  } = state.time;
  const { times } = state.times;
  const { projects } = state.projects;
  const { tasks } = state.tasks;
  const { userId } = state.auth;

  return {
    isCounting,
    intervalId,
    beginTime,
    selectedTask,
    times,
    projects,
    tasks,
    userId,
    description,
    isSaving,
  };
};

export default connect(mapStateToProps, {
  increaseTime,
  beginCountingTime,
  endCountingTime,
  fetchTimes,
  checkTime,
  setDescription,
  saveTime,
})(Time);
