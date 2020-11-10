import React, {Component} from 'react';
import ProjectName from '../../../components/projectName/ProjectName';
import DiscussionAuthor from '../../../components/discussionAuthor/DiscussionAuthor';
import PublicIcon from '@material-ui/icons/Public';
import Actions from '../../../components/actions/Actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './Content.css';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <div className="content__text">
                    This is a discussion. I want to make it as long as posible. But it's still short. Now it's longer. Ok, that is enough.
                </div>
                <div className="content__attributes">
                    <ProjectName />
                    <DiscussionAuthor />
                    <p>43 minutes ago <PublicIcon style={{marginLeft:".3rem"}} /></p>
                    <FiberManualRecordIcon style={{fontSize:".5rem", margin: "0 1rem" }}/>
                    <Actions />
                </div>
            </div>
        )
    }
}

export default Content;