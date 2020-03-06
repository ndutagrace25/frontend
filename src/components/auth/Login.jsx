import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import { TextFieldGroup } from "../../common";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    const loginDetails = { email, password };
    this.props.loginUser(loginDetails);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
