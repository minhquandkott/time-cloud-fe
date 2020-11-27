import "./DiscussionItem.css";
import React, { useState, useEffect } from "react";
import Interact from "../../../components/interact/Interact";
import Content from "../content/Content";
import Comment from "../comment/Comment";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import DropDown2 from "../../../components/dropdown2/DropDown2";

const types = ["Bug", "Feature", "Approve", "Others"];

const DiscussionItem = ({ discussion, onDeleteItem, user, project }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(null);
  const [data, setData] = useState(discussion);
  const [editMode, setEditMode] = useState(false);
  const [showDDType, setShowDDType] = useState(false);

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

  const updateDiscussionType = (type) => {
    setShowDDType(false);
    const typeIndex = types.findIndex((ele) => ele === type);
    timeCloudAPI().put(`discussions/${data.id}/type/${typeIndex}`);
    setData({ ...data, type: typeIndex });
  };

  const renderDDType = () => {
    return (
      <div
        className="discussion__content_dd_project"
        onClick={(e) => e.stopPropagation()}
      >
        {types
          .filter((ele, index) => index !== data.type)
          .map((type, index) => {
            return (
              <p
                onClick={(index) => {
                  updateDiscussionType(type);
                }}
                key={index}
              >
                {type}
              </p>
            );
          })}
      </div>
    );
  };

  const getClassNameType = (type) => {
    if (type === 0) {
      return { className: "discussion_item__type__error", name: "Bug" };
    } else if (type === 1) {
      return { className: "discussion_item__type__feature", name: "Feature" };
    } else if (type === 2) {
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
          <Interact discussionId={data.id} user={user} />
          <Content
            amountOfComment={comments?.length}
            onButtonCommentClick={onButtonCommentClick}
            discussion={data}
            onDelete={onDeleteItem}
            onEdit={onEditDiscussion}
            user={user}
            project={project}
          />
        </div>
        <div
          onClick={() => setShowDDType(!showDDType)}
          className={`discussion_item__type ${
            getClassNameType(data.type).className
          }`}
        >
          {getClassNameType(data.type).name}
          <DropDown2
            isShow={showDDType}
            onCloseHandler={() => setShowDDType(false)}
            renderContent={() => renderDDType()}
            css={{
              boxShadow: "2px 2px 8px rgba(133,134,245, .7)",
              borderRadius: ".5rem",
              transform: "translateY(80%) translateX(15%)",
              border: "1px solid #8586F5",
              padding: "2px",
            }}
          />
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
            project={project}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionItem;
