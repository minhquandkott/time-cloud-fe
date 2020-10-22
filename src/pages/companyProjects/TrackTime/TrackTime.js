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

// import React from "react";
// import timeCloudAPI from "../../../apis/timeCloudAPI";
// import {convertSecondToHour} from '../../../utils/Utils';

// class TrackTime extends React.Component{

    
//     state = {
//         totalTime: 0,
//         increaseStep : 0,
//         currentTime : 0,     
//         intervalId: null
//     }

//     increaseTime = ()=> {
//         const sum = parseFloat((this.state.increaseStep + this.state.currentTime).toFixed(3));
//         this.setState({currentTime : sum})    
//     }
//     componentDidMount(){
//         timeCloudAPI().get(`projects/${this.props.projectId}/total-times`)
//         .then(responce =>  
//                 {
//                     const {data} = responce
//                     if(responce.data) 
//                         this.setState({totalTime: convertSecondToHour(data), increaseStep: convertSecondToHour(data)/200 })
//                         const id = setInterval(this.increaseTime, 1 );
//                         this.setState({intervalId:id});
//                 }
//             );
//     }

//     componentDidUpdate(){    
//         if(this.state.totalTime  <= this.state.currentTime ){
//             clearInterval(this.state.intervalId)
//         }
//     }
//     componentWillUnmount() {
//         if(this.state.intervalId){
//             clearInterval(this.state.intervalId)
//         }
//     }

//     render(){
//         return this.state.currentTime;
//     }
// }
// export default TrackTime;
