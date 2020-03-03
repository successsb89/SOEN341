import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux"; // connect to redux
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";

class UnconnectedHome extends Component {
  //redux between home and sotre for upload pictures.
  componentDidMount = async () => {
    // will call all info from mongoDB and put it in redux.
    let response = await fetch("/find-all");
    let body = await response.text();
    console.log("/find-all response", body);
    body = JSON.parse(body);
    //reference : store.js "SET_POST"
    //when redux info comes from store.js, all the saved info comes from body above.
    this.props.dispatch({ type: "SET_POST", posts: body });
  };

  renderUpload = () => {
    // adding new stuff
    return <Upload user={this.props.username} />;
  };
  renderProfile = () => {
    return (
      <Profile
        mainUser={this.props.username}
        // posts={this.state.posts.filter(e => e.username === this.props.username)}
      />
    );
  };
  render() {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={this.renderProfile} />
        <Route exact={true} path="/upload" render={this.renderUpload} />
      </BrowserRouter>
    );
  }
}
//since redux has been introduced, method connect has to be used.
//connect between home and store.js by connect method. function 'connet()'will automatically connect to store.js
let Home = connect()(UnconnectedHome);

export default Home;
