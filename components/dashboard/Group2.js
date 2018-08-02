import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Group extends Component {
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
  deleteGroup: PropTypes.func
};

export default connect(
  null,
  {}
)(Group);
