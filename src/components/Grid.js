import React, { Component } from "react";
import output from "../helpers/index";
import { DataGrid } from "@material-ui/data-grid";
import "./Grid.css";

class Grid extends Component {
  state = {
    masterArr: [],
    columns: [
      {
        field: "id1",
        headerName: "Employee ID #1",
        width: 140,
      },
      { field: "id2", headerName: " Employee ID #2", width: 140 },
      { field: "project", headerName: "Project ID", width: 140 },
      { field: "days", headerName: " Days worked", width: 140 },
    ],
    row: [],
    norow: "",
  };
  async componentDidMount() {
    await this.setState({ masterArr: this.props.data });
    this.findMostDays();
  }
  //Take the last element from output arr, and makes row object that will be displayed
  findMostDays = () => {
    let { masterArr } = this.state;
    let outputRes = output(masterArr);
    if (outputRes.output.length > 0) {
      let result = outputRes.output[outputRes.output.length - 1];
      let row = [
        {
          id: 0,
          id1: result.id1.substring(0, result.id1.length - 1),
          id2: result.id2.substring(0, result.id2.length - 1),
          project: result.project.substring(0, result.project.length - 1),
          days: result.diffDays,
        },
      ];
      //TABLE LOGING
      console.table(row);

      this.setState({ row: row });
    } else if (outputRes.mostDays === 0 && outputRes.error === false) {
      this.setState({ norow: "No days working together!" });
    } else {
      this.setState({
        norow: "Invalid date format! Check README.md to see correct formats.",
      });
    }
  };

  render() {
    const { row, norow, columns } = this.state;

    return (
      <div className="containerTable">
        {norow.length === 0 ? (
          <div className="inContainerTable">
            <DataGrid
              rows={row}
              columns={columns}
              disableColumnMenu
              autoPageSize
            />
          </div>
        ) : (
          <div className="inContainerTable">
            <h3>{norow}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default Grid;
