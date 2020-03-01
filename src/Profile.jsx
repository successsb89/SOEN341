import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }
  handleSearch = event => {
    const query = event.target.value;
    const results = this.props.user.filter(item => {
      return item.username.includes(query);
    });
    console.log(results);
    this.setState({ results: results });
  };
  render() {
    const profileUser = this.props.user.find(
      e => e.username === this.props.mainUser
    );

    return (
      <div>
        <input placeholder="Search" onChange={this.handleSearch} />
        <div>
          {this.state.results.map(e => {
            return <div>{e.username}</div>;
          })}
        </div>
        <h1 className="test">
          <img height="100px" src={profileUser.frontendPath} />
          Welcome, {this.props.mainUser}!
        </h1>
        {/* <img height="100px" src={profileUser.frontendPath} /> */}
        <div className="push-profile-btns">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn">Following</button>
          <Link to="/upload">
            <button className="profile-btn">Add Picture</button>
          </Link>
        </div>
        {this.props.post
          .filter(e => e.username === this.props.mainUser)
          .map(e => {
            return (
              <div className="picsadded">
                <img height="50%" width="50%" src={e.frontendPath} />
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
