import React from "react";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import {convertSecondToHour} from '../../../utils/Utils';

class TrackTime extends React.Component{
    state = {
        totalTime: 0
    }
    componentDidMount(){
        timeCloudAPI().get(`projects/${this.props.projectId}/total-times`)
        .then(responce =>  
                {
                    if(responce.data) 
                        this.setState({totalTime: responce.data})
                }
            );
    }

    render(){
        return convertSecondToHour(this.state.totalTime);
    }
}
export default TrackTime;