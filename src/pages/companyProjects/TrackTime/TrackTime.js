import React from "react";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import {convertSecondToHour} from '../../../utils/Utils';

class TrackTime extends React.Component{

    
    state = {
        totalTime: 0,
    }

    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        timeCloudAPI().get(`projects/${this.props.projectId}/total-times`)
        .then(response =>  
                {
                    const {data} = response;
                    if(data) 
                        if(this._isMounted) this.setState({totalTime: convertSecondToHour(data)});
                }
            );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        return this.state.totalTime;
    }
}
export default TrackTime;
