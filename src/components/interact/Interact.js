import React, {Component} from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './Interact.css';

class Interact extends Component {

    state = {
        interactStatus: false,
    }

    onInteract = () => {
        this.setState({
            interactStatus: !this.state.interactStatus
        })
    }

    render() {
        const {interactStatus} = this.state;
        return (
            <div className="interact">
                <button onClick={this.onInteract}> <ThumbUpAltIcon style= {{color: interactStatus ? "4080FF" : "darkgray", backgroundColor:"white"}}  /> </button>
                <p> 11 </p>
            </div>
        )
    }
}

export default Interact;