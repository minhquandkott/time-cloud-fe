import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";

class Time extends React.Component {
  renderInput = ({ input, meta, className, ...attributes }) => {
    return (
      <div className={className}>
        <input {...attributes} {...input} autoComplete="off" />
      </div>
    );
  };

  onFormSubmit = (values) => {};
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

        <Field
          name="time "
          type="text"
          component={this.renderInput}
          placeholder="0:00:00"
          className="form__input form__input__time"
          readOnly={true}
        />

        <button className="form__button">
          <PlayCircleFilledWhiteIcon />
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    initialValues: { name: state.tasks.selectedTask?.name },
  };
};

const trackTimeForm = reduxForm({
  form: "trackTimeForm",
  enableReinitialize: true,
})(Time);

export default connect(mapStateToProps)(trackTimeForm);
