import "./CommentItem.css";
import React from "react";
import Avatar from "../../../../components/avatar/Avatar";
import PublicIcon from "@material-ui/icons/Public";

const CommentItem = ({ title }) => {
  return (
    <div className="comment_item" style={{ width: "f" }}>
      <Avatar
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
            <span>vanhiep99w</span>
            <span>43 minute ago</span>
            <PublicIcon style={{ marginLeft: ".3rem", color: "#AEAEAE" }} />
          </p>

          <p>{title}</p>
        </div>
      </Avatar>
    </div>
  );
};

export default CommentItem;
