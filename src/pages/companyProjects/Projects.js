import "./Projects.css";
import React from "react";
import Table from "../../components/table/Table";
import Point from "../../components/point/Point";
import history from "../../history";
import TrackTime from "./TrackTime/TrackTime";
import UserColumn from "./ProjectUser/UserColumn";
import PageDesign from "../../components/pageDesign/PageDesign";
import ActionColumn from "./actionColumn/ActionColumn";
import timeCloudAPI from "../../apis/timeCloudAPI";
import Axios from "axios";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      projects: [],
    };
    this.cancelSource = Axios.CancelToken.source();
    this.cssHeader = {
      textAlign: "left",
    };
    this.columns = {
      project: {
        key: "project",
        label: "project",
        width: "20%",
        cssHeader: this.cssHeader,
        cssData: {
          textTransform: "capitalize",
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => (
          <Point
            color={project.color}
            pointSize="15"
            title={project.name}
            key={project.id}
          />
        ),
      },
      client: {
        key: "client",
        label: "client",
        width: "20%",
        cssHeader: this.cssHeader,
        cssData: {
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => project.clientName,
      },
      tracktime: {
        key: "tracktime",
        label: "Tracked Time (h)",
        width: "20%",
        cssHeader: this.cssHeader,
        cssData: {
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => <TrackTime projectId={project.id} />,
      },
      members: {
        key: "members",
        label: "Members",
        width: "30%",
        cssHeader: this.cssHeader,
        cssData: {
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => <UserColumn project={project} />,
      },
      actions: {
        key: "actions",
        label: "actions",
        width: "10%",
        cssHeader: this.cssHeader,
        cssData: {
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => {
          return (
            <ActionColumn
              project={project}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
            />
          );
        },
      },
    };
  }

  fetchAllProject = async () => {
    const res = await timeCloudAPI().get("projects");
    const res1 = await Promise.allSettled(
      res.data.map((project) =>
        timeCloudAPI().get(`projects/${project.id}/available`)
      )
    );
    console.log(res1);
    const temp = res.data.map((project, index) => {
      const available =
        res1[index].status === "fulfilled" ? res1[index].value.data : false;
      return { ...project, available };
    });
    this.setState({ projects: temp });
  };

  componentDidMount = () => {
    this.fetchAllProject();
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onCreateProject = () => {
    history.push("/create_project");
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure ?")) {
      this.props.deleteProjects(id);
    }
  };

  onEdit = (project) => {
    history.push({
      pathname: `/edit_project/${project.id}`,
    });
  };

  onSortProjects = (projects) => {
    return projects.sort((first, second) => {
      if (first.available > second.available) return -1;
      else if (first.available < second.available) return 1;
      else return 0;
    });
  };

  cssCondition(project) {
    if (!project.available) {
      return { backgroundColor: "#ece7e7" };
    }
  }

  render() {
    var { txtSearch, projects } = this.state;
    projects = this.onSortProjects(projects);
    if (txtSearch) {
      projects = projects.filter((project) => {
        return project.name.toLowerCase().indexOf(txtSearch) !== -1;
      });
    }
    return (
      <PageDesign title="Projects">
        <div className="projects__content">
          <div className="projects__search">
            <input
              type="text"
              name="txtSearch"
              onChange={this.onChange}
              placeholder="Searching your project"
              className="page_design__animate__left"
            ></input>
          </div>
          <button
            className="projects__bt page_design__animate__right"
            onClick={this.onCreateProject}
          >
            Create new project
          </button>
        </div>
        <Table
          columns={this.columns}
          cssCondition={this.cssCondition}
          data={this.state.projects}
          skeletonLoading={projects.length ? false : true}
          onClickHandler={(element) =>
            history.push({
              pathname: `/projects/${element.id}`,
            })
          }
        />
      </PageDesign>
    );
  }
}

export default Projects;
