import React from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../../../redux/actions/index';


class ProjectDetailTask extends React.Component {

    componentDidMount = () => {
        const {match:{params}} = this.props;
        const id = params.id;
        this.props.fetchTasks(id);
    }


    render() {
        const {tasks} = this.props;
        return (
            <div>
                {tasks.map(task => <div>{task.name}</div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks.tasks
    }
}

export default connect(mapStateToProps, {fetchTasks})(ProjectDetailTask);