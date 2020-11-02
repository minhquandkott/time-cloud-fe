import "./Login.css";
import React from "react";
import { Field, reduxForm } from "redux-form";
import LeftSign from "../../components/sign/leftSign/LeftSign";
import RightSign from "../../components/sign/rightSign/RightSign";
import { connect } from "react-redux";
import { authentication } from "../../redux/actions";
import * as validation from "../../utils/validationUtils";
import ErrorIcon from "@material-ui/icons/Error";
import Spinner from "../../components/loading/spinner/Spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class Login extends React.Component {
  state = {
    isShowError: false,
  };
  renderInput({ input, meta: { error, touched }, label, ...attributes }) {
    return (
      <div className="login__field">
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

  onFormSubmit = ({ email, password }) => {
    this.props.authentication(
      email.toLocaleLowerCase(),
      password.toLocaleLowerCase()
    );
  };

  onHeaderButtonHandler = () => {};

  render() {
    const spanError =
      this.state.isShowError && this.props.authError ? (
        <span style={{ animation: "fade 4s forwards" }}>
          {this.props.authError?.error}
        </span>
      ) : null;
    const header = {
      p: "Don't have account?",
      button: "Get Started",
      url: "/signup",
    };
    const title = { h3: "Sign in to TimeCloud", p: "Enter your detail below" };
    return (
      <div className="login">
        <div className="login__left">
          <LeftSign>
            <div className="login__spinner">
              {this.props.loading ? <Spinner /> : null}
            </div>
          </LeftSign>
        </div>
        <div className="login__right">
          <RightSign header={header} title={title}>
            <form
              className="login__form"
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
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

              <p className="login__error">{spanError}</p>
              <button className="login__submit">Sign In</button>
            </form>
          </RightSign>
        </div>
      </div>
    );
  }
}

const loginForm = reduxForm({
  form: "loginForm",
})(Login);

const mapStateToProps = (state) => {
  const { loading, error } = state.auth;
  return {
    loading,
    authError: error,
  };
};

export default connect(mapStateToProps, {
  authentication,
})(loginForm);
