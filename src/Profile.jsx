import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedProfile extends Component {
  render() {
    const profileUser = this.props.user.find(
      e => e.username === this.props.mainUser
    );

    return (
      <div>
        <h1>Welcome, {this.props.mainUser}!</h1>
        <img height="100px" src={profileUser.frontendPath} />
        Profile page
        <Link to="/upload">
          <button>+</button>
        </Link>
        {this.props.post
          .filter(e => e.username === this.props.mainUser)
          .map(e => {
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
let mapStateToProps = state => {
  return { post: state.posts, user: state.users };
};
let Profile = connect(mapStateToProps)(UnconnectedProfile);
export default Profile;
