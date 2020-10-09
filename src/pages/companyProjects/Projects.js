import "./Projects.css";
import React from "react";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "../../components/table/Table";
import { fetchProjects, deleteProjects, fetchTasks } from "../../redux/actions";
import Point from "../../components/point/Point";
import history from '../../history';
import TrackTime from './TrackTime/TrackTime';
import ProjectUser from './ProjectUser/ProjectUser';
import UserColumn from './ProjectUser/UserColumn';
import timeCloudAPI from "../../apis/timeCloudAPI";

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            txtSearch : ""
        }
    }

    componentDidMount = () => {
        this.props.fetchProjects(77);
        
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    onDelete = (id) => {
        if(window.confirm("Are you sure ?")) {
            this.props.deleteProjects(id);
        }
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
            cursor: "pointer"
            },
            convertData: (project) => <Point
                                            color="E74C3C"
                                            pointSize="15"
                                            title={project.name}
                                            key={project.id}
                                        />
        },
        client: {
            key: "client",
            label: "client",
            width: "20%",
            cssHeader,
            cssData: {
                verticalAlign: "middle",
                cursor: "pointer"
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
                cursor: "pointer"
            },
            convertData:(project) => <TrackTime projectId = {project.id} />,
        },
        members: {
            key: "members",
            label: "Members",
            width: "30%",
            cssHeader,
            cssData: {
                verticalAlign: "middle",
                cursor: "pointer"
            },
            convertData: (project) => <UserColumn project = {project}/>,
        },
        actions: {
            key: "actions",
            label: "actions",
            width: "10%",
            cssHeader,
            cssData: {
                verticalAlign: "middle",
                cursor: "pointer"
            },
            convertData: (project) => {
                const styleCom = {
                    fontSize: "3rem",
                }
                return (
                    <React.Fragment>
                        <EditIcon style={{...styleCom, marginRight: "5px"}} className="projects__icon projects__icon__edit"/>
                        <DeleteIcon style={{...styleCom}} className=" projects__icon projects__icon__delete" onClick = {() => this.onDelete(project.id)}/>
                    </React.Fragment>
                )    
            },
        },
    };
    
   
    var {projects} = this.props;
    var {txtSearch} = this.state;
    if(txtSearch) {    
        projects = projects.filter((project) => {
            return project.name.toLowerCase().indexOf(txtSearch) !== -1;
        });
    }
    return (
        <div className="projects">
            <div className = "projects__title">
                <h1>Projects</h1>
            </div>
            <div className = "projects__content">
                <div className = "projects__search" >
                    <input
                        type="text"
                        name= "txtSearch"
                        onChange = {this.onChange}
                        placeholder="Searching your project"
                    ></input>
                    <SearchIcon onClick = {this.onSearch}/>
                </div>
                <button className = "projects__bt">
                    Create new project
                </button>
            </div>
            <Table
                columns={columns}
                data = {projects}
                onClickHandler={(element) => 
                    history.push({
                        pathname: `/projects/${element.id}`,
                        state: {project: {element}}
                    })
                }
            />
        </div>
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