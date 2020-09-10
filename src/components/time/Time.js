import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

class Time extends React.Component {
  renderInput = ({ input, ...attributes }) => {
    return <input {...attributes} {...input} autoComplete="off" />;
  };

  render() {
    return (
      <form className="form">
        <Field
          name="description"
          type="text"
          component={this.renderInput}
          placeholder="Description..."
          className="form__input form__input__description"
        />
        <Field
          name="task "
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

export default reduxForm({
  form: "trackTimeForm",
})(Time);
