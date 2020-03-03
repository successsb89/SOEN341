import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      file: "",
      previewImg: ""
    };
  }
  // communicate with mongoDB through handlesubmit component. using by formdata, can connect to the server 'multer'
  // change happens when form 'onsubmit' is clickeed.
  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("img", this.state.file);
    let response = await fetch("/signup", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("signup failed");
    } else {
      alert("success");
      this.props.dispatch({ type: "signup-success" });
    }
    console.log(body);
  };
  handleUsername = event => {
    let user = event.target.value;
    this.setState({ username: user });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleClick = () => {
    this.props.dispatch({ type: "signup-success" });
  };
  // this is eventhadler. it brings the info from constructor. showing only one picture from file array = .files[0]
  // receive an URL of the file which will be uploaded. then pass this file to render component of the div of input file to show the file.
  fileChangeHandler = event => {
    this.setState({
      file: event.target.files[0],
      previewImg: URL.createObjectURL(event.target.files[0])
    });
  };
  /*piture on the profile page - input type file
  lmg pag for showing the pre-picture
  */
  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <h1></h1>
          <h1>Vibez</h1>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="txtb"
              onChange={this.handleUsername}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="txtb"
              onChange={this.handlePassword}
            />
          </div>

          <div>
            <input type="file" onChange={this.fileChangeHandler}></input>
            <img height="100px" src={this.state.previewImg} />
          </div>
          <div>
            <input
              type="submit"
              value="Create Account"
              className="signup-btn"
            />
          </div>
          <button className="vibe-btn" onClick={this.handleClick}>
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

let Signup = connect()(UnconnectedSignup);
export default Signup;
