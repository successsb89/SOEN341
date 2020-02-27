import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.user.username}!</h1>
        <img src={this.props.user.frontendPath} />
        Profile page
        <Link to="/upload">
          <button>+</button>
        </Link>
        {this.props.posts.map(e => {
          return (
            <div className="test">
              <img height="150px" width="200px" src={e.frontendPath} />
              <div>{e.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Profile;
