import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";
import { createTime } from "../../redux/actions";
import Counter from "../counter/Counter";

class Time extends React.Component {
  renderInput = ({ input, meta, className, ...attributes }) => {
    return (
      <div className={className}>
        <input {...attributes} {...input} autoComplete="off" />
      </div>
    );
  };

  onFormSubmit = (values) => {
    if (!this.props.isCounting) {
      this.props.createTime(1, 1);
    } else {
      this.props.createTime();
    }
  };
  render() {
    console.log(this.props);
    return (
      <form
        className="form"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <Field
          name="description"
          type="text"
          component={this.renderInput}
          placeholder="Description..."
          className="form__input form__input__description"
        />
        <Field
          name="name"
          type="text"
          component={this.renderInput}
          placeholder="Task..."
          className="form__input form__input__task"
        />
        <Counter />

        <button className="form__button">
          <PlayCircleFilledWhiteIcon />
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { trackTimeForm } = state.form;
  return {
    initialValues: { name: state.tasks.selectedTask?.name },
    isCounting: state.time.isCounting,
  };
};

const trackTimeForm = reduxForm({
  form: "trackTimeForm",
  enableReinitialize: true,
})(Time);

export default connect(mapStateToProps, {
  createTime,
})(trackTimeForm);
