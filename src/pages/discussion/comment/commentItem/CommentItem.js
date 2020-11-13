import "./CommentItem.css";
import React from "react";
import Avatar from "../../../../components/avatar/Avatar";
import PublicIcon from "@material-ui/icons/Public";
import timeCloudAPI from '../../../../apis/timeCloudAPI';

const CommentItem = ({ comment, user, onDeleteComment }) => {

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
          <p>
            <span> {comment.user.name} </span>
            <span>43 minute ago</span>
            <PublicIcon style={{ marginLeft: ".3rem", color: "#AEAEAE" }} />
            {
              comment.user.id == user.id ?
              <div className="comment__actions">
                <p className="comment__actions__edit" > Edit </p>
                <p className="comment__actions__delete" onClick={onDeleteComment}> Delete </p>
              </div>
              : ""
            }
          </p>

          <p>{comment.content}</p>
        </div>
      </Avatar>
    </div>
  );
};

export default CommentItem;
