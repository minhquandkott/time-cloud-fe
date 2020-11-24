import React from "react";
import "./UserInfo.css";
import Point from "../../../components/point/Point";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import {v4} from 'uuid';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import {email, require, number, requireLength10} from "../../../utils/validationUtils";

class UserInfo extends React.Component {
  state = {
    roles: [],
    txtname: "",
    txtphone: "",
    txtemail: "",
    txtaddress: "",
    txtgender: false,
    editStatus: false,
    error: null
  };
  componentDidUpdate(preProps, preState) {
    if(this.state.txtname !== preState.txtname || this.state.txtemail !== preState.txtemail || this.state.txtphone !== preState.txtphone){
      this.setState({
        error: {
          txtname: this.validate([require], this.state.txtname),
          txtemail: this.validate([require, email], this.state.txtemail),
          txtphone: this.validate([number, requireLength10], this.state.txtphone)
        }
      })
    }
    
  }

  validate(validations = [], value){  

    for(let i =0 ;i < validations.length; i++){
      const error =  validations[i](value);
      if(error){
        return error;
      } 
    }
    return undefined;
}


  componentDidMount() {
    timeCloudAPI()
      .get(`companies/52/users/${this.props.user.id}/role`)
      .then((response) => {
        var { user } = this.props;
        this.setState({
          roles: response.data,
          txtname: user.name,
          txtaddress: user.address,
          txtemail: user.email,
          txtgender: user.gender,
          txtphone: user.phoneNumber,
        });
      });
  }

  onEdit = () => {
    this.setState({
      editStatus: true
    })
  }

  onCancel = () => {
    var { user } = this.props;
    this.setState({
      editStatus: false,
      txtname: user.name,
      txtaddress: user.address,
      txtemail: user.email,
      txtgender: user.gender,
      txtphone: user.phoneNumber,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    var {user} = this.props;
    var {
      txtname,
      txtaddress,
      txtemail,
      txtgender,
      txtphone
    } = this.state;
    var newUser = {
      name: txtname,
      address: txtaddress,
      email: txtemail,
      gender: txtgender === "true" ? true : false,
      phoneNumber: txtphone,
      createAt: user.createAt
    }
    timeCloudAPI().put(`users/${this.props.user.id}`, newUser)
    .then(response => {
      console.log("Success");
    })
    this.setState({
      editStatus: false
    })
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  printRole = (role, index) => {
    if(((index + 1) % 4)) {
      return <div className="list_roles">
                <div key={role.role.id} className="role_name">
                  <Point pointSize={"2rem"} title={role.role.name} color={role.role.color} />
                  {role.role.name}
                </div>
              </div>
    }
    else return <div key={role.role.id} className="role_name">
                  <Point pointSize={"2rem"} title="" color={role.role.color} />
                  {role.role.name}
                </div>
  }

  render() {
    var {
      roles,
      editStatus,
      txtname,
      txtaddress,
      txtemail,
      txtgender,
      txtphone,
      error,
    } = this.state;
    const classNameFill =
      `user_info__field ${editStatus
        ? "user_infor__field__edit"
        : "user_infor__field__detail"}`;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="user_info">
          <div className={classNameFill}>
            <label htmlFor="name">Name</label>
            <input
              autoComplete= "off"
              style={{
                outlineColor: error?.txtname ? "red" : "var(--color-button)",
                borderColor: error?.txtname ? "red" : "#ccc"
              }}
              type="text"
              name="txtname"
              value={txtname}
              id="name"
              onChange={this.onChange}
              readOnly = {!editStatus}
            ></input>
          </div>
          {(error?.txtname && editStatus) ?
              <div className="user_info_alert">
                <ReportProblemIcon />
                <p> {error.txtname} </p>
              </div> 
            : ""}

          <div className={classNameFill}>
            <label htmlFor="">Role</label>
            <div className="list_roles">
            {roles.map((role) => (
                <Point key={v4()} css={{flexBasis: "10rem", marginBottom: "1rem"}} pointSize={"2rem"} title={role.role.name} color={role.role.color}  cssTittle={{fontSize: "1.5rem"}} />
              ))}
            </div>
              
          </div>
          <div className={classNameFill}>
            <label>Address</label>
            <input
              autoComplete= "off"
              type="text"
              name="txtaddress"
              value={txtaddress ? txtaddress : ""}
              onChange={this.onChange}
              readOnly = {!editStatus}
            ></input>
          </div>
          <div className={classNameFill}>
            <label>
              <PhoneIcon style={{ fontSize: "30px" }} />
            </label>
            <input
              autoComplete= "off"
              type="tel"
              name="txtphone"
              value={txtphone ? txtphone : ""}
              onChange={this.onChange}
              readOnly = {!editStatus}
              style={{
                outlineColor: (error?.txtphone && editStatus && txtphone) ? "red" : "var(--color-button",
                borderColor: (error?.txtphone && txtphone) ? "red" : "#ccc"
              }}
            ></input>
          </div>
          {(error?.txtphone && editStatus && txtphone) ?
              <div className="user_info_alert">
                <ReportProblemIcon />
                <p> {error.txtphone} </p>
              </div> 
            : ""}
          <div className={classNameFill}>
            <label>
              {" "}
              <EmailIcon style={{ fontSize: "30px" }} />{" "}
            </label>
            <input
              autoComplete= "off"
              type="email"
              name="txtemail"
              value={txtemail}
              onChange={this.onChange}
              readOnly = {!editStatus}
              style={{
                outlineColor: error?.txtemail ? "red" : "var(--color-button",
                borderColor: error?.txtemail ? "red" : "#ccc"
              }}
            ></input>
          </div>
          {(error?.txtemail && editStatus) ?
              <div className="user_info_alert">
                <ReportProblemIcon />
                <p> {error.txtemail} </p>
              </div> 
            : ""}
          <div className={classNameFill}>
            <label>
              {" "}
              <WcIcon style={{ fontSize: "30px" }} />{" "}
            </label>
            {
              editStatus ? <select className="select_gender" name= "txtgender" value = {txtgender} onChange= {this.onChange}>
                                <option value= {true} >Male</option>
                                <option value= {false} >Female</option>
                            </select> 
                          : <input
                              type="text"
                              name="txtgender"
                              value={txtgender ? "Male" : "Female"}
                              readOnly = {!editStatus}
                            ></input>
            }
            
          </div>
          {editStatus ? <div>
                          <button 
                            disabled={(error?.txtname || error?.txtemail) ? true : false}
                            type="submit"
                            style = {{backgroundColor: (error?.txtname || error?.txtemail) ? "darkgray" : "var(--color-button)" }}
                          >
                            Save
                          </button> 
                          <button onClick={this.onCancel}>Cancel</button>
                        </div>
                      : <button onClick={this.onEdit}>Edit</button>
          }
        </div>
      </form>
    );
  }
}

export default UserInfo;
