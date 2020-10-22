import React from "react";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../utils/Utils";

class TrackTime extends React.Component {
  state = {
    totalTime: 0,
  };

  componentDidMount() {
    timeCloudAPI()
      .get(`projects/${this.props.projectId}/total-times`)
      .then((response) => {
        const { data } = response;
        if (data) this.setState({ totalTime: convertSecondToHour(data) });
      });
  }

  render() {
    return this.state.totalTime;
  }
}
export default TrackTime;
