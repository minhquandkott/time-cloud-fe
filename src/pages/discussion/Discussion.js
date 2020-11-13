import React, { Component } from "react";
import Avatar from "../../components/avatar/Avatar";
import male from "../../assets/images/male.png";
import timeCloudAPI from "../../apis/timeCloudAPI";
import "./Discussion.css";
import PageDesign from "../../components/pageDesign/PageDesign";
import DiscussionItem from "./discussionItem/DiscussionItem";
import {v4} from 'uuid';

const data = ["Bug", "Feature", "Approve"];
class Discussion extends Component {
  state = {
    projects: [],
    projectIndex: -1,
    classify: "",
    discussionInput: "",
    discussions: [],
    status: true
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
  


  onChange = (e) => {
    const {projects, projectIndex} = this.state;
    console.log(projects, projectIndex);
      var target = e.target;
      var name = target.name;
      var value = target.value;
      var position = -1;
      projects.forEach((project, index) => {
        if(project.id == value) {
          position = index;
        }
      })
        timeCloudAPI().get(`projects/${projects[position].id}/discussions`)
        .then(res => {
          this.setState({
            [name]: value,
            discussions: res.data,
            projectIndex: position,
            status: true
          })
        })
  }

  onSubmit = (e) => {
    var {discussionInput, projectIndex, projects, discussions} = this.state;
    if(projectIndex === -1) {
      this.setState({status: false})
    }else if(e.key === "Enter" && discussionInput) {
      let data = {
        content: discussionInput,
        userId: localStorage.getItem("userId"),
        projectId: projects[projectIndex].id,
        type: ""
      }
      this.setState({
        discussionInput: "",
        status: true
      })
      timeCloudAPI().post('/discussions',data)
      .then(res => {
        this.setState({
          discussions: [...discussions, res.data]
        })
      })
    }
  }

  onDeleteItem = (discussion) => {
    if(window.confirm('Delete this discussion!!!')) {
      timeCloudAPI().delete(`discussions/${discussion.id}`)
      .then(res => {
        this.setState({
          discussions : this.state.discussions.filter(ele => ele.id !== discussion.id)
        })
      })
    }
    
  }

  
  headerRight = (projects) => {
    var {projectSelected, status, projectIndex} = this.state;
    return (
      <div className="discussion__filter">
        {
          !status 
            ? 
              <div className="discussion__filter__aler">
                Choose project
              </div> 
            : ""
        }
        <div className="header_right__select_box">
            <select
              name="projectSelected"
              style={{
                backgroundColor: projectIndex !== -1 ? projects[projectIndex]?.color : "#333F48",
                color: "white",
                border: !status ? "2px solid red" : ""
              }}
              onChange = {this.onChange}
            >
                <option
                  className="select-item"
                  hidden value="0"
                  
                >
                  Projects
                </option>
                {
                    projects.map((project, index) => {
                        return <option
                                    className= {project.name === projectSelected ? "" : "select-item"}
                                    key={v4()}
                                    style={{
                                        position: "absolute",
                                        backgroundColor: (projectSelected === project.id) ? project.color : "",
                                    }}
                                    value={project.id}
                                >
                                    {project.name}
                                </option>
                    })
                }
            </select>
        </div>
        <div className="header_right__select_box">
            <select
              onChange={(e) => {this.setState({classify: e.target.value})}}
              name="classify"
              //style={{backgroundColor: projectIndex !== -1 ? projects[projectIndex]?.color : "#333F48", color: "white"}}
            >
                <option
                  className="select-item"
                  hidden value="0"
                >
                  Classify
                </option>
                {
                    data.map((ele) => {
                        return <option
                                    //className= {project.name === projectSelected ? "" : "select-item"}
                                    key={v4()}
                                    style={{
                                        position: "absolute",
                                        //backgroundColor: (projectSelected === project.name) ? project.color : "",
                                    }}
                                    value={ele}
                                >
                                    {ele}
                                </option>
                    })
                }
            </select>
        </div>
      </div>
    );
  };

  render() {
    const { projects, classify, discussionInput, discussions } = this.state;
    return (
      <PageDesign title="Discussion" headerRight={this.headerRight(projects)}>
        <div className="discussion">
          <div className="discussion__content">
            {
              discussions?.map(discussion => {
                return <DiscussionItem
                          key={v4()}
                          discussion={discussion}
                          onDeleteItem={() =>this.onDeleteItem(discussion)}
                          onEditDiscussion={() => this.onEditDiscussion(discussion)}
                          
                        />
              })
            }
            <div ref={this.endRef}></div>
          </div>
          <div className="discussion__footer">
              <Avatar
                avatar={male}
                avatarSize="3.5rem"
                cssImage={{ boxShadow: "2px 2px 1rem rgba(0, 0, 0, .6)" }}
              />
              <input
                  
                  name="discussion"
                  value={discussionInput}
                  onChange={(e) => {this.setState({discussionInput: e.target.value})}}
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
