import React, { useEffect, useState } from "react";
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
  addTimeOfSelectedDay,
  selectTask,
  fetchLastTimeCurrentDay,
  setLastTimeCurrentDay,
} from "../../redux/actions";
import Counter from "../counter/Counter";
import Spinner from "../loading/spinner/Spinner";
import DropDownTime from "../dropdown/DropDown";
import TaskItem from "../tasks/taskItem/TaskItem";
import ListProjectTask from "../listProjectTask/ListProjectTask";
import ProjectTask from "../projectTask/ProjectTask";
import {
  DESCRIPTION,
  BEGIN_TIME,
  SELECTED_TASK_ID,
} from "../../utils/localStorageContact";
import DropDown2 from "../dropdown2/DropDown2";
import { convertHours } from "../../utils/Utils";
import CheckIcon from "@material-ui/icons/Check";
import TimeDDStartTime from "./timeDDStartTime/TimeDDStartTime";

const Time = ({
  isCounting,
  times,
  selectedTask,
  fetchTimes,
  userId,
  description,
  checkTime,
  isSaving,
  setDescription,
  saveTime,
  addTimeOfSelectedDay,
  selectTask,
  increaseTime,
  beginCountingTime,
  projects,
  beginTime,
  fetchLastTimeCurrentDay,
  setLastTimeCurrentDay,
}) => {
  const [showDDProjectTask, setShowDDProjectTask] = useState(false);
  const [showDDStartTime, setShowDDStartTime] = useState(false);

  useEffect(() => {
    if (!selectedTask) {
      checkTime();
      fetchLastTimeCurrentDay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {});
  useEffect(() => {
    fetchTimes(userId);
  }, [fetchTimes, userId]);

  const onPlayButtonClick = () => {
    if (isCounting) {
      saveTime().then((res) => {
        const savedTime = res.data;
        addTimeOfSelectedDay(savedTime);
        fetchTimes(userId);
        setLastTimeCurrentDay(savedTime);
      });
    }
  };

  const onTaskClick = (task) => {
    selectTask(task);
    localStorage.setItem(SELECTED_TASK_ID, task.id);
    if (!isCounting) {
      const now = new Date();
      localStorage.setItem(BEGIN_TIME, now);
      const intervalId = window.setInterval(() => {
        increaseTime(1);
      }, 1000);
      beginCountingTime(now, intervalId);
    }
  };

  const renderRecentTask = () => {
    return times.map((time) => {
      return (
        <TaskItem task={time.task} key={time.id} title={time.description}>
          <ProjectTask
            projectName={time.task.project.name}
            taskName={time.task.name}
            projectColor={time.task.project.color}
          />
        </TaskItem>
      );
    });
  };

  const renderFlagTask = (task) => {
    if (task.id === selectedTask?.id) {
      return (
        <CheckIcon
          style={{
            fontSize: "2rem",
            backgroundColor: "var(--color-button)",
            borderRadius: "50%",
            color: "white",
          }}
        />
      );
    }
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
              projectColor={selectedTask.project.color}
            />
          ) : (
            <p>Task...</p>
          )}
        </label>
        <input
          type="checkbox"
          id="task"
          onChange={(e) => {
            setShowDDProjectTask(e.target.checked);
            e.stopPropagation();
          }}
          checked={showDDProjectTask}
        />
        <DropDown2
          isShow={showDDProjectTask}
          onCloseHandler={() => setShowDDProjectTask(false)}
          renderContent={() => (
            <ListProjectTask
              onClickTaskHandler={onTaskClick}
              renderFlagTask={renderFlagTask}
              projects={projects}
            />
          )}
          maxHeight="40rem"
        />
      </div>
      <div className="time__right">
        <div className="time__start_time">
          {isCounting && (
            <p onClick={() => setShowDDStartTime(true)}>
              {convertHours(beginTime.getHours(), beginTime.getMinutes())}
            </p>
          )}
          <DropDown2
            isShow={showDDStartTime}
            onCloseHandler={() => setShowDDStartTime(false)}
            renderContent={() => (
              <TimeDDStartTime onCloseDD={() => setShowDDStartTime(false)} />
            )}
            css={{ padding: 0 }}
          />
        </div>

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
  const { userId } = state.auth;
  const { projects } = state.projects;

  return {
    isCounting,
    intervalId,
    beginTime,
    selectedTask,
    times,
    userId,
    description,
    isSaving,
    projects,
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
  addTimeOfSelectedDay,
  selectTask,
  fetchLastTimeCurrentDay,
  setLastTimeCurrentDay,
})(Time);
