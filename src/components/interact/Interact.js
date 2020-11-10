import React, {Component} from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './Interact.css';

class Interact extends Component {
    render() {
        return (
            <div className="interact">
                <button> <ExpandLessIcon style= {{color: "red", backgroundColor:"white"}}  /> </button>
                <p> 11 </p>
            </div>
        )
    }
}

export default Interact;