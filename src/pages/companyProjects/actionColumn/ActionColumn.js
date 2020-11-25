import "./ActionColumn.css";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/AssignmentTurnedIn";
import Modal from "../../../components/modal/Modal";
import timeCloudAPI from '../../../apis/timeCloudAPI';
const styleCom = {
  fontSize: "3rem",
};

const ActionColumn = ({ project, onEdit, deleteProject }) => {
  const [showModal, setShowModal] = useState(false);
  const onModalClose = () => {
    setShowModal(false);
  };

  const renderModalAction = () => {
    return (
      <div className="action_column__button">
        <button
          onClick={() => {
            setShowModal(false);
            timeCloudAPI().delete(`projects/${project.id}`);
            deleteProject(project);
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setShowModal(false);
          }}
        >
          No
        </button>
      </div>
    );
  };
  return (
    <>
      <EditIcon
        style={{ ...styleCom, marginRight: "5px" }}
        className="projects__icon projects__icon__edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(project);
        }}
      />
      {project.available && (
        <DeleteIcon
          style={{ ...styleCom }}
          className=" projects__icon projects__icon__delete"
          onClick={(e) => {
            e.stopPropagation();
            // onDelete(project.id);
            setShowModal(true);
          }}
        />
      )}

      <Modal
        show={showModal}
        title="Finish project!"
        renderContent={() => `Are you sure to finish ${project.name}?`}
        renderAction={renderModalAction}
        onCloseModal={onModalClose}
      />
    </>
  );
};

export default ActionColumn;
