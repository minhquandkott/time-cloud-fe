import "./Projects.css";
import React from "react";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "../../components/table/Table";
import { fetchProjects, deleteProjects, fetchTasks } from "../../redux/actions";
import Point from "../../components/point/Point";
import history from "../../history";
import TrackTime from "./TrackTime/TrackTime";
import UserColumn from "./ProjectUser/UserColumn";
import PageDesign from "../../components/pageDesign/PageDesign";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
    };
  }

  componentDidMount = () => {
    this.props.fetchProjects(localStorage.getItem("userId"));
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
    console.log(project);
    history.push({
      pathname: "/create_project",
      state: project
    })
  }

  render() {
    const cssHeader = {
      textAlign: "left",
    };
    const columns = {
      project: {
        key: "project",
        label: "project",
        width: "20%",
        cssHeader,
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
        cssHeader,
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
        cssHeader,
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
        cssHeader,
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
        cssHeader,
        cssData: {
          verticalAlign: "middle",
          cursor: "pointer",
        },
        convertData: (project) => {
          const styleCom = {
            fontSize: "3rem",
          };
          return (
            <React.Fragment>
              <EditIcon
                style={{ ...styleCom, marginRight: "5px" }}
                className="projects__icon projects__icon__edit"
                onClick={(e) => {
                  e.stopPropagation();
                  this.onEdit(project);
                }}
              />
              <DeleteIcon
                style={{ ...styleCom }}
                className=" projects__icon projects__icon__delete"
                onClick={(e) => {
                  e.stopPropagation();
                  this.onDelete(project.id);
                }}
              />
            </React.Fragment>
          );
        },
      },
    };

    var { projects } = this.props;
    var { txtSearch } = this.state;
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
          columns={columns}
          data={projects}
          skeletonLoading={projects.length ? false : true}
          onClickHandler={(element) =>
            history.push({
              pathname: `/projects/${element.id}`,
              state: element,
            })
          }
        />
      </PageDesign>
    );
  }
}

const mapStateToProp = (state) => {
  const { projects } = state.projects;
  return {
    projects: projects.map((project) => {
      return { ...project, id: project.id };
    }),
  };
};
export default connect(mapStateToProp, {
  fetchProjects,
  fetchTasks,
  deleteProjects,
})(Projects);
