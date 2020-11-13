import "./DiscussionItem.css";
import React, { useState, useEffect } from "react";
import Interact from "../../../components/interact/Interact";
import Content from "../content/Content";
import Comment from "../comment/Comment";
import timeCloudAPI from '../../../apis/timeCloudAPI';

const DiscussionItem = ({discussion, onDeleteItem}) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(null);
  
  useEffect(() => {
    timeCloudAPI().get(`discussions/${discussion.id}/comments`)
    .then(res => {
      setComments(res.data)
    })
  },[])

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
          <Interact discussionId={discussion.id}/>
          <Content
            amountOfComment={comments?.length}
            onButtonCommentClick={onButtonCommentClick}
            discussion={discussion}
            onDelete={onDeleteItem}
          />
        </div>
        <div className="discussion_item__type">Feature</div>
      </div>
      {showComment && (
        <div className="discussion_item__comment">
          <Comment
            totalComments={comments}
            isShow={showComment}
            discussion = {discussion}
            onCloseHandler={() => setShowComment(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionItem;
