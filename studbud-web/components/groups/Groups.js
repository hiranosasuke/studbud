import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GroupForm from "./GroupForm";
import Spinner from "../common/Spinner";

class Groups extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <GroupForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Groups;
