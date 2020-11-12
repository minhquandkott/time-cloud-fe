import React, { Component } from "react";
import Interact from "../../components/interact/Interact";
import Content from "./content/Content";
import Avatar from "../../components/avatar/Avatar";
import male from "../../assets/images/male.png";
import timeCloudAPI from "../../apis/timeCloudAPI";
import "./Discussion.css";
import PageDesign from "../../components/pageDesign/PageDesign";
import Square from "../../components/square/Square";
import DiscussionItem from "./discussionItem/DiscussionItem";

class Discussion extends Component {
  state = {
    projects: [],
  };
  endRef = React.createRef();

  componentDidMount() {
    this.endRef.current.scrollIntoView();
    timeCloudAPI()
      .get(`users/${localStorage.getItem("userId")}/projects-available`)
      .then((res) => {
        this.setState({
          projects: res.data,
        });
      });
  }

  render() {
    const { projects } = this.state;
    return (
      <PageDesign title="Discussion">
        <div className="discussion">
          <div className="discussion__content">
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <div ref={this.endRef}></div>
          </div>
          <div className="discussion__footer">
            <Avatar
              avatar={male}
              avatarSize="3.5rem"
              cssImage={{ boxShadow: "2px 2px 1rem rgba(0, 0, 0, .6)" }}
            />
            <input type="text" placeholder="Write discussion..." />
          </div>
        </div>
      </PageDesign>
    );
  }
}

export default Discussion;
