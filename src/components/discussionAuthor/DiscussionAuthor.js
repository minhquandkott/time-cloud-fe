import React, {Component} from 'react';
import Avatar from '../avatar/Avatar';
import './DiscussionAuthor.css';
class DiscussionAuthor extends Component {
    render() {
        const {user} = this.props;
        return (
            <Avatar
                avatar = {user.avatar}
                avatarSize="1.5rem"
                css={{alignItems: "center",
                    borderLeft: "1px solid rgb(203 202 204)",
                    margin: "0 0 0 1rem",
                    padding: "0px 1rem",
                }}
                cssImage={{marginRight: "0.5rem"}}
            >
                <p> {user.name} </p>
            </Avatar>
        )
    }
}

export default DiscussionAuthor;