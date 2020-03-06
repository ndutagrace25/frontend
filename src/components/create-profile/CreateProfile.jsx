import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  TextFieldGroup,
  TextAreaFieldGroup,
  SelectListGroup
} from "../../common";
import { createProfile, getAllSkills } from "../../actions/profileActions";

class CreateProfile extends Component {
  state = {
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skill_id: "",
    bio: "",
    experience: "",
    githubusername: "",
    errors: {},
    skills: []
  };

  componentDidMount() {
    this.props.getAllSkills();
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }
    if (props.skills !== state.skills) {
      return {
        skills: props.skills
      };
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      handle,
      company,
      website,
      location,
      status,
      skill_id,
      bio,
      experience,
      githubusername
    } = this.state;

    const profileDetails = {
      handle,
      company,
      website,
      location,
      status,
      skill_id,
      bio,
      experience,
      githubusername
    };

    this.props.createProfile(profileDetails, this.props.history);
  };

  render() {
    const {
      handle,
      company,
      website,
      location,
      status,
      skill_id,
      bio,
      experience,
      githubusername,
      errors,
      skills
    } = this.state;

    let options;
    const skillOptions =
      skills instanceof Array
        ? skills.map(skill => {
            options = { label: skill.skill_name, value: skill.id };
            return options;
          })
        : null;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                {/* HANDLE INPUT */}
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  onChange={this.onChange}
                  value={handle}
                  error={errors.handle}
                  info=" A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)"
                />
                {/* COMPANY */}
                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                {/* WEBSITE */}
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={website}
                  error={errors.website}
                  onChange={this.onChange}
                  info="Could be your own or a company website"
                />
                {/* LOCATION */}
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  error={errors.location}
                  onChange={this.onChange}
                  info="City & state suggested (eg. Boston, MA)"
                />
                {/* STATUS */}
                <TextFieldGroup
                  type="text"
                  placeholder="Status"
                  name="status"
                  value={status}
                  error={errors.status}
                  onChange={this.onChange}
                  info=" Your current status (eg. Junior Developer, Sinior Developer)"
                />
                {/* SELECT SKILLS */}
                <SelectListGroup
                  options={skillOptions}
                  initialOption="Select your best skill"
                  name="skill_id"
                  onChange={this.onChange}
                  value={skill_id}
                  info="Give us the skills you have"
                />
                {/* BIO */}
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  onChange={this.onChange}
                  value={bio}
                  name="bio"
                  error={errors.bio}
                  info=" Tell us a little about yourself"
                />

                {/* EXPERIENCE */}
                <TextFieldGroup
                  type="number"
                  placeholder="Years of Experience"
                  name="experience"
                  value={experience}
                  error={errors.experience}
                  onChange={this.onChange}
                  info="How many years of experience"
                />
                {/* GITHUB USERNAME */}
                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  error={errors.githubusername}
                  onChange={this.onChange}
                  info=" If you want your latest repos and a Github link, include
                  your username"
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object,
  getAllSkills: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  skills: state.profile.skills
});

export default connect(mapStateToProps, { createProfile, getAllSkills })(
  withRouter(CreateProfile)
);
