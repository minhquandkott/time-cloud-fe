import "./SignUp.css";
import React from "react";
import LeftSign from "../sign/leftSign/LeftSign";
import RightSign from "../sign/rightSign/RightSign";
import { Field, reduxForm } from "redux-form";

class SignUp extends React.Component {
  renderInput({ input, meta, label, ...attributes }) {
    return (
      <div className="sign_up__field">
        <label htmlFor={label}>{label}</label>
        <input {...input} {...attributes} id={label} />
      </div>
    );
  }

  render() {
    const header = { p: "Already have an account?", button: "Sign In" };
    const title = {
      h3: "Get Start absolutely free",
      p: "Free forever. No credit card needed.",
    };
    return (
      <div className="sign_up">
        <div class="sign_up__left">
          <LeftSign>
            <div className="sign_up__slide">
              <h2>Let's get to Work.</h2>
              <p>Spend less time tracking and more time doing.</p>
            </div>
          </LeftSign>
        </div>
        <div className="sign_up__right">
          <RightSign header={header} title={title}>
            <form className="sign_up__form">
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

export default reduxForm({
  form: "signUpForm",
})(SignUp);
