import "./SignUp.css";
import React from "react";
import LeftSign from "../sign/leftSign/LeftSign";
import RightSign from "../sign/rightSign/RightSign";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { authentication } from "../../redux/actions";
import timeCloudAPI from "../../apis/timeCloudAPI";
import Spinner from "../spinner/Spinner";

class SignUp extends React.Component {
  state = { isLoading: false };
  renderInput({ input, meta, label, ...attributes }) {
    return (
      <div className="sign_up__field">
        <label htmlFor={label}>{label}</label>
        <input {...input} {...attributes} id={label} />
      </div>
    );
  }

  onFormSubmit = ({ username, email, password }) => {
    this.setState({ isLoading: true });
    timeCloudAPI
      .post("users", {
        name: username,
        email: email,
        password: password,
      })
      .then((data) => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const header = {
      p: "Already have an account?",
      button: "Sign In",
      url: "/login",
    };
    const title = {
      h3: "Get Start absolutely free",
      p: "Free forever. No credit card needed.",
    };
    //console.log(this.props);

    return (
      <div className="sign_up">
        <div className="sign_up__left">
          <LeftSign>
            <div className="sign_up__slide">
              <h2>Let's get to Work.</h2>
              <p>Spend less time tracking and more time doing.</p>
              <div className="login__spinner">
                {this.state.isLoading ? <Spinner /> : null}
              </div>
            </div>
          </LeftSign>
        </div>
        <div className="sign_up__right">
          <RightSign header={header} title={title}>
            <form
              className="sign_up__form"
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
              <Field
                name="username"
                type="text"
                placeholder="Juile Morin"
                component={this.renderInput}
                label="username"
              />
              <Field
                name="email"
                type="text"
                placeholder="juile@gmail.com"
                component={this.renderInput}
                label="email"
              />
              <Field
                name="password"
                type="password"
                placeholder="6+ character"
                component={this.renderInput}
                label="password"
              />
              <button className="sign_up__submit">Sign Up</button>
            </form>
          </RightSign>
        </div>
      </div>
    );
  }
}
const signUpForm = reduxForm({
  form: "signUpForm",
})(SignUp);

export default connect(null, { authentication })(signUpForm);
