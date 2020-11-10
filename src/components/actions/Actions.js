import React, {Component} from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './Actions.css';

class Actions extends Component {
    render() {
        return (
            <div className="actions">
                <div className="actions__message">
                    <ChatBubbleOutlineIcon style={{color: "red"}} />
                    <p> 4 comments </p>
                </div>
                <p> Edit </p>
            </div>
        )
    }
}

export default Actions;