import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import { addGroup } from "../../actions/groupActions";

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      tags: "",
      users: [],
      meetups: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newGroup = {
      name: this.state.name,
      owner: user.id,
      description: this.state.description,
      location: this.state.location,
      tags: this.state.tags
    };

    this.props.addGroup(newGroup);
    this.setState({ name: "", description: "", location: "", tags: "" });
    this.props.history.push("/dashboard");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="mb-3 bg-info">
        <div className="card card-dark">
          <div className="card-header bg-dark text-white">Add a Group!</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <InputGroup
                  name="name"
                  placeholder="Group Name"
                  value={this.state.name}
                  error={errors.name}
                  icon="fas fa-pencil-alt"
                  type="text"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <InputGroup
                  name="location"
                  placeholder="What city are you in?"
                  value={this.state.location}
                  error={errors.location}
                  icon="fas fa-globe"
                  type="text"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  placeholder="Describe your group..."
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  name="tags"
                  placeholder="Enter some tags so people can find your group"
                  value={this.state.tags}
                  error={errors.tags}
                  icon="fas fa-th"
                  info="Tags should be entered in comma seperated list. ie.) Biology,Cells,Freshman"
                  type="text"
                  onChange={this.onChange}
                />
              </div>
              <button className="btn btn-dark btn-block">Create Group</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

GroupForm.propTypes = {
  addGroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addGroup }
)(withRouter(GroupForm));
