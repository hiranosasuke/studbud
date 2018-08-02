import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getGroups,
  setGroupLoading,
  searchGroups
} from "../../actions/groupActions";
import Group from "./Group";
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroup";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.setGroupLoading();
    this.props.getGroups();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.errors.err = null;
    this.props.searchGroups(this.state.search);
  }

  render() {
    const { groups, loadingGroup } = this.props.group;
    const { err } = this.props.errors;
    let layout;

    if (err) {
      layout = (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Stud Bud</h1>
                  <p className="lead"> Find and join study groups near you!</p>
                  <hr />
                </div>

                <form onSubmit={this.onSubmit} className="m-auto col-md-12">
                  <div className="col-md-4 m-auto">
                    <TextFieldGroup
                      placeholder="Search"
                      name="search"
                      value={this.state.search}
                      onChange={this.onChange}
                    />
                    <input
                      type="submit"
                      value="Search for Study Group"
                      className="btn btn-info btn-block mt-4"
                    />
                  </div>
                </form>
                <div className="text-center">
                  <h3 className="display-2"> {err}</h3>
                </div>
                <div className="my-5" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (groups === null || loadingGroup) {
      layout = <Spinner />;
    } else {
      layout = (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Stud Bud</h1>
                  <p className="lead"> Find and join study groups near you!</p>
                  <hr />
                </div>

                <form onSubmit={this.onSubmit} className="m-auto">
                  <TextFieldGroup
                    placeholder="Search"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Search for Study Group"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>

                <Group groups={groups} />
                <div className="my-5" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{layout}</div>;
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  getGroups: PropTypes.func.isRequired,
  setGroupLoading: PropTypes.func.isRequired,
  searchGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getGroups, setGroupLoading, searchGroups }
)(Landing);
