import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { getGroupById } from "../../actions/groupActions";
import { deletePost } from "../../actions/postActions";

class PostFeed extends Component {
  componentDidMount() {
    this.props.getGroupById(this.props.group.group._id);
  }

  onDeleteClick(id) {
    const info = {
      _id: id,
      group_id: this.props.group.group._id
    };

    this.props.deletePost(info);
    this.refresh();
  }
  refresh() {
    this.props.getGroupById(this.props.group.group._id);
  }
  render() {
    const statePosts = this.props.group.group.posts;

    if (!isEmpty(statePosts)) {
      return statePosts.map(up => (
        <div key={up._id} className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2 text-center">
              <p className="text-center">{up.name}</p>
              <img
                className="rounded-circle d-none d-md-block m-auto"
                src={up.avatar}
                alt=""
                style={{ width: "50px", marginTop: "5px" }}
              />
            </div>
            <div className="col-md-9">
              <p className="lead">{up.text}</p>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-danger ml-auto"
                onClick={this.onDeleteClick.bind(this, up._id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return <h3> No Posts</h3>;
    }
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array,
  getGroupById: PropTypes.func,
  deletePost: PropTypes.func
};

const mapStateToProps = state => ({
  post: state.post,
  group: state.group
});

export default connect(
  mapStateToProps,
  { getGroupById, deletePost }
)(PostFeed);
