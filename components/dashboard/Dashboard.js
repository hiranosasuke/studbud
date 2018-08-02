import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import {
  getGroupsByUser,
  similarityScore,
  getJoinedGroups,
  getFirstGroup
} from "../../actions/groupActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Group from "./Group";
import Group2 from "./Group2";
import Group3 from "./Group3";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.similarityScore();
    this.props.getGroupsByUser(this.props.user.id);
    this.props.getJoinedGroups({ id: this.props.user.id });
  }

  recomendGroup() {
    const { users, total } = this.props.group.data;
    const { id } = this.props.user;
    var simScore = {};
    var curr_user = users[this.props.user.id];
    var common = 0;

    for (var user in users) {
      if (user != this.props.user.id) {
        users[user].forEach(group => {
          if (curr_user.includes(group)) common = common + 1;
        });
        simScore[user] = common;
      }
    }

    var sortable = [];
    for (var user in simScore) {
      sortable.push([user, simScore[user]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });

    this.props.getFirstGroup({ id: sortable[0][0] });

    console.log(simScore);
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { groups, loadingGroup, data } = this.props.group;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let recomended;
    if (this.props.group.first == undefined) {
      recomended = (
        <div>
          <button
            className="btn btn-info"
            onClick={this.recomendGroup.bind(this)}
          >
            {" "}
            Recomended Groups{" "}
          </button>
        </div>
      );
    } else {
      recomended = (
        <div>
          <Group2 title="Recomended Groups" Group={this.props.group.first} />
        </div>
      );
    }
    let dashboardContent;
    if (
      profile === null ||
      loading ||
      loadingGroup ||
      this.props.group.joinedGroups == undefined
    ) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="">
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />

            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Group title="Owned Groups" Group={groups} />
            <Group3
              title="Joined Groups"
              Group={this.props.group.joinedGroups}
            />
            {recomended}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getGroupsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  similarityScore: PropTypes.func.isRequired,
  getJoinedGroups: PropTypes.func.isRequired,
  getFirstGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  user: state.auth.user,
  group: state.group
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    getGroupsByUser,
    deleteAccount,
    similarityScore,
    getJoinedGroups,
    getFirstGroup
  }
)(Dashboard);
