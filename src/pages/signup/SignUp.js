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
  state = {
    isShowError: false,
  };
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
  componentDidUpdate(preProps) {
    if (preProps.authError !== this.props.authError && this.props.authError) {
      this.setState({ isShowError: true });
      setTimeout(() => {
        this.setState({ isShowError: false });
      }, 4000);
    }
  }

  onFormSubmit = ({ username, email, password }) => {
    this.props.signUp(
      username,
      email.toLocaleLowerCase(),
      password.toLocaleLowerCase()
    );
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
    const spanError =
      this.state.isShowError && this.props.authError ? (
        <span style={{ animation: "fade 4s forwards" }}>
          {this.props.authError?.error}
        </span>
      ) : null;

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
              <p className="sign_up__error">{spanError}</p>
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
  const { loading, error } = state.auth;
  return {
    isLoading: loading,
    authError: error,
  };
};

export default connect(mapStateToProps, {
  authentication,
  signUp,
})(signUpForm);
