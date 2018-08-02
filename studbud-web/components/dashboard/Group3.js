import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { removeUser, getJoinedGroups } from "../../actions/groupActions";

class Group extends Component {
  onRemoveUser(id) {
    this.props.removeUser({ userId: this.props.auth.user.id, group_id: id });
    this.props.getJoinedGroups({ id: this.props.auth.user.id });
  }

  render() {
    const title = this.props.title;
    const groups = this.props.Group.map(gr => (
      <tr key={gr._id}>
        <td>{gr.name}</td>
        <td>{gr.location}</td>
        <td>
          <Link to={"/group/" + gr._id} className="btn btn-info">
            View
          </Link>
        </td>
        <td>
          <button
            onClick={this.onRemoveUser.bind(this, gr._id)}
            className="btn btn-warning"
          >
            Leave
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">{title}</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th />
              <th />
            </tr>
            {groups}
          </thead>
        </table>
      </div>
    );
  }
}

Group.propTypes = {
  removeUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    removeUser,
    getJoinedGroups
  }
)(Group);
