import "./DiscussionItem.css";
import React, { useState } from "react";
import Interact from "../../../components/interact/Interact";
import Content from "../content/Content";
import Comment from "../comment/Comment";

const DiscussionItem = () => {
  const [showComment, setShowComment] = useState(false);

  const onButtonCommentClick = () => {
    setShowComment(!showComment);
  };
  return (
    <div className="discussion_item">
      <div
        className="discussion_item__top"
        style={{
          boxShadow: showComment
            ? "2px 2px .5rem rgba(0, 0, 0, .5)"
            : "initial",
        }}
      >
        <div>
          <Interact />
          <Content onButtonCommentClick={onButtonCommentClick} />
        </div>
        <div className="discussion_item__type">Feature</div>
      </div>
      {showComment && (
        <div className="discussion_item__comment">
          <Comment
            isShow={showComment}
            onCloseHandler={() => setShowComment(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionItem;
