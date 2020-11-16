import "./CommentItem.css";
import React, {useState} from "react";
import Avatar from "../../../../components/avatar/Avatar";
import PublicIcon from "@material-ui/icons/Public";
import timeCloudAPI from '../../../../apis/timeCloudAPI';
import {getTimeWriteDiscussion} from '../../../../utils/Utils';

const CommentItem = ({ comment, user, onDeleteComment, discussion }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState(comment.content);

  const onEdit = () => {
    setEditStatus(!editStatus);
  }

  const onSubmit = (e) => {
    if(e.key == "Enter" && editCommentInput) {
      setEditStatus(!editStatus);
      let data={
        content: editCommentInput,
        discussionId: discussion.id,
        userId: user.id
      }
      timeCloudAPI().put(`comments/${comment.id}`, data)
      .then(res => {
        setEditCommentInput(res.data.content);
      })
    }
  }

  return (
    <div className="comment_item" style={{ width: "f" }}>
      <Avatar
        avatar={comment.user.avatar}
        avatarSize="3rem"
        css={{
          borderRadius: "2rem",
          backgroundColor: "#F0F2F5",
          padding: ".7rem",
          marginRight: "2rem",
        }}
        cssImage={{ alignSelf: "center" }}
      >
        <div className="comment_item__content">
          <div className="comment_item__content__header">
            <span> {comment.user.name} </span>
            <span> {getTimeWriteDiscussion(comment.createAt)} </span>
            <PublicIcon style={{ marginLeft: ".3rem", color: "#AEAEAE" }} />
            {
              comment.user.id == user.id ?
              <div className="comment__actions">
                <p className="comment__actions__edit" onClick={onEdit}> Edit </p>
                <p className="comment__actions__delete" onClick={onDeleteComment}> Delete </p>
              </div>
              : ""
            }
          </div>

          <input
            type="text"
            value={editCommentInput}
            onChange={(e) => {setEditCommentInput(e.target.value)}}
            onKeyDown={(e) => onSubmit(e)}
            style={{border: editStatus ? "1px solid darkgray" : "none", backgroundColor: editStatus ? "white" : "#F0F2F5"}}
            readOnly= {!editStatus}
          />
        </div>
      </Avatar>
    </div>
  );
};

export default CommentItem;
