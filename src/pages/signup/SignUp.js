import "./SignUp.css";
import React from "react";
import LeftSign from "../../components/sign/leftSign/LeftSign";
import RightSign from "../../components/sign/rightSign/RightSign";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { authentication } from "../../redux/actions";
import Spinner from "../../components/loading/spinner/Spinner";
import { signUp } from "../../redux/actions";
import * as validation from "../../utils/validationUtils";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class SignUp extends React.Component {
  renderInput({ input, meta: { error, touched }, label, ...attributes }) {
    return (
      <div className="sign_up__field">
        <label htmlFor={label}>{label}</label>
        <input {...input} {...attributes} id={label} autoComplete="off" />
        {error && touched ? <ErrorIcon className="invalid" /> : null}
        {!error ? <CheckCircleIcon className="valid" /> : null}
        {error && touched ? <p>{error}</p> : <p></p>}
      </div>
    );
  }

  onFormSubmit = ({ username, email, password }) => {
    this.props.signUp(username, email, password);
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

    return (
      <div className="sign_up">
        <div className="sign_up__left">
          <LeftSign>
            <div className="sign_up__slide">
              <h2>Let's get to Work.</h2>
              <p>Spend less time tracking and more time doing.</p>
              <div className="login__spinner">
                {this.props.isLoading ? <Spinner /> : null}
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
                validate={[
                  validation.require,
                  validation.minLength6,
                  validation.maxLength15,
                ]}
              />
              <Field
                name="email"
                type="text"
                placeholder="juile@gmail.com"
                component={this.renderInput}
                label="email"
                validate={[validation.require, validation.email]}
              />
              <Field
                name="password"
                type="password"
                placeholder="6+ character"
                component={this.renderInput}
                label="password"
                validate={[
                  validation.require,
                  validation.minLength6,
                  validation.maxLength15,
                ]}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {
  authentication,
  signUp,
})(signUpForm);
