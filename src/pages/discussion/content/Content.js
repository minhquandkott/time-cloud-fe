import React from "react";
import ProjectName from "../../../components/projectName/ProjectName";
import DiscussionAuthor from "../../../components/discussionAuthor/DiscussionAuthor";
import PublicIcon from "@material-ui/icons/Public";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./Content.css";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const Content = ({ onButtonCommentClick }) => {
  return (
    <div className="content">
      <div className="content__text">
        This is a discussion. I want to make it as long as posible. But it's
        still short. Now it's longer. Ok, that is enough.
      </div>
      <div className="content__attributes">
        <ProjectName />
        <DiscussionAuthor />
        <p>
          43 minutes ago <PublicIcon style={{ marginLeft: ".3rem" }} />
        </p>
        <FiberManualRecordIcon
          style={{ fontSize: ".5rem", margin: "0 1rem" }}
        />
        <div className="content__actions">
          <div className="content__button__comment">
            <ChatBubbleOutlineIcon style={{ color: "red" }} />
            <p onClick={onButtonCommentClick}> 4 comments </p>
          </div>
          <p className="content__button__edit"> Edit </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
