import React, { Component } from "react";

export default class test extends Component {
  componentDidMount() {
    console.log(1);
  }
  componentDidUpdate() {
    console.log(2);
  }
  render() {
    return <div>a</div>;
  }
}
