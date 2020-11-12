import "./Comment.css";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./commentItem/CommentItem";
import Avatar from "../../../components/avatar/Avatar";
import { connect } from "react-redux";

const Comment = ({ isShow, onCloseHandler, user }) => {
  const commentRef = useRef(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (isShow) {
      console.dir(commentRef.current);
    }
  }, [isShow]);

  if (isShow === false) return null;
  return (
    <div className="comment" ref={commentRef}>
      <Avatar avatarSize="3rem" avatar={user?.avatar}>
        <div className="comment__input">
          <input
            placeholder="Write comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
        </div>
      </Avatar>
      <CommentItem title="i want to become rick" />
      <CommentItem title="có cái acc cũ của dzogame đuôi email vào chơi lên lv 29 rồi. Sau đăng nhập mãi ko dc, toàn báo lỗi . Chán xóa mệ luôn khỏi chơi cho lành" />
      <CommentItem title="it really importance it will save my life" />
      <CommentItem title="Bữa trước online thấy ô Hoa sơn dame skill phong tống Tử hà, Thanh Phong tống sản đóng băng chân ko di chuyển dc, DH 1 chạm nữa là mất ham rồi. Fix dùm đi Admin???" />
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
