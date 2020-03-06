import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import { Spinner } from "../../common";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log(profile);

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has proofile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="profile">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-6">
                      <a
                        href="profiles.html"
                        className="btn btn-light mb-3 float-left"
                      >
                        Back To Profiles
                      </a>
                    </div>
                    <div className="col-6"></div>
                  </div>
                  {/* profile header */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                          <div className="col-4 col-md-3 m-auto">
                            <img
                              className="rounded-circle"
                              src={profile.user.avatar}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <h1 className="display-4 text-center">
                            {profile.user.name}
                          </h1>
                          <p className="lead text-center">
                            {profile.status} at {profile.company}
                          </p>
                          <p>{profile.location}</p>
                          <p>
                            <a className="text-white p-2" href="#">
                              <i className="fas fa-globe fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-twitter fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-facebook fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-instagram fa-2x"></i>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Profile About */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">
                          {profile.user.name}'s Bio
                        </h3>
                        <p className="lead">{profile.bio}</p>
                        <hr />
                        <h3 className="text-center text-info">Best Skill</h3>
                        <div className="row">
                          <div className="d-flex flex-wrap justify-content-center align-items-center">
                            <div className="p-3">
                              <i className="fa fa-check"></i>{" "}
                              {profile.skill.skill_name}
                            </div>
                            {/* <div className="p-3">
                              <i className="fa fa-check"></i> CSS
                            </div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> JavaScript
                            </div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> Python
                            </div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> C#
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Profile Creds */}
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Experience</h3>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h4>Microsoft</h4>
                          <p>Oct 2011 - Current</p>
                          <p>
                            <strong>Position:</strong> Senior Developer
                          </p>
                          <p>
                            <strong>Description:</strong> {profile.experience}{" "}
                            years
                          </p>
                        </li>
                        <li className="list-group-item">
                          <h4>Sun Microsystems</h4>
                          <p>Oct 2004 - Nov 2011</p>
                          <p>
                            <strong>Position: </strong> Systems Admin
                          </p>
                          <p>
                            <strong>Description: </strong> Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Unde doloribus
                            dicta enim excepturi laborum voluptatem nam
                            provident quisquam facere. Quae?
                          </p>
                          <p>
                            <strong>Location: </strong> Miami, FL
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Education</h3>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h4>Univeresity Of Washington</h4>
                          <p>Sep 1993 - June 1999</p>
                          <p>
                            <strong>Degree: </strong>Masters
                          </p>
                          <p>
                            <strong>Field Of Study: </strong>Computer Science
                          </p>

                          <p>
                            <strong>Description:</strong> Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Unde doloribus
                            dicta enim excepturi laborum voluptatem nam
                            provident quisquam facere. Quae?
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Github profile */}
                  <div ref="myRef">
                    <hr />
                    <h3 className="mb-4">Latest Github Repos</h3>
                    {/* repo key={rep.id} */}
                    <div className="card card-body mb-2">
                      <div className="row">
                        <div className="col-md-6">
                          <h4>
                            <Link
                              // to={repo.html_url}
                              to=""
                              className="text-info"
                              target="_blank"
                            >
                              {" "}
                              Repository One
                            </Link>
                          </h4>
                          <p>{profile.githubusername}</p>
                        </div>
                        <div className="col-md-6">
                          <span className="badge badge-info mr-1">Stars: 44</span>
                          <span className="badge badge-secondary mr-1">
                            Watchers: 21
                          </span>
                          <span className="badge badge-success">Forks: 122</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet set up a profile please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
