import React, { useState, useEffect } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./Interact.css";
import timeCloudAPI from "../../apis/timeCloudAPI";

const Interact2 = ({ discussionId }) => {
  const [interactStatus, setInteractStatus] = useState(false);
  const [interact, setInteract] = useState([]);
  const userId = localStorage.getItem("userId");

  const onInteract = () => {
    setInteractStatus(!interactStatus);
    if (interactStatus) {
      onDislikeHandler();
    } else {
      onLikeHandler();
    }
  };

  const onLikeHandler = () => {
    timeCloudAPI().post("interacts", {
      userId: userId,
      discussionId: discussionId,
    });
    setInteract([
      ...interact,
      { user: { id: userId }, discussion: { id: discussionId } },
    ]);
  };
  const onDislikeHandler = () => {
    timeCloudAPI().post("interacts/delete", {
      userId: userId,
      discussionId: discussionId,
    });
    setInteract(interact.filter((element) => element.user.id != userId));
  };

  useEffect(() => {
    timeCloudAPI()
      .get(`discussions/${discussionId}/interacts`)
      .then((response) => {
        setInteract(response.data);
        response.data.forEach((element) => {
          if (element.user.id == userId) setInteractStatus(true);
        });
      })
      .catch((error) => {});
  }, [discussionId, userId]);

  return (
    <div className="interact">
      <button onClick={onInteract}>
        <ThumbUpAltIcon
          style={{
            color: interactStatus ? "4080FF" : "darkGray",
            backgroundColor: "white",
          }}
        />
      </button>
      <p> {interact.length} </p>
    </div>
  );
};

export default Interact2;
