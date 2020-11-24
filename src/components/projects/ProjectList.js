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
  const [overIndex, setOverIndex] = useState(-1);
  const timeoutIdRef = useRef(null);
  const draggingValue = useRef(null);
  const [count, setCount] = useState(0);
  const projectIdsRef = useRef(null);
  useEffect(() => {
    fetchProjects(userId);
  }, [fetchProjects, userId]);

  useEffect(() => {
    setData(projects);
    if (projectIdsRef.current === null && projects.length) {
      projectIdsRef.current = projects.map((ele) => ele.id);
    }
  }, [projects]);

  const changeIndexOfProject = async (projectId, newIndex) => {
    const res = await timeCloudAPI().put(
      `projects/${projectId}/users/${userId}/${newIndex}`
    );
    return res.data;
  };

  const dragStartHandler = (event, index) => {
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
    setCount(0);
  };

  const onDragEnterHandler = (event, index) => {
    setCount(count + 1);
    if (draggingIndex !== index) {
      setOverIndex(index);
    }
  };
  const onDragLeaveHandler = (event) => {
    setCount(count - 1);
    if (count - 1 === 0) {
      setOverIndex(-1);
    }
  };

  const onDragOverHandler = (event, index) => {
    event.preventDefault();

    if (projects[index] !== draggingValue.current) {
      swap(draggingIndex, overIndex);
      setDraggingIndex(overIndex);
    }
  };

  const onDropHandler = () => {
    if (overIndex >= 0) {
      swap(draggingIndex, overIndex);
    }
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      if (
        !data.every((ele, index) => ele.id === projectIdsRef.current[index])
      ) {
        Promise.all(
          data.map((project, index) => changeIndexOfProject(project.id, index))
        ).then((res) => {
          projectIdsRef.current = data.map((ele) => ele.id);
          fetchProjectsSuccess(data);
        });
      }
    }, 3000);
  };

  const swap = (fromIndex, toIndex) => {
    const arrTemp = [...data];
    const temp = arrTemp[fromIndex];
    arrTemp[fromIndex] = arrTemp[toIndex];
    arrTemp[toIndex] = temp;
    setData(arrTemp);
  };

  const renderProjectList = () => {
    console.log(
      projectIdsRef.current,
      data.map((ele) => ele.id)
    );
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
          onDragEnter={(event) => onDragEnterHandler(event, index)}
          onDragLeave={onDragLeaveHandler}
          onDragOver={(event) => onDragOverHandler(event, index)}
          onDrop={onDropHandler}
        >
          <ProjectItem
            project={project}
            onDragStartHandler={dragStartHandler}
            onDragEndHandler={onDragEndHandler}
            index={index}
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
