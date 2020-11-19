import "./DiscussionItem.css";
import React, { useState, useEffect } from "react";
import Interact from "../../../components/interact/Interact";
import Content from "../content/Content";
import Comment from "../comment/Comment";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import { RestoreRounded } from "@material-ui/icons";

const DiscussionItem = ({ discussion, onDeleteItem, user }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(null);
  const [data, setData] = useState(discussion);

  const onButtonCommentClick = () => {
    setShowComment(!showComment);
  };

  const onAddComment = (comment) => {
    timeCloudAPI()
      .post(`/comments`, comment)
      .then((res) => {
        setComments([...comments, res.data]);
      });
  };

  useEffect(() => {
    timeCloudAPI()
      .get(`discussions/${data.id}/comments`)
      .then((res) => {
        setComments(res.data);
      });
  }, [data.id]);

  const onDeleteComment = (commentId) => {
    timeCloudAPI()
      .delete(`comments/${commentId}`)
      .then((res) => {
        setComments(comments.filter((ele) => ele.id !== commentId));
      });
  };

  const onEditDiscussion = (value) => {
    timeCloudAPI()
      .put(`discussions/${data.id}`, {
        content: value,
        projectId: data.project.id,
        userId: data.user.id,
      })
      .then((res) => {
        if (res.data.type !== data.type) {
          setData(res.data);
        }
      });
  };

  const getClassNameType = () => {
    if (data.type === 0) {
      return { className: "discussion_item__type__error", name: "Bug" };
    } else if (data.type === 1) {
      return { className: "discussion_item__type__feature", name: "Feature" };
    } else if (data.type === 2) {
      return { className: "discussion_item__type__approve", name: "Approve" };
    }
    return { className: "discussion_item__type__none", name: "Others" };
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
          <Interact discussionId={data.id} />
          <Content
            amountOfComment={comments?.length}
            onButtonCommentClick={onButtonCommentClick}
            discussion={data}
            onDelete={onDeleteItem}
            onEdit={onEditDiscussion}
            user={user}
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
            comments={comments}
            isShow={showComment}
            discussion={data}
            onAddComment={onAddComment}
            onCloseHandler={() => setShowComment(false)}
            onDeleteComment={onDeleteComment}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionItem;
