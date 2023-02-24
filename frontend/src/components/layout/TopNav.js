import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ChangePassword from "../auth/ChangePassword";
import {
  leftBarItemChange,
  systemReset,
} from "../../store/action/CommonAction";
import { signOut, changePassword } from "../../store/action/AuthAction";
import { SuucessOrErrorModal, SystemResetModal } from "./SystemResetModal";
import swal from "sweetalert";
import { backup, restore } from "../../store/action/HodAction";

class TopNav extends Component {
  state = {
    password: "",
    newPassword: "",
    onRequestFlag: false,
    type: "",
    systemReset: false,
    restoreFlag: false,
    backupFlag: false,
  };

  componentDidMount() {
    M.AutoInit();
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      coverTrigger: false,
      constrainWidth: false,
      alignment: "right",
    });

    var elemsM = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elemsM, {});
  }

  componentDidUpdate() {
    if (this.state.onRequestFlag && !this.props.changePasswordLoading) {
      if (this.props.changePasswordSuccess) {
        swal("Success", "SuccessFul", "success");
        var modal = document.getElementById("change-password-modal");
        var instance = M.Modal.getInstance(modal);
        instance.close();
        this.setState({ onRequestFlag: false });
      }
      if (this.props.changePasswordError) {
        swal("OOPS!", this.props.changePasswordMsg, "error");
        this.setState({ onRequestFlag: false });
      }
    }
    if (
      this.state.systemReset &&
      !this.props.systemResetSuccess &&
      !this.props.systemResetError &&
      this.props.systemResetLoading
    ) {
      swal("System Reseting...wait for 10 seconds", {
        buttons: false,
        timer: 10000,
      });
    }
    if (
      this.state.restoreFlag &&
      !this.props.restoreSuccess &&
      !this.props.restoreError &&
      this.props.restoreLoading
    ) {
      swal("Data Restoring...wait for 10 seconds", {
        buttons: false,
        timer: 10000,
      });
    }
    if (this.state.systemReset && !this.props.systemResetLoading) {
      if (this.props.systemResetSuccess) {
        this.props.SignOut(this.props.user.accessToken);
        this.setState({ systemReset: false });
      }
      if (this.props.systemResetError) {
        swal("Oops!!", this.props.message, "error");
        this.setState({ systemReset: false });
      }
    }
    if (this.state.restoreFlag && !this.props.restoreLoading) {
      if (this.props.restoreSuccess) {
        swal("Success", "Successfully restored", "success");
      } else {
        swal("OOPS!", "Failed to restore", "error");
      }
      this.setState({ restoreFlag: false });
    }
    if (this.state.backupFlag && !this.props.backupLoading) {
      if (this.props.backupSuccess) {
        swal("Success", "Backup successfully", "success");
      } else {
        swal("OOPS!", "Backup Failed", "error");
      }
      this.setState({ backupFlag: false });
    }
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var Credential = {
      password: this.state.password,
      newPassword: this.state.newPassword,
    };
    var re = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])");
    var tested = re.test(this.state.newPassword);
    if (!tested) {
      swal(
        "Info",
        "Password should contain atleast one Capital letter, one Small letter, one Number and one special charecter",
        "info"
      );
      return;
    }
    if (this.state.newPassword.length < 10) {
      swal("Info", "Password should contain minimum ten charecters", "info");
      return;
    }
    this.setState({
      password: "",
      newPassword: "",
      onRequestFlag: true,
    });
    this.props.ChangePassword(
      Credential,
      this.props.userData.userDetails.id,
      this.props.user.accessToken
    );
  };

  OnSignOut = (e) => {
    this.props.SignOut(this.props.user.accessToken);
  };

  handleNav = (e) => {
    // alert(e.target.id)
    this.props.LeftBarItemChange(e.target.id);
  };
  handleReset = (e) => {
    if (this.state.action == "systemReset") {
      this.setState({ systemReset: true });
      this.props.SystemReset(this.props.user.accessToken);
    }
    if (this.state.action == "restore") {
      e.preventDefault();
      this.setState({ restoreFlag: true });
      this.props.Restore(this.props.user.accessToken);
    }
    if (this.state.action == "backup") {
      e.preventDefault();
      this.setState({ backupFlag: true });
      this.props.Backup(this.props.user.accessToken);
    }
  };

  getDate = (date) => {
    var d = new Date(date);
    var day = d.getDate();
    if (day.toString().length == 1) day = "0" + day;
    var month = d.getMonth() + 1;
    if (month.toString().length == 1) month = "0" + month;
    var Year = d.getFullYear();
    return day + "-" + month + "-" + Year;
  };

  render() {
    const { user } = this.props;
    console.log("state", this.state);
    console.log("props", this.props);
    return (
      <div>
        <ChangePassword
          state={this.state}
          HandleChange={this.handleChange}
          OnSubmit={this.onSubmit}
        />
        <SystemResetModal
          handleClick={this.handleReset}
          message={
            this.state.action == "systemReset"
              ? "reset the system"
              : this.state.action == "backup"
              ? "backup the system"
              : this.state.action == "restore"
              ? "restore the system"
              : null
          }
        />
        <ul id="userName" className="dropdown-content white darken-3">
          {this.props.userData.userDetails.status == "Temp" ? (
            <>
              <li>
                <a href="#" className=" black-text" onClick={this.OnSignOut}>
                  <b>Logout</b>
                </a>
              </li>
              <li>
                <Link
                  className="ChangePassword black-text modal-trigger"
                  data-target="change-password-modal"
                >
                  <b>Change Password</b>
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* <li>
                <Link
                  className="ChangePassword black-text modal-trigger"
                  data-target="change-password-modal"
                >
                  <b>Change Password</b>
                </Link>
              </li> */}
              {this.props.user.is_compliance ? (
                <>
                  {/* <li>
                    <Link
                      className="ChangePassword black-text modal-trigger"
                      data-target="change-password-modal"
                    >
                      <b>Change Password</b>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      className="ChangePassword black-text modal-trigger"
                      data-target="confirm-modal"
                      onClick={() => this.setState({ action: "systemReset" })}
                    >
                      <b>System Reset</b>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="ChangePassword black-text modal-trigger"
                      data-target="confirm-modal"
                      onClick={() => this.setState({ action: "backup" })}
                    >
                      <b>Backup</b>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="ChangePassword black-text modal-trigger"
                      data-target="confirm-modal"
                      onClick={() => this.setState({ action: "restore" })}
                    >
                      <b>Restore</b>
                    </Link>
                  </li> */}
                </>
              ) : null}
              <li>
                <a href="#" className=" black-text" onClick={this.OnSignOut}>
                  <b>Logout</b>
                </a>
              </li>
              <li>
                <Link
                  className="ChangePassword black-text modal-trigger"
                  data-target="change-password-modal"
                >
                  <b>Change Password</b>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-fixed">
          <nav style={{ backgroundColor: "#022d36" }} role="navigation">
            <div className="nav-wrapper">
              <ul className="left hide-on-med-and-down">
                {this.props.user &&
                this.props.userData.userDetails.status != "Temp" ? (
                  <li>
                    <NavLink to="/" style={{ fontSize: 20, height: "10vh" }}>
                      <img
                        style={{ paddingTop: 13 }}
                        src="assets/images/company.png"
                        widht="50"
                        height="50"
                      ></img>
                      <span
                        style={{
                          marginLeft: 4,
                          marginTop: -24,
                          fontWeight: 500,
                        }}
                      >
                        Home
                      </span>
                    </NavLink>
                  </li>
                ) : null}
              </ul>
              <span style={{ color: "white" }}>
                {this.props.company &&
                new Date(
                  new Date(this.props.company.window_close_from).setHours(
                    0,
                    0,
                    0
                  )
                ).getTime() <= new Date().getTime() &&
                new Date().getTime() <=
                  new Date(
                    new Date(this.props.company.window_close_to).setHours(
                      23,
                      59,
                      59
                    )
                  ).getTime()
                  ? "Trading window will be closed from " +
                    this.getDate(this.props.company.window_close_from) +
                    " to " +
                    this.getDate(this.props.company.window_close_to)
                  : null}
              </span>
              <ul
                className="right hide-on-med-and-down"
                style={{ paddingRight: 10 }}
              >
                <li>
                  <Link
                    className="dropdown-trigger white-text"
                    style={{ fontSize: "16px" }}
                    to="#"
                    data-target="userName"
                  >
                    <i
                      className="material-icons right"
                      style={{ color: "white" }}
                    >
                      arrow_drop_down
                    </i>
                    <span style={{ fontWeight: 500 }}>
                      {user ? user.name : "no_name"}
                    </span>
                  </Link>
                </li>
              </ul>
              <a href="#" data-target="nav-mobile" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            </div>
          </nav>
        </div>

        <ul id="nav-mobile" className="sidenav">
          <div className="center center-align">
            <li>
              <NavLink to="/" style={{ fontSize: 20, height: "10vh" }}>
                <img
                  style={{ marginTop: 20 }}
                  src="assets/images/company.png"
                  widht="40"
                  height="40"
                ></img>
                <span style={{ marginLeft: 4, marginTop: -14 }}>Home</span>
              </NavLink>
            </li>
          </div>

          {/* <li>
            <Link
              className="ChangePassword black-text modal-trigger"
              data-target="change-password-modal"
            >
              Change Password
            </Link>
          </li> */}
          <li>
            <a href="#" className=" black-text" onClick={this.OnSignOut}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth.user);
  return {
    user: state.auth.user,
    userData: state.auth.data,
    authLoading: state.auth.authLoading,
    changePasswordSuccess: state.auth.changePasswordSuccess,
    changePasswordLoading: state.auth.changePasswordLoading,
    changePasswordError: state.auth.changePasswordError,
    changePasswordMsg: state.auth.changePasswordMsg,

    systemResetSuccess: state.common.systemResetSuccess,
    systemResetLoading: state.common.systemResetLoading,
    systemResetError: state.common.systemResetError,
    systemResetMessage: state.common.message,

    restoreLoading: state.Hod.restoreLoading,
    restoreSuccess: state.Hod.restoreSuccess,
    restoreError: state.Hod.restoreError,

    backupLoading: state.Hod.backupLoading,
    backupSuccess: state.Hod.backupSuccess,

    company: state.common.getCompanyData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LeftBarItemChange: (id) => {
      dispatch(leftBarItemChange(id));
    },
    SignOut: (token) => {
      dispatch(signOut(token));
    },
    ChangePassword: (Credential, id, token) => {
      dispatch(changePassword(Credential, id, token));
    },
    SystemReset: (token) => {
      dispatch(systemReset(token));
    },
    Restore: (token) => {
      dispatch(restore(token));
    },
    Backup: (token) => {
      dispatch(backup(token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
// export default TopNav
