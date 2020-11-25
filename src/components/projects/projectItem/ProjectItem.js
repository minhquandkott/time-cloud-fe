import React, { useState, useRef } from "react";
import "./ProjectItem.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const ProjectItem = ({
  project,
  index,
  onDragStartHandler,
  onDragEndHandler,
  children,
  changeIsShow,
}) => {
  const [isShow, setIsShow] = useState(project.isShow);
  const style = { backgroundColor: `${project.color}` };
  const timeoutIdRef = useRef(null);

  const onButtonClickHandler = () => {
    const temp = !isShow;
    setIsShow(temp);

    //make sure component stable
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      changeIsShow(project.id, temp);
    }, 2000);
  };
  return (
    <div className={`project_item ${isShow ? "" : "nonvisible"}`} style={style}>
      <div
        className=" project_header__drag_item"
        draggable={true}
        onDragStart={(event) => onDragStartHandler(event, index)}
        onDragEnd={onDragEndHandler}
      >
        <div className="project_header__company_name">
          <h3>{project.company.name}</h3>
          <button onClick={onButtonClickHandler}>
            {isShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        </div>
        <h2>{project.name}</h2>
      </div>
      {isShow && <div className="project_item__info">{children}</div>}
    </div>
  );
};

export default ProjectItem;
