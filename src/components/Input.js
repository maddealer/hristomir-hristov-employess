import React, { Component } from "react";
import Display from "./Display";
import "./Input.css";

class Input extends Component {
  state = {
    dattaArr: [],
    rez: "",
    file: "",
  };
  //Makes a sorted array of arrays from the .txt file
  handleFile = (e) => {
    const content = e.target.result;
    const arr = content.split("\n").map(function (el) {
      return el.split(/\s+/);
    });

    const sortedArr = arr.sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
    this.setState({ dattaArr: sortedArr });
  };
  //Read the content of the file from the file system
  handleChangeFile = async (e) => {
    await this.setState({ file: e.target.files[0], rez: e.target.value });
    const file = this.state.file;

    if (file !== undefined) {
      let fileData = new FileReader();
      fileData.onloadend = this.handleFile;
      fileData.readAsText(file);
    }
    this.setState({ rez: "", file: "" });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input
              type="file"
              accept=".txt"
              id="my-file"
              value={this.state.rez}
              onClick={() => this.setState({ dattaArr: [] })}
              onChange={(e) => {
                this.handleChangeFile(e);
              }}
              className="input-file"
            />
          </div>
        </div>
        {this.state.dattaArr.length > 0 ? (
          <Display data={this.state.dattaArr} />
        ) : null}
      </>
    );
  }
}

export default Input;
