import "./Comment.css";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./commentItem/CommentItem";
import Avatar from "../../../components/avatar/Avatar";
import { connect } from "react-redux";
import { v4 } from "uuid";

const Comment = ({
  isShow,
  user,
  discussion,
  comments,
  onAddComment,
  onDeleteComment,
  project,
}) => {
  const commentRef = useRef(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (isShow) {
      console.dir(commentRef.current);
    }
  }, [isShow]);

  const onSubmit = (e) => {
    if (e.key === "Enter" && commentInput) {
      let data = {
        content: commentInput,
        discussionId: discussion.id,
        userId: user.id,
      };
      setCommentInput("");
      onAddComment(data);
    }
  };

  if (isShow === false) return null;
  return (
    <div className="comment" ref={commentRef}>
      {comments?.map((comment, index) => {
        return (
          <CommentItem
            comment={comment}
            user={user}
            key={v4()}
            onDeleteComment={() => onDeleteComment(comment.id)}
            discussion={discussion}
            project={project}
          />
        );
      })}
      <Avatar
        avatarSize="3rem"
        avatar={user?.avatar}
        css={{ marginTop: "1rem" }}
      >
        <div className="comment__input">
          <input
            placeholder="Write comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => onSubmit(e)}
          />
        </div>
      </Avatar>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Comment);
