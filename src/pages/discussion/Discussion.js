import React, { Component } from "react";
import Avatar from "../../components/avatar/Avatar";
import male from "../../assets/images/male.png";
import timeCloudAPI from "../../apis/timeCloudAPI";
import "./Discussion.css";
import PageDesign from "../../components/pageDesign/PageDesign";
import DiscussionItem from "./discussionItem/DiscussionItem";
import { v4 } from "uuid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropDown2 from "../../components/dropdown2/DropDown2";
import Skeleton from "../../components/loading/skeleton/Skeleton";

const data = ["Bug", "Feature", "Approve"];
class Discussion extends Component {
  state = {
    projects: [],
    projectSelected: null,
    discussions: [],
    isLoading: false,
    showDDProject: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    timeCloudAPI()
      .get(`users/${localStorage.getItem("userId")}/projects-available`)
      .then((res) => {
        this.setState({
          projects: res.data,
        });
      });
    this.fetchAllDiscussion(0, 10, "createAt", "ACS");
  }

  fetchAllDiscussion(page, limit, sortBy, order) {
    timeCloudAPI()
      .get(`users/77/discussions?limit=${limit}&page=${page}`)
      .then((res) => {
        console.log(res.data);
      });
  }
  fetchAllDiscussionByProjectId(page, limit, sortBy, order) {}
  onSelectProject = (project) => {
    if (project.id === 0) {
      this.setState({ projectSelected: null });
      this.fetchAllDiscussion();
    } else {
      this.setState({ projectSelected: project }, () => {
        this.getAllDiscussionByProjectId();
      });
    }
  };
  renderContentDDProject = () => {
    const temp = [{ id: 0, name: "All" }, ...this.state.projects];
    return (
      <div className="discussion__content_dd_project">
        {temp.map((project) => {
          return <p key={project.id}>{project.name}</p>;
        })}
      </div>
    );
  };

  renderFilter = () => {
    return (
      <div
        className="discussion__filter"
        onClick={() => this.setState({ showDDProject: true })}
      >
        <div className="discussion__filter__project">
          <span>All</span>
          <ExpandMoreIcon />
          <DropDown2
            isShow={this.state.showDDProject}
            onCloseHandler={() => this.setState({ showDDProject: false })}
            renderContent={() => this.renderContentDDProject()}
            css={{
              boxShadow: "3px 3px 15px rgba(133,134,245, .7)",
              borderRadius: ".5rem",
              transform: "translateY(105%) translateX(0%)",
              border: "1px solid #8586F5",
              padding: "1px",
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    const { discussionInput, discussions, isLoading } = this.state;
    return (
      <PageDesign title="Discussion" headerRight={this.renderFilter()}>
        <div className="discussion">
          {isLoading ? (
            <>
              <Skeleton countItem={5} direction="row" heightItem="4rem" />
              <Skeleton countItem={2} direction="row" heightItem="4rem" />
              <Skeleton countItem={4} direction="row" heightItem="4rem" />
              <Skeleton countItem={1} direction="row" heightItem="4rem" />
              <Skeleton countItem={2} direction="row" heightItem="4rem" />
            </>
          ) : (
            <div className="discussion__content">
              {discussions?.map((discussion) => {
                return (
                  <DiscussionItem
                    key={v4()}
                    discussion={discussion}
                    onDeleteItem={() => this.onDeleteItem(discussion)}
                    onEditDiscussion={() => this.onEditDiscussion(discussion)}
                  />
                );
              })}
            </div>
          )}

          <div className="discussion__footer">
            <Avatar
              avatar={male}
              avatarSize="3.5rem"
              cssImage={{ boxShadow: "2px 2px 1rem rgba(0, 0, 0, .6)" }}
            />
            <input
              name="discussion"
              value={discussionInput}
              onChange={(e) => {
                this.setState({ discussionInput: e.target.value });
              }}
              onKeyDown={(e) => this.onSubmit(e)}
              type="text"
              placeholder="Write discussion..."
            />
          </div>
        </div>
      </PageDesign>
    );
  }
}

export default Discussion;
