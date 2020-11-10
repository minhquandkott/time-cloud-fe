import React, {Component} from 'react';
import Interact from '../../components/interact/Interact';
import Content from './content/Content';
import './Discussion.css';

class Discussion extends Component {
    render() {
        return(
            <div className="discussion">
                <div className="discussion__item">
                    <Interact />
                    <Content />
                </div>
                
            </div>
        )
    }
}

export default Discussion;