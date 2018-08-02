import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { getGroupById } from "../../actions/groupActions";

class Posts extends Component {
  componentDidMount() {
    console.log("Reloading form inside posts");
    this.props.getGroupById(this.props.innerGroup._id);
  }

  render() {
    const { loading } = this.props.post;
    const { posts } = this.props.innerGroup;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  innerGroup: state.group.group
});

export default connect(
  mapStateToProps,
  { getPosts, getGroupById }
)(Posts);
