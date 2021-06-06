import React, {Component} from 'react';
import './login.css';
import {connect} from 'react-redux';
import Navbar from '../nav.js';
import LoginNote from './loginNote';
import {Link} from 'react-router-dom';
import {
  emailChanged,
  passwordChanged,
  fullNameChanged,
  signup,
  login,
  formType
} from '../../../actions';

class Login extends Component {
  state = {
    toggleCreateOrLogin: false,
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.props.isAuthenticated && this.props.teacherType === true) {
      this.props.history.push (`/teacherDashboard`);
    } else if (this.props.isAuthenticated && this.props.teacherType === false) {
      this.props.history.push ('/studentDashboard');
    }
  }

  onEmailChange (event) {
    this.props.emailChanged (event.target.value);
  }

  onPasswordChange (event) {
    this.props.passwordChanged (event.target.value);
  }

  onFullNameChange (event) {
    this.props.fullNameChanged (event.target.value);
  }

  onTeacherButtonPress () {
    this.props.formType (true);
  }

  onLearnerButtonPress () {
    this.props.formType (false);
  }

  onSignup (event) {
    event.preventDefault ();
    let role = '';
    const {email, password, fullName, teacherType} = this.props;
    if (teacherType === true) {
      role = 'teacher';
    } else {
      role = 'student';
    }

    this.props.signup ({email, password, fullName, role});
  }

  onLogin (event) {
    event.preventDefault ();
    const {email, password} = this.props;
    this.props.login ({email, password});
  }

  toggleSubmitButton () {
    this.setState ({
      toggleCreateOrLogin: !this.state.toggleCreateOrLogin,
    });
  }

  renderSubmitButton () {
    if (this.state.toggleCreateOrLogin === false) {
      return (
        <input
          type="Submit"
          style={{backgroundColor: " #00C6C5"}}
          onClick={this.onSignup.bind (this)}
          className="loginbutton"
          value={this.props.loading?"loading...":"create account"}
        />
      );
    } else {
      return (
        <input
          type="Submit"
          style={{backgroundColor: " #00C6C5"}}
          onClick={this.onLogin.bind (this)}
          className="loginbutton"
          value={this.props.loading?"loading...":"login"}
        />
      );
    }
  }

  render () {
    const active = '#518005';

    return (
      <div className="container">
        <nav className="container top-nav mt-3 mb-3">
          <div>
            <h3 style={{color: '#00C6C5', fontWeight: 'bold'}}>Lern</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* <p style={{marginRight: 10, fontWeight: 600}}>Sign up</p>
          <p style={{fontWeight: 600}}>Log in</p> */}
          </div>
        </nav>

        <div className="shadow-card">

          <div className="right">
            <div className="rtop">
              <button
                style={{
                  backgroundColor: this.props.teacherType === false
                    ? "#00C6C5"
                    : '',
                  color: this.props.teacherType === false ? 'white' : '',
                }}
                onClick={this.onLearnerButtonPress.bind (this)}
                className="rnav"
              >
                Learner
              </button>
              <button
                style={{
                  backgroundColor: this.props.teacherType === true
                    ? "#00C6C5"
                    : '',
                  color: this.props.teacherType === true ? 'white' : '',
                }}
                onClick={this.onTeacherButtonPress.bind (this)}
                className="rnav"
              >
                Teacher
              </button>
            </div>

            <form>
              {this.props.message
                ? <div
                    style={{
                      width: 300,
                      textAlign: 'center',
                      color: this.props.message ===
                        'Account created successfully'
                        ? 'green'
                        : 'red',
                    }}
                    className="alert alert-success"
                    role="alert"
                  >
                    {' '}{this.props.message}{' '}
                  </div>
                : ''}
              <input
                onChange={this.onFullNameChange.bind (this)}
                type={
                  this.state.toggleCreateOrLogin === false ? 'text' : 'hidden'
                }
                className="input"
                value={this.props.fullName}
                placeholder="Fullname"
              />
              {' '}
              <br />
              {' '}
              <br />
              <input
                type="email"
                onChange={this.onEmailChange.bind (this)}
                className="input"
                value={this.props.email}
                placeholder="Email"
              />
              {' '}
              <br />
              {' '}
              <br />
              <input
                type="password"
                onChange={this.onPasswordChange.bind (this)}
                className="input"
                value={this.props.password}
                placeholder="Password"
              />
              <br /> <br />

              {this.renderSubmitButton ()}

            </form>
            <br />
            <h6
              onClick={this.toggleSubmitButton.bind (this)}
              style={{color: '#71B307', paddingLeft: 100, cursor: 'pointer'}}
            >
              {this.state.toggleCreateOrLogin === false
                ? 'login account'
                : 'create account'}
              {' '}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {
    email,
    password,
    fullName,
    role,
    message,
    isAuthenticated,
    teacherType,
    loading
  } = auth;
  console.log (teacherType);
  return {
    email,
    password,
    fullName,
    role,
    message,
    isAuthenticated,
    teacherType,
    loading
  };
};
export default connect (mapStateToProps, {
  emailChanged,
  passwordChanged,
  fullNameChanged,
  signup,
  login,
  formType
}) (Login);
