import React, { useState, useEffect } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./Interact.css";
import timeCloudAPI from "../../apis/timeCloudAPI";

const Interact2 = ({ discussionId, user }) => {
  const [interactStatus, setInteractStatus] = useState(false);
  const [interact, setInteract] = useState([]);

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
      userId: user.id,
      discussionId: discussionId,
    });
    setInteract([
      ...interact,
      { user: { id: user.id }, discussion: { id: discussionId } },
    ]);
  };
  const onDislikeHandler = () => {
    timeCloudAPI().post("interacts/delete", {
      userId: user.id,
      discussionId: discussionId,
    });
    setInteract(interact.filter((element) => element.user.id !== user.id));
  };

  useEffect(() => {
    timeCloudAPI()
      .get(`discussions/${discussionId}/interacts`)
      .then((response) => {
        setInteract(response.data);
        response.data.forEach((element) => {
          if (element.user.id === user.id) setInteractStatus(true);
        });
      })
      .catch((error) => {});
  }, [discussionId, user.id]);

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
