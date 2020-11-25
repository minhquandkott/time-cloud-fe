import React, { useEffect, useState, useRef } from "react";
import "./ProjectList.css";
import { fetchProjects, fetchProjectsSuccess } from "../../redux/actions";
import { connect } from "react-redux";
import ProjectItem from "./projectItem/ProjectItem";
import TaskList from "../tasks/TaskList";
import Skeleton from "../loading/skeleton/Skeleton";
import timeCloudAPI from "../../apis/timeCloudAPI";

const ProjectList = ({
  projects,
  isFetching,
  userId,
  fetchProjects,
  fetchProjectsSuccess,
}) => {
  const [data, setData] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [stable, setStable] = useState(true);
  const timeoutIdRef = useRef(null);
  const draggingValue = useRef(null);
  const projectIdsRef = useRef(null);
  useEffect(() => {
    fetchProjects(userId);
  }, [fetchProjects, userId]);

  useEffect(() => {}, [stable]);

  useEffect(() => {
    setData(projects);
    if (projectIdsRef.current === null && projects.length) {
      projectIdsRef.current = projects.map((ele) => ele.id);
    }
  }, [projects]);

  const changeIsShow = async (projectId, isShow) => {
    const res = await timeCloudAPI().put(
      `projects/${projectId}/users/${userId}`,
      {
        isShow,
      }
    );
    fetchProjectsSuccess(
      data.map((ele) => {
        if (ele.id === projectId) {
          return { ...ele, isShow };
        }
        return ele;
      })
    );
    return res.data;
  };

  const changeIndexOfProjects = async () => {
    const arrAPI = [];
    data.forEach((project, index) => {
      if (project.id !== projectIdsRef.current[index]) {
        arrAPI.push(
          timeCloudAPI().put(`projects/${project.id}/users/${userId}`, {
            index: index,
          })
        );
      }
    });
    await Promise.all(arrAPI);
    fetchProjectsSuccess(data);
    projectIdsRef.current = data.map((ele) => ele.id);
  };

  const dragStartHandler = (index) => {
    setStable(false);
    setTimeout(() => {
      setDraggingIndex(index);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      draggingValue.current = data[index];
    }, 0);
  };

  const onDragEndHandler = () => {
    setDraggingIndex(-1);
  };

  const onDragOverHandler = (event, index) => {
    event.preventDefault();
    if (data[index] !== draggingValue.current) {
      swap(draggingIndex, index);
      setDraggingIndex(index);
    }
  };

  const onDropHandler = () => {
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      changeIndexOfProjects();
    }, 2000);
  };

  const swap = (fromIndex, toIndex) => {
    const arrTemp = [...data];
    const temp = arrTemp[fromIndex];
    arrTemp[fromIndex] = arrTemp[toIndex];
    arrTemp[toIndex] = temp;
    setData(arrTemp);
  };

  const renderProjectList = () => {
    if (isFetching) {
      return <Skeleton countItem={4} heightItem="15rem" direction="row" />;
    }
    return data.map((project, index) => {
      let className = "";
      if (index === draggingIndex) className += " container_dragging";

      return (
        <div
          key={project.id}
          className={className}
          onDragOver={(event) => onDragOverHandler(event, index)}
          onDrop={onDropHandler}
        >
          <ProjectItem
            project={project}
            onDragStartHandler={() => dragStartHandler(index)}
            onDragEndHandler={onDragEndHandler}
            index={index}
            changeIsShow={changeIsShow}
          >
            <TaskList tasks={project.tasks} />
          </ProjectItem>
        </div>
      );
    });
  };
  return <div className="project_list">{renderProjectList()}</div>;
};

const mapStateToProps = (state) => {
  const { projects, auth } = state;
  const { isFetching } = projects;
  const { userId } = auth;
  return {
    projects: projects["projects"],
    isFetching: isFetching,
    userId,
  };
};

export default connect(mapStateToProps, {
  fetchProjects,
  fetchProjectsSuccess,
})(ProjectList);
