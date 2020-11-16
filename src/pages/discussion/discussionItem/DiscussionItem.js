import "./DiscussionItem.css";
import React, { useState, useEffect } from "react";
import Interact from "../../../components/interact/Interact";
import Content from "../content/Content";
import Comment from "../comment/Comment";
import timeCloudAPI from "../../../apis/timeCloudAPI";

const DiscussionItem = ({ discussion, onDeleteItem }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(null);

  const onButtonCommentClick = () => {
    setShowComment(!showComment);
  };

  const getClassNameType = () => {
    if (discussion.type === 0) {
      return { className: "discussion_item__type__error", name: "Bug" };
    } else if (discussion.type === 1) {
      return { className: "discussion_item__type__feature", name: "Feature" };
    } else if (discussion.type === 2) {
      return { className: "discussion_item__type__approve", name: "Approve" };
    }
    return { className: "discussion_item__type__none", name: "None" };
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
          <Interact discussionId={discussion.id} />
          <Content
            amountOfComment={comments?.length}
            onButtonCommentClick={onButtonCommentClick}
            discussion={discussion}
            onDelete={onDeleteItem}
          />
        </div>
        <div
          className={`discussion_item__type ${getClassNameType().className}`}
        >
          {getClassNameType().name}
        </div>
      </div>
      {showComment && (
        <div className="discussion_item__comment">
          <Comment
            totalComments={comments}
            isShow={showComment}
            discussion={discussion}
            onCloseHandler={() => setShowComment(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionItem;
