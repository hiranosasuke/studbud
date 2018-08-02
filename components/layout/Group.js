import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Group extends Component {
  render() {
    const groupItem = this.props.groups.map(gr => (
      <div key={gr._id} className="col-md-4">
        <div className="card card-landing mt-4">
          <div className="card-header bg-dark">
            {gr.name}{" "}
            <Link to={`/group/${gr._id}`} className="btn btn-light float-right">
              View
            </Link>
          </div>
          <div className="card-body card-lg">
            <h5 className="card-title text-dark">{gr.location}</h5>
            <hr />
            <p className="card-text text-dark">{gr.description}</p>
          </div>
        </div>
      </div>
    ));
    return <div className="col-md-12 row"> {groupItem} </div>;
  }
}

export default connect(null)(Group);
