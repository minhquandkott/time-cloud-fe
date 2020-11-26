import React, { useState, useEffect } from "react";
import ProjectName from "../../../components/projectName/ProjectName";
import DiscussionAuthor from "../../../components/discussionAuthor/DiscussionAuthor";
import PublicIcon from "@material-ui/icons/Public";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./Content.css";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { getTimeWriteDiscussion } from "../../../utils/Utils";
import Modal from "../../../components/modal/Modal";

const Content = ({
  onButtonCommentClick,
  discussion,
  onDelete,
  amountOfComment,
  onEdit,
  user,
  project
}) => {
  const [discussionInput, setDiscussionInput] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    setDiscussionInput(discussion.content);
  }, [discussion]);

  const onChange = (e) => {
    var target = e.target;
    var value = target.value;
    setDiscussionInput(value);
  };

  const onEditDiscussion = () => {
    setEditStatus(!editStatus);
  };

  const renderModalContent = () => {
    return (
      <div className="discussion__model_content">
        <p>Do you want to delete this discussion?</p>
      </div>
    );
  };

  const onDeleteItemClick = () => {
    setDeleteStatus(!deleteStatus);
  };

  const renderModalActions = () => {
    return (
      <div className="discussion__model_actions">
        <button onClick={onDelete}> Delete </button>
        <button onClick={onCancel}> Cancel </button>
      </div>
    );
  };

  const onCancel = () => {
    setDeleteStatus(false);
  };

  const onSubmit = (e) => {
    if (e.key === "Enter" && discussionInput) {
      setEditStatus(false);
      onEdit(discussionInput);
    }
  };

  const checkUserIsAdmin = (roles = []) => {
    let check = false;
    roles.forEach((role) => {
      if (role.name === "ADMIN") check = true;
    });
    return check;
  };

  const checkUserIsPM = () => {
    if(project?.projectManager?.id === user?.id) return true;
    return false;

  }

  return (
    <div className="content">
      <div className="content__text">
        <input
          style={{ border: editStatus ? "1px solid darkgray" : "none" }}
          readOnly={!editStatus}
          type="text"
          value={discussionInput}
          name="discussionInput"
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onSubmit(e)}
        />
      </div>
      <div className="content__attributes">
        <ProjectName project={discussion.project} />
        <DiscussionAuthor user={discussion.user} />
        <p>
          {getTimeWriteDiscussion(discussion.createAt)}{" "}
          <PublicIcon style={{ marginLeft: ".3rem" }} />
        </p>
        <FiberManualRecordIcon
          style={{ fontSize: ".5rem", margin: "0 1rem" }}
        />
        <div className="content__actions">
          <div className="content__button__comment">
            <ChatBubbleOutlineIcon style={{ color: "red" }} />
            <p onClick={onButtonCommentClick}> {amountOfComment} comments </p>
          </div>
          {discussion.user.id === user.id ? (
            <div className="content__button_actions">
              <p className="content__button__edit" onClick={onEditDiscussion}>
                {" "}
                Edit{" "}
              </p>
              <p
                className="content__button__delete"
                onClick={onDeleteItemClick}
              >
                {" "}
                Delete{" "}
              </p>
            </div>
          ) : (checkUserIsAdmin(user?.roles) || checkUserIsPM()) ? (
            <div className="content__button_actions">
              <p
                className="content__button__delete"
                onClick={onDeleteItemClick}
              >
                {" "}
                Delete{" "}
              </p>
            </div>
          ) : (
            ""
          )}
          <Modal
            onCloseModal={() => setDeleteStatus(false)}
            show={deleteStatus}
            title="Delete!"
            renderContent={() => renderModalContent()}
            renderAction={() => renderModalActions()}
            cssBody={{ minWidth: "35rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
