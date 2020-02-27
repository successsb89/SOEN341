import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Upload from "./Upload.jsx";
import Profile from "./Profile.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], users: [], username: this.props.username };
  }
  componentDidMount = async () => {
    let response = await fetch("/find-all");
    let body = await response.text();
    console.log("/find-all response", body);
    body = JSON.parse(body);
    let response2 = await fetch("/all-users");
    let body2 = await response2.text();
    console.log("/all-users", body2);
    body2 = JSON.parse(body2);
    this.setState({ users: body2 });
    this.setState({ posts: body });
  };

  renderUpload = () => {
    // adding new stuff
    return <Upload user={this.props.username} />;
  };
  renderProfile = () => {
    return (
      <Profile
        user={this.state.users.filter(e => e.username === this.state.username)}
        posts={this.state.posts.filter(e => e.username === this.props.username)}
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
export default Home;
