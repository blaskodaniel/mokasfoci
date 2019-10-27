import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import * as AuthActions from "../../store/actions/authentication";
import { Button, Form, FormGroup, Label, Input,FormFeedback } from "reactstrap";
import { LoginState } from "../../context/AuthenticationContext";
import NotificationAlert from 'react-notification-alert';
import "./Registration.css";

var options = {};
options = {
    place: 'tc',
    message: (
        <div>
            <div>
                <h3>Sikeres regisztráció!</h3><p>Most már bejelentkezhetsz.</p>
            </div>
        </div>
    ),
    type: "success",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 5
}

// Amit beküldünk a store-ba
const mapDispatchToProps = dispatch => {
  return {
    registration: (email, password, name) =>
      dispatch(AuthActions.Registration(email, password, name))
  };
};

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      submitted: false
    };
  }

  notiFY(){
    this.refs.notify.notificationAlert(options);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    if(this.state.email && this.state.password && this.state.name){
        this.props.setlogin(LoginState.Pending);
        this.props.onRegister(
          AuthActions.Registration(this.state.email, this.state.password, this.state.name)
        );
    }
  };

  render() {
    const { regstate, setregstate, msg } = this.props;
    if (regstate === 1) {
      this.notiFY()
      setregstate(0);
    }
    if (msg.msg !== 0 && msg.msg !== null && regstate === 2) {
      alert(msg.msg);
      setregstate(0);
    }
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <NotificationAlert ref="notify" />
        <div className="registrationcontainer fadeIn animated">
          <div className="logo mb-3">
            <div className="col-md-12 text-center text-white">
              <h4 style={{color: "rgba(255, 255, 255, 0.8)"}}>Regisztráció</h4>
            </div>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name" hidden>
                Name
              </Label>
              <Input
                type="text"
                name="name"
                autoComplete="off"
                id="name"
                placeholder="Név"
                onChange={this.handleChange}
                invalid={this.state.submitted && !this.state.name}
              />
              <FormFeedback>Név kötelező</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password" hidden>
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Jelszó"
                onChange={this.handleChange}
                invalid={this.state.submitted && !this.state.password}
              />
              <FormFeedback>Jelszó kötelező</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email" hidden>
                Email
              </Label>
              <Input
                type="email"
                name="email"
                autoComplete="off"
                id="email"
                placeholder="Email cím"
                onChange={this.handleChange}
                invalid={this.state.submitted && !this.state.email}
              />
              <FormFeedback>Email cím kötelező</FormFeedback>
            </FormGroup>
            <Button className="w-100" color="success">
              Regisztrálok
            </Button>
            <div className="mt-3 d-flex flex-column justify-content-end align-items-end">
              <Link to="/login" className="text-white no-link">
                Bejelentkezés >>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Registration));
