import "./Comment.css";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./commentItem/CommentItem";
import Avatar from "../../../components/avatar/Avatar";
import timeCloudAPI from '../../../apis/timeCloudAPI';
import { connect } from "react-redux";
import {v4} from 'uuid';

const Comment = ({ isShow, onCloseHandler, user, discussion, totalComments }) => {
  const commentRef = useRef(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (isShow) {
      console.dir(commentRef.current);
    }
  }, [isShow]);

  useEffect(() => {
    setComments(totalComments)
  }, []);

  const onDeleteComment = (comment) => {
    if(window.confirm('Delete this comment!!')) {
      timeCloudAPI().delete(`comments/${comment.id}`)
      .then(res => {
        setComments(comments.filter(ele => ele.id !== comment.id))
      })
    }
  }

  const onSubmit = (e) => {
    if(e.key === "Enter" && commentInput) {
      let data = {
        content: commentInput,
        discussionId: discussion.id,
        userId: user.id
      }
      console.log(data);
      timeCloudAPI().post(`/comments`, data)
      .then(res => {
        setComments([...comments, res.data])
        setCommentInput("")
      })
    }
  }

  if (isShow === false) return null;
  return (
    <div className="comment" ref={commentRef}>
      <Avatar avatarSize="3rem" avatar={user?.avatar}>
        <div className="comment__input">
          <input
            placeholder="Write comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => onSubmit(e)}
          />
        </div>
      </Avatar>
      {
        comments?.map((comment, index) => {
          return <CommentItem comment={comment} user={user} key={v4()} onDeleteComment={() => onDeleteComment(comment)}/>
        })
      }
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
