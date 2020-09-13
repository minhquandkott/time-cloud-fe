import "./Login.css";
import React from "react";
import { Field, reduxForm } from "redux-form";
import LeftSign from "../../components/sign/leftSign/LeftSign";
import RightSign from "../../components/sign/rightSign/RightSign";
import { connect } from "react-redux";
import { authentication } from "../../redux/actions";
import Spinner from "../../components/loading/spinner/Spinner";

class Login extends React.Component {
  renderInput({ input, meta, label, ...attributes }) {
    return (
      <div className="login__field">
        <label htmlFor={label}>{label}</label>
        <input {...input} {...attributes} id={label} autoComplete="off" />
      </div>
    );
  }

  onFormSubmit = ({ email, password }) => {
    this.props.authentication(email, password);
  };

  onHeaderButtonHandler = () => {};

  render() {
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
              />
              <Field
                name="password"
                type="password"
                placeholder="6+ character"
                component={this.renderInput}
                label="password"
              />
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
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {
  authentication,
})(loginForm);
