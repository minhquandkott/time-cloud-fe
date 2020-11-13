import React, { useState, useEffect } from "react";
import ProjectName from "../../../components/projectName/ProjectName";
import DiscussionAuthor from "../../../components/discussionAuthor/DiscussionAuthor";
import PublicIcon from "@material-ui/icons/Public";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./Content.css";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import timeCloudAPI from '../../../apis/timeCloudAPI';

const Content = ({ onButtonCommentClick, discussion, onDelete, amountOfComment }) => {
  const [discussionInput, setDiscussionInput] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    setDiscussionInput(discussion.content)
  },[])

  const onChange = (e) => {
    var target = e.target;
    var value = target.value;
    setDiscussionInput(value);
  }

  const onEditDiscussion = () => {
    setEditStatus(true);
  }
  
  const onSubmit = (e) => {
    if(e.key === "Enter") {
      setEditStatus(false);
      var discussionUpdate = {
        content: discussionInput,
        projectId: discussion.project.id,
        userId: discussion.user.id,
        type: ""
      };
      timeCloudAPI().put(`discussions/${discussion.id}`, discussionUpdate)
      console.log(discussionUpdate);
    }
  }
  return (
    <div className="content">
      <div className="content__text">
        <input
          style={{border: editStatus ? "1px solid darkgray" : "none"}}
          readOnly= {!editStatus}
          type="text"
          value={discussionInput}
          name="discussionInput"
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onSubmit(e)}
        />
      </div>
      <div className="content__attributes">
        <ProjectName project={discussion.project}/>
        <DiscussionAuthor user ={discussion.user} />
        <p>
          43 minutes ago <PublicIcon style={{ marginLeft: ".3rem" }} />
        </p>
        <FiberManualRecordIcon
          style={{ fontSize: ".5rem", margin: "0 1rem" }}
        />
        <div className="content__actions">
          <div className="content__button__comment">
            <ChatBubbleOutlineIcon style={{ color: "red" }} />
            <p onClick={onButtonCommentClick}> {amountOfComment} comments </p>
          </div>
          {
            (discussion.user.id == localStorage.getItem("userId")) ?
              <div className="content__button_actions">
              <p className="content__button__edit" onClick={onEditDiscussion}> Edit </p>
              <p className="content__button__delete" onClick={onDelete}> Delete </p>
            </div>
            : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
