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
        <h1>Welcome, {this.props.mainUser}!</h1>
        <img height="100px" src={profileUser.frontendPath} />
        <input placeholder="Search" onChange={this.handleSearch} />
        <div>
          {this.state.results.map(e => {
            return <div>{e.username}</div>;
          })}
        </div>
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
