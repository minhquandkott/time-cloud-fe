import React from "react";
import "./Time.css";
import { Field, reduxForm } from "redux-form";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseIcon from "@material-ui/icons/Pause";
import { connect } from "react-redux";
import { createTime, saveTime } from "../../redux/actions";
import Counter from "../counter/Counter";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Spinner from "../loading/spinner/Spinner";

class Time extends React.Component {
  renderInput = ({ input, meta, className, ...attributes }) => {
    return (
      <div className={className}>
        <input {...attributes} {...input} autoComplete="off" />
      </div>
    );
  };
  componentDidMount() {}

  onFormSubmit = ({ description, name }) => {
    console.log(description !== "", name !== "");
    if (description !== "" && name !== "") {
      if (!this.props.isCounting) {
        this.props.createTime();
      } else {
        this.props.createTime();
      }
    } else {
    }
  };

  onSaveButtonClick = (event) => {
    this.props.reset();
    this.props.saveTime(this.props.description);
  };

  onSaveButtonClick;
  render() {
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
          {this.props.isCounting ? (
            <PauseIcon className="form__icon__pause" />
          ) : (
            <PlayCircleFilledWhiteIcon className="form__icon__play" />
          )}
        </button>
        {!this.props.isCounting && this.props.beginTime ? (
          <div className="form__icon__save" onClick={this.onSaveButtonClick}>
            {this.props.isSaving ? <Spinner /> : <SaveAltIcon />}
          </div>
        ) : null}
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { isCounting, isSaving, beginTime, selectedTask } = state.time;
  const { tasks } = state;

  return {
    initialValues: { name: selectedTask?.name, description: "" },
    isCounting,
    isSaving,
    description: state.form.trackTimeForm?.values.description,
    beginTime,
  };
};

const trackTimeForm = reduxForm({
  form: "trackTimeForm",
  enableReinitialize: true,
})(Time);

export default connect(mapStateToProps, {
  createTime,
  saveTime,
})(trackTimeForm);
