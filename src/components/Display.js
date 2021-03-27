import React, { Component } from "react";
import Grid from "./Grid";

class Display extends Component {
  state = {
    data: [],
    arrsOfProjects: [],
  };

  async componentDidMount() {
    await this.setState({ data: this.props.data });
    this.arraysOfProjects();
  }
  //Makes new array of arrays splited by projects
  arraysOfProjects = () => {
    const { data } = this.state;
    let arrsOfProjects = [];
    let singleProjectArr = [];

    for (let i = 0; i < data.length; i++) {
      singleProjectArr.push(data[i]);
      if (data[i + 1] !== undefined && data[i][1] !== data[i + 1][1]) {
        arrsOfProjects.push(singleProjectArr);
        singleProjectArr = [];
      } else if (data[i + 1] === undefined) {
        arrsOfProjects.push(singleProjectArr);
      }
    }
    this.setState({ arrsOfProjects: arrsOfProjects });
  };

  render() {
    return (
      <>
        {this.state.arrsOfProjects.length > 0 ? (
          <Grid data={this.state.arrsOfProjects} />
        ) : null}
      </>
    );
  }
}

export default Display;
