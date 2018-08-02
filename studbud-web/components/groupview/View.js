import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {
  getGroupById,
  addUser,
  addMeetup,
  addMeetupID,
  removeUser,
  removeMeetup
} from "../../actions/groupActions";
import TextFieldGroup from "../common/TextFieldGroup";
import isEmpty from "../../validation/is-empty";
import PostForm from "../posts/PostForm";
import PostFeed from "../posts/PostFeed";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: "",
      title: "",
      description: "",
      location: "",
      eventDate: "",
      meetUpid: ""
    };

    this.onChange = this.onChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.addMeetup = this.addMeetup.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.setState({ handle: "" });

    this.props.getCurrentProfile();
    this.props.getGroupById(this.props.match.params.id);
  }

  addUser() {
    let user = {
      handle: this.state.handle,
      group_id: this.props.group.group._id
    };
    this.props.addUser(user);
  }

  removeUser(id) {
    let user = {
      userId: id,
      group_id: this.props.innerGroup._id
    };
    this.props.removeUser(user);
    this.props.getGroupById(this.props.match.params.id);
  }

  joinGroup() {
    let user = {
      handle: this.props.profile.profile.handle,
      group_id: this.props.group.group._id
    };
    this.props.addUser(user);
  }

  addMeetup() {
    let meetup = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      eventDate: this.state.eventDate,
      gr_id: this.props.group.group._id,
      _id: this.state.meetUpid
    };

    this.props.addMeetup(meetup);

    this.props.addMeetupID({ group_id: meetup.gr_id });
  }

  removeMeetup(id) {
    let user = {
      meetupId: id,
      group_id: this.props.innerGroup._id
    };
    this.props.removeMeetup(user);
    this.props.getGroupById(this.props.match.params.id);
  }

  render() {
    const { group } = this.props.group;
    const { users } = this.props.innerGroup;
    const { meetups } = this.props.innerGroup;
    const { isAuthenticated } = this.props.auth;
    //this.props.getGroupById(this.props.match.params.id);

    let postContent;
    if (
      isAuthenticated &&
      this.props.innerGroup.users &&
      (this.props.innerGroup.users.filter(usr => {
        return usr._id === this.props.auth.user.id;
      }).length > 0 ||
        this.props.auth.user.id === this.props.innerGroup.owner)
    ) {
      postContent = (
        <div>
          <PostForm />
          <PostFeed />
        </div>
      );
    } else {
      postContent = null;
    }

    let userContent;
    if (
      !isEmpty(users) &&
      this.props.auth.isAuthenticated &&
      this.props.auth.user.id === this.props.innerGroup.owner
    ) {
      userContent = users.map(usr => (
        <div key={usr._id} className="card-body">
          <img
            className="rounded-circle mr-auto"
            src={usr.avatar}
            alt={usr.name}
            style={{ width: "50px", marginTop: "5px" }}
          />
          <h3>{usr.name}</h3>
          <button
            onClick={this.removeUser.bind(this, usr._id)}
            className="btn btn-danger ml-auto btn-block"
          >
            Remove User
          </button>
          <hr />
        </div>
      ));
    } else if (!isEmpty(users)) {
      userContent = users.map(usr => (
        <div key={usr._id} className="card-body">
          <img
            className="rounded-circle mr-auto"
            src={usr.avatar}
            alt={usr.name}
            style={{ width: "50px", marginTop: "5px" }}
          />
          <h3>{usr.name}</h3>
          <hr />
        </div>
      ));
    } else {
      userContent = <h3> No Users </h3>;
    }

    let meetupContent;
    if (
      !isEmpty(meetups) &&
      this.props.auth.isAuthenticated &&
      this.props.auth.user.id === this.props.innerGroup.owner
    ) {
      meetupContent = meetups.map(meetup => (
        <div key={meetup._id} className="card text-center">
          <div className="card-header">{meetup.title}</div>
          <div className="card-body">
            <h5 className="card-title">{meetup.location}</h5>
            <p className="card-text">{meetup.description}</p>
            <button
              onClick={this.removeMeetup.bind(this, meetup._id)}
              className="btn btn-danger ml-auto btn-block"
            >
              Remove Meetup
            </button>
          </div>
          <div className="card-footer text-muted">
            <Moment format="YYYY/MM/DD">{meetup.eventDate}</Moment>
          </div>
        </div>
      ));
    } else if (!isEmpty(meetups)) {
      meetupContent = meetups.map(meetup => (
        <div key={meetup._id} className="card text-center">
          <div className="card-header">{meetup.title}</div>
          <div className="card-body">
            <h5 className="card-title">{meetup.location}</h5>
            <p className="card-text">{meetup.description}</p>
          </div>
          <div className="card-footer text-muted">
            <Moment format="YYYY/MM/DD">{meetup.eventDate}</Moment>
          </div>
        </div>
      ));
    } else {
      meetupContent = <h3> No Meetups </h3>;
    }

    let formContent;
    //If logged in and the owner
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.id === this.props.innerGroup.owner
    ) {
      formContent = (
        <div className="row mb-3">
          <button
            className="m-auto col-md-5 btn btn-info"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add-User
          </button>

          <button
            className="m-auto col-md-5 btn btn-info"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add-Meetup
          </button>

          <div className="collapse col-md-5 mx-auto my-3" id="collapseExample2">
            <form onSubmit={this.addUser}>
              <TextFieldGroup
                placeholder="Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
              />
              <input
                type="submit"
                value="Add User"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>

          <div
            className="collapse collapse col-md-5 mx-auto my-3"
            id="collapseExample"
          >
            <form onSubmit={this.addMeetup}>
              <TextFieldGroup
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
              />
              <TextFieldGroup
                placeholder="Meetup Date"
                name="eventDate"
                value={this.state.eventDate}
                onChange={this.onChange}
                type="date"
              />
              <input
                type="submit"
                value="Add Meetup"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      );
    } else if (
      this.props.innerGroup.users &&
      this.props.innerGroup.users.filter(usr => {
        return usr._id === this.props.auth.user.id;
      }).length === 0 &&
      this.props.auth.isAuthenticated
    ) {
      formContent = (
        <div className="row mb-3">
          {" "}
          <button
            onClick={this.joinGroup}
            className="btn btn-block btn-success m-auto"
          >
            Join!
          </button>{" "}
        </div>
      );
    } else if (!this.props.auth.isAuthenticated) {
      formContent = (
        <div className="row mb-3">
          <Link
            exact
            to="/register"
            className="btn btn-block btn-success m-auto"
          >
            Sign up to join!
          </Link>{" "}
        </div>
      );
    } else {
      formContent = null;
    }

    let content;
    if (!isEmpty(this.props.innerGroup)) {
      content = (
        <div className="card text-center">
          <div className="card-header">
            <h3 className="display-1">{group.name}</h3>
          </div>
          <div className="card-body">{formContent}</div>
          <div className="card-body">
            <div className="col-md-12 row">
              <div className="col-md-5 mx-auto">
                <div className="card text-center">
                  <div className="card-header">Users</div>
                  {userContent}
                </div>
              </div>
              <div className="col-md-5 mx-auto">{meetupContent}</div>
            </div>
          </div>
          <div className="card-footer text-muted">{postContent}</div>
        </div>
      );
    } else {
      content = <Spinner />;
    }

    return <div>{content}</div>;
  }
}

View.propTypes = {
  getGroupById: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  addMeetup: PropTypes.func.isRequired,
  addMeetupID: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  removeMeetup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  innerGroup: state.group.group,
  posts: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getGroupById,
    addUser,
    addMeetup,
    addMeetupID,
    getCurrentProfile,
    removeUser,
    removeMeetup
  }
)(View);
