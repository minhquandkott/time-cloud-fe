import React, { Component } from "react";
import Avatar from "../../components/avatar/Avatar";
import timeCloudAPI from "../../apis/timeCloudAPI";
import "./Discussion.css";
import PageDesign from "../../components/pageDesign/PageDesign";
import DiscussionItem from "./discussionItem/DiscussionItem";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropDown2 from "../../components/dropdown2/DropDown2";
import Skeleton from "../../components/loading/skeleton/Skeleton";
import { USER_ID } from "../../utils/localStorageContact";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Spinner from "../../components/loading/spinner/Spinner";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

const defaultSelect = { id: 0, name: "All" };
class Discussion extends Component {
  state = {
    projects: [defaultSelect],
    projectSelected: null,
    discussions: [],
    isLoading: false,
    showDDProject: false,
    discussionInput: "",
    typeSelected: -1,
    currentPage: 0,
    showInputDiscussion: false,
    isSavingDiscussion: false,
  };

  contentRef = React.createRef();
  buttonBottomRef = React.createRef();

  onClickOutSizeFooter = (event) => {
    if (
      this.buttonBottomRef.current &&
      this.state.showInputDiscussion &&
      !this.state.discussionInput
    ) {
      this.buttonBottomRef.current.click();
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true, projectSelected: defaultSelect });
    timeCloudAPI()
      .get(`users/${localStorage.getItem(USER_ID)}/projects-available`)
      .then((res) => {
        this.setState({
          projects: [...this.state.projects, ...res.data],
        });
      });
    this.fetchAllDiscussion(this.state.currentPage, 7, "createAt").then((res) =>
      this.setState({ discussions: res, isLoading: false })
    );
    window.addEventListener("click", this.onClickOutSizeFooter);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutSizeFooter);
  }

  onFormSubmit(event) {
    const { discussionInput, projectSelected } = this.state;
    event.preventDefault();
    if (discussionInput && projectSelected.id !== 0) {
      this.setState({ isSavingDiscussion: true });
      timeCloudAPI()
        .post("discussions", {
          content: discussionInput,
          userId: localStorage.getItem(USER_ID),
          projectId: projectSelected.id,
        })
        .then((res) => {
          this.setState({
            discussions: [res.data, ...this.state.discussions],
            discussionInput: "",
            isSavingDiscussion: false,
          });
        });
    }
  }

  async fetchAllDiscussion(page, limit, sortBy) {
    const res = await timeCloudAPI().get(
      `users/${localStorage.getItem(
        USER_ID
      )}/discussions?limit=${limit}&page=${page}&sort_by=${sortBy}`
    );
    return res.data;
  }
  async fetchAllDiscussionByProjectId(
    projectId,
    page,
    limit,
    sortBy,
    order,
    type
  ) {
    const res = await timeCloudAPI().get(
      `projects/${projectId}/discussions?type=${
        type === -1 ? "" : type
      }&limit=${limit}&page=${page}&sort_by=${sortBy}&order=${order}`
    );
    return res.data;
  }
  async fetchDiscussions(page, limit) {
    const { projectSelected, typeSelected } = this.state;
    if (projectSelected.id === 0) {
      return await this.fetchAllDiscussion(page, limit, "createAt");
    } else {
      return await this.fetchAllDiscussionByProjectId(
        projectSelected.id,
        page,
        limit,
        "createAt",
        "DESC",
        typeSelected
      );
    }
  }

  onScrollContentHandler = (event) => {
    const { scrollHeight, offsetHeight, scrollTop } = event.currentTarget;
    if (scrollHeight - Math.ceil(scrollTop) === offsetHeight) {
      const { currentPage, discussions } = this.state;
      this.fetchDiscussions(currentPage + 1, 7).then((res) => {
        if (res.length) {
          this.setState({
            discussions: [...discussions, ...res],
            currentPage: currentPage + 1,
          });
          this.contentRef.current.scroll({
            top: offsetHeight,
            behavior: "smooth",
          });
        }
      });
    }
  };

  onSelectProject = (project) => {
    if (project.id !== this.state.projectSelected) {
      this.setState(
        {
          showDDProject: false,
          projectSelected: project,
          isLoading: true,
          currentPage: 0,
        },
        () => {
          this.fetchDiscussions(this.state.currentPage, 7).then((res) =>
            this.setState({ discussions: res, isLoading: false })
          );
        }
      );
    }
  };
  renderContentDDProject = () => {
    return (
      <div
        className="discussion__content_dd_project"
        onClick={(e) => e.stopPropagation()}
      >
        {this.state.projects.map((project) => {
          return (
            <p key={project.id} onClick={() => this.onSelectProject(project)}>
              {project.name}
            </p>
          );
        })}
      </div>
    );
  };

  onDeleteItem = (discussion) => {
    timeCloudAPI()
      .delete(`discussions/${discussion.id}`)
      .then((res) => {
        this.setState({
          discussions: this.state.discussions.filter(
            (ele) => ele.id !== discussion.id
          ),
        });
      });
  };

  renderFilter = () => {
    const { projectSelected } = this.state;
    return (
      <div
        className="discussion__filter"
        onClick={() => this.setState({ showDDProject: true })}
      >
        <div className="discussion__filter__project">
          <span>{projectSelected?.name}</span>
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
    const {
      discussionInput,
      discussions,
      isLoading,
      showInputDiscussion,
      projectSelected,
      isSavingDiscussion,
    } = this.state;
    return (
      <PageDesign title="Discussion" headerRight={this.renderFilter()}>
        <div className="discussion">
          {isLoading ? (
            <>
              <Skeleton countItem={5} direction="row" heightItem="4.3rem" />
              <Skeleton countItem={2} direction="row" heightItem="4.3rem" />
              <Skeleton countItem={4} direction="row" heightItem="4.3rem" />
              <Skeleton countItem={1} direction="row" heightItem="4.3rem" />
              <Skeleton countItem={2} direction="row" heightItem="4.3rem" />
            </>
          ) : (
            <div
              className="discussion__content"
              onScroll={this.onScrollContentHandler}
              ref={this.contentRef}
            >
              {discussions.length ? discussions.map((discussion) => {
                return (
                  <DiscussionItem
                    key={discussion.id}
                    user={this.props.user}
                    discussion={discussion}
                    onDeleteItem={() => this.onDeleteItem(discussion)}
                  />
                );
              }) : 
              <p>
                {" "}
                <PriorityHighIcon style={{ fontSize: "4rem", color: "red" }} />
                There is no any discussion. Click input button bellow to discuss...
              </p>
            }
            </div>
          )}

          {projectSelected?.id !== 0 && (
            <div
              className="discussion__footer"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`discussion__footer__input ${
                  showInputDiscussion ? "visible" : ""
                }`}
              >
                <Avatar
                  avatar={this.props.user?.avatar}
                  avatarSize="3.5rem"
                  cssImage={{ boxShadow: "2px 2px 1rem rgba(0, 0, 0, .6)" }}
                />
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                  <input
                    name="discussion"
                    value={discussionInput}
                    onChange={(e) => {
                      this.setState({ discussionInput: e.target.value });
                    }}
                    type="text"
                    placeholder="Write discussion..."
                    autoComplete="off"
                  />
                </form>
              </div>

              <button
                ref={this.buttonBottomRef}
                onClick={() => {
                  this.setState({
                    showInputDiscussion: !showInputDiscussion,
                  });
                }}
              >
                {isSavingDiscussion ? (
                  <Spinner />
                ) : showInputDiscussion ? (
                  <RemoveIcon />
                ) : (
                  <AddIcon />
                )}
              </button>
            </div>
          )}
        </div>
      </PageDesign>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Discussion);
