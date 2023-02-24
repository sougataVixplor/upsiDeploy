import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { Redirect } from "react-router";
import UploadUser from "./UploadUser";
import moment from "moment";
import { EmailPanTab } from "../layout/EmailPanTab";
import DeleteModal from "./DeleteModal";
import {
  emailPanRequest,
  getKmp,
  kmpRelative,
  releaseKmp,
  resetPassword,
} from "../../store/action/HodAction";
import swal from "sweetalert";
import { ViewCpModal } from "./ViewCpModal";
import {
  pdfDownload,
  updateEmployee,
  updateUPSIAccess,
} from "../../store/action/CommonAction";
import TableView from "../layout/TableView";
import { getDateString } from "../../utils/helper";

export class UserInformation extends Component {
  state = {
    relatives: [],
    user: [],
    pan: "",
    email: "",
    change: [],
    updateKmpFlag: true,
    kmpFlag: false,
    kmpRelatives: [],
    userId: "",
    query: "",
    releseKmp: false,
    emailPanFlag: false,
    kmp: [],
    resetPasswordFlag: false,
    pdfDownloadFlag: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentDidMount() {
    var elems = document.querySelectorAll(".modal");
    var instance = M.Modal.init(elems, {});
    // var elem = document.querySelectorAll(".");
    // var instances = M.Tooltip.init(elem, {});
    // console.log(instances);
  }
  componentDidUpdate() {
    // var elem = document.querySelectorAll(".");
    // var instance = M.Tooltip.init(elem, {});
    if (this.state.kmpFlag && !this.props.kmRelativeLoading) {
      this.setState({
        kmpRelatives: this.props.kmpRelative,
        kmpFlag: false,
      });
    }
    if (this.state.uploadFlag && !this.props.uploadBulkEmployeeLoading) {
      if (this.props.uploadBulkEmployeeSuccess) {
        swal("Success", "Upload SuccessFull", "success");
        this.setState({ uploadFlag: false });
      } else if (this.props.uploadBulkEmployeeError) {
        swal("OOPS!", this.props.uploadBulkEmployeeMsg, "error");
        this.setState({ uploadFlag: false });
      }
    }
    if (this.state.releseKmp && !this.props.releseKmpLoading) {
      if (this.props.releseKmpSuccess) {
        swal("Success", "SuccessFul", "success");
        if (this.state.filter && this.state.filter != "")
          this.props.GetKmp(this.props.user.accessToken, {
            type: this.state.filter,
          });
        else this.props.GetKmp(this.props.user.accessToken);
        this.setState({ releseKmp: false });
      } else if (this.props.releseKmpError) {
        swal("OOPS!", this.props.releseKmpMsg, "error");
        this.setState({ releseKmp: false });
      }
    }
    if (this.state.emailPanFlag && !this.props.emailPanRequestLoading) {
      if (this.props.emailPanRequestSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({ emailPanFlag: false });
      } else if (this.props.emailPanRequestError) {
        swal("OOPS!", this.props.errorMassege, "error");
        this.setState({ emailPanFlag: false });
      }
    }
    if (this.state.resetPasswordFlag && !this.props.resestPassLoading) {
      if (this.props.resestPassSuccess) {
        swal(
          "Success",
          "Password reset successfull. New password has been sent to user's email",
          "success"
        );
        this.setState({ resetPasswordFlag: false });
      } else if (this.props.resestPassError) {
        swal("OOPS!", this.props.resestPassMsg, "error");
        this.setState({ resetPasswordFlag: false });
      }
    }
    if (this.state.pdfDownloadFlag && this.props.pdfDownloadError) {
      swal("OOPS!", "Failed to download", "error");
      this.setState({ pdfDownloadFlag: false });
    }
    if (this.state.onSwitchFlag && this.props.updateEmployeeSuccess) {
      this.setState({ onSwitchFlag: false });
      this.props.GetKmp(this.props.user.accessToken, {
        type: this.state.filter,
      });
    }
    if (this.state.onSwitchFlag && this.props.updateEmployeeError) {
      this.setState({ onSwitchFlag: false });
      swal("OOPS!", this.props.updateEmployeeMsg, "error");
    }

    if (
      this.state.onUPSIAccessSwitchFlag &&
      this.props.updateUPSIAccessSuccess
    ) {
      this.setState({ onUPSIAccessSwitchFlag: false });
      this.props.GetKmp(this.props.user.accessToken, {
        type: this.state.filter,
      });
    }
    if (this.state.onUPSIAccessSwitchFlag && this.props.updateUPSIAccessError) {
      this.setState({ onUPSIAccessSwitchFlag: false });
      swal("OOPS!", this.props.updateUPSIAccessMsg, "error");
    }
  }
  clickRelative = (element) => {
    let components = this.state.change;
    element = (
      <EmailPanTab
        index={components.length}
        deleteTab={this.deleteTab}
        HandleChange={this.handleChange}
        state={this.state}
      />
    );

    components.push(element);

    this.setState({
      change: components,
    });
  };

  kmpView = (id) => {
    var id = id;
    var user = this.props.kmps.find((o) => o.id == id);
    console.log("user", user);
    this.setState({ kmpFlag: true, kmp: user });
    //this.props.KmpRelative(id, this.props.user.accessToken);
  };
  deleteTab = (element) => {
    // console.log(element.currentTarget.id)
    // let components =  this.state.change.splice(element.currentTarget.id, 1);
    this.setState({
      // change: components
      change: this.state.change.splice(element.currentTarget.id, 1),
    });
  };
  onSubmitPanEmail = (e) => {
    e.preventDefault();
    var email = this.state.email;
    var company_id = this.props.userData.userDetails.Company.id;
    var data = {
      email: email,
      company_id: company_id,
    };
    this.setState({ emailPanFlag: true, email: "" });
    var modal = document.getElementById("add-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.props.EmailPanRequest(data, this.props.user.accessToken);
  };

  CatchIdForRelese = (id) => {
    this.setState({ userId: id });
  };

  releseKmp = (e) => {
    console.log(e.target.id);
    e.preventDefault();
    this.setState({ releseKmp: true });
    var modal = document.getElementById("delete-user-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.props.ReleseKmp(e.target.id, this.props.user.accessToken);
  };

  resetPass = (id) => {
    //e.preventDefault();
    this.setState({ resetPasswordFlag: true });
    this.props.ResetPass(id, this.props.user.accessToken);
    // console.log(e.target);
  };

  onFilter = (e) => {
    if (this.props.user) {
      if (e.target.value && e.target.value != "")
        this.props.GetKmp(this.props.user.accessToken, {
          type: e.target.value,
        });
      else this.props.GetKmp(this.props.user.accessToken);
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  onDownload = (e) => {
    e.preventDefault();
    this.setState({ pdfDownloadFlag: true });
    var query = {};
    if (this.state.filter) query.type = this.state.filter;
    this.props.PdfDownload(
      null,
      null,
      null,
      "CONNECTED_PERSONS",
      this.props.user.accessToken,
      query
    );
  };

  onSwitch = (e, d) => {
    this.props.UpdateEmployee(
      null,
      [{ id: d.id, canEdit: d.canEdit ? false : true }],
      this.props.user.accessToken
    );
    this.setState({ onSwitchFlag: true });
  };

  onUPSIAccessSwitch = (e, d) => {
    this.props.UpdateUPSIAccess(
      null,
      [{ id: d.id, upsi: d.upsi ? false : true }],
      this.props.user.accessToken
    );
    this.setState({ onUPSIAccessSwitchFlag: true });
  };

  enableAll = (e) => {
    var body = [];
    const query = this.state.query;
    const filteredUser = this.props.kmps
      ? query
        ? this.props.kmps.filter((user) => {
            return (
              user.emp_code.toLowerCase().includes(query.toLowerCase()) ||
              user.name.toLowerCase().includes(query.toLowerCase()) ||
              user.email.toLowerCase().includes(query.toLowerCase()) ||
              user.pan.toLowerCase().includes(query.toLowerCase()) ||
              user.designation.toLowerCase().includes(query.toLowerCase()) ||
              user.status.toLowerCase().includes(query.toLowerCase())
            );
          })
        : this.props.kmps
      : [];
    for (var i = 0; i < filteredUser.length; i++) {
      body.push({
        id: filteredUser[i].id,
        canEdit: e.target.checked,
      });
    }
    this.setState({ onSwitchFlag: true });
    this.props.UpdateEmployee(null, body, this.props.user.accessToken);
  };

  render() {
    console.log("state ", this.state);
    console.log("props ", this.props);
    if (!this.props.user) return <Redirect to="/login" />;
    console.log("kmp", this.props.kmps);
    const query = this.state.query;
    const filteredUser = this.props.kmps
      ? query
        ? this.props.kmps.filter((user) => {
            return (
              user.emp_code.toLowerCase().includes(query.toLowerCase()) ||
              user.name.toLowerCase().includes(query.toLowerCase()) ||
              user.email.toLowerCase().includes(query.toLowerCase()) ||
              user.pan.toLowerCase().includes(query.toLowerCase()) ||
              user.designation.toLowerCase().includes(query.toLowerCase()) ||
              user.status.toLowerCase().includes(query.toLowerCase())
            );
          })
        : this.props.kmps
      : [];
    if (this.props.releseKmpLoading) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
    return (
      <div>
        <ViewCpModal UserInfo={this.state.kmp} />
        <DeleteModal id={this.state.userId} HandleDelete={this.releseKmp} />
        {/* <ViewRelatives kmpRelatives={this.state.kmpRelatives} /> */}
        {/* <ResetPasswordModal pass={this.props.resetPass} /> */}
        <UploadUser />
        <div className="">
          <div className="row">
            <div className="col s8 m8 l8 offset-s1 offset-m1 offset-l1">
              <div className="row container">
                <div
                  className="row item-header"
                  style={{ width: "100%", marginLeft: -43 }}
                >
                  <b>Insiders</b>
                </div>
                <div
                  className="col s4 m4 l4 input-field search-box"
                  style={{ marginLeft: "-55px", marginTop: "-55px" }}
                >
                  <label style={{ marginTop: "20px", fontSize: "12px" }}>
                    Choose Insider Type
                  </label>
                  <br />
                  <br />
                  <select
                    className="browser-default"
                    id="filter"
                    value={this.state.filter ? this.state.filter : "selected"}
                    onChange={this.onFilter}
                  >
                    <option value="selected" disabled>
                      Choose your option
                    </option>
                    <option value="">All</option>
                    <option value="CP">CP</option>
                    <option value="DP">DP</option>
                  </select>
                </div>
                <div
                  className="col s5 m5 l5 input-field search-box"
                  style={{ marginTop: "-6px" }}
                >
                  <input
                    className="serach-input"
                    id="query"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Search your word"
                  />
                </div>
                <div className="col s1 m1 l1">
                  <i
                    className="material-icons right"
                    style={{ "margin-top": 8, "margin-right": 51 }}
                  >
                    search
                  </i>
                </div>
                <div
                  className="col s2 m2 l2"
                  //style={{ marginTop: 14, marginLeft: 10 }}
                >
                  <button
                    className="btn-floating btn-button"
                    onClick={this.onDownload}
                    title="Download Insider List"
                  >
                    <i class="material-icons" style={{ color: "black" }}>
                      download
                    </i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col s12 m12 l12">
              <span
                className="left"
                style={{
                  marginTop: 21,
                  marginBottom: -18,
                  fontWeight: 600,
                }}
              >
                Total Data: {filteredUser && filteredUser.length}
              </span>
            </div>
          </div>
          {filteredUser && filteredUser.length > 0 ? (
            <div
              className="switch"
              style={{ transform: "translate(390px, -26px)" }}
            >
              <label>
                Disable All can edit
                <input
                  type="checkbox"
                  checked={
                    filteredUser.filter((f) => f.is_active).length ==
                    filteredUser.filter((f) => f.is_active && f.canEdit).length
                      ? true
                      : false
                  }
                  onChange={this.enableAll}
                />
                <span className="lever"></span>
                Enable All can edit
              </label>
            </div>
          ) : null}
          {filteredUser && filteredUser.length > 0 ? (
            <TableView
              data={filteredUser.sort((a, b) =>
                a.createdAt > b.createdAt ? 1 : -1
              )}
              headers={[
                {
                  name: "Emp Code",
                  key: (d) => {
                    return d.emp_code;
                  },
                },
                {
                  name: "Name",
                  key: (d) => {
                    return d.name;
                  },
                },
                {
                  name: "Email",
                  key: (d) => {
                    return d.email;
                  },
                },
                {
                  name: "PAN",
                  key: (d) => {
                    return d.pan?.split("-")[0] === "dummy" ? "" : d.pan;
                  },
                },
                {
                  name: "Designation",
                  key: (d) => {
                    return d.designation;
                  },
                },
                {
                  name: "Status",
                  key: (d) => {
                    return d.status;
                  },
                },
                {
                  name: "Is_Active",
                  key: (d) => {
                    return d.is_active ? "True" : "False";
                  },
                },
                {
                  name: "Timestamp",
                  key: (d) => {
                    return d.Company.updatedAt
                      ? moment(d.updatedAt).format("DD-MM-YYYY, h:mm:ss a")
                      : "";
                  },
                },
                {
                  name: "Total Login",
                  key: (d) => {
                    return d.totalLogin;
                  },
                },
                {
                  name: "Last Login",
                  key: (d) => {
                    return d.totalLogin === 0
                      ? "N/A"
                      : getDateString(new Date(d.lastLogin), true);
                  },
                },
              ]}
              actionWidth="220px"
              actions={[
                {
                  name: "Action",
                  key: [
                    { name: "view", f: this.kmpView, modal: "view-cp-modal" },
                    {
                      name: "delete",
                      f: this.CatchIdForRelese,
                      modal: "delete-user-modal",
                    },
                    { name: "reset_pass", f: this.resetPass, page: false },
                    { name: "switch", f: this.onSwitch, page: false },
                    {
                      name: "upsiEnableswitch",
                      f: this.onUPSIAccessSwitch,
                      page: false,
                    },
                  ],
                },
              ]}
            />
          ) : (
            <span style={{ fontWeight: 600, fontSize: 20 }}>No Data Found</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("relative", state);
  return {
    user: state.auth.user,
    userData: state.auth.data,
    kmps: state.Hod.getKmp,
    kmRelativeLoading: state.Hod.kmRelativeLoading,
    kmpRelative: state.Hod.kmRelative.Relatives,

    resetPass: state.Hod.resetPass,
    resestPassSuccess: state.Hod.resestPassSuccess,
    resestPassError: state.Hod.resestPassError,
    resestPassLoading: state.Hod.resestPassLoading,
    resestPassMsg: state.Hod.resestPassMsg,

    uploadBulkEmployeeSuccess: state.Hod.uploadBulkEmployeeSuccess,
    uploadBulkEmployeeError: state.Hod.uploadBulkEmployeeError,
    uploadBulkEmployeeLoading: state.Hod.uploadBulkEmployeeLoading,
    uploadBulkEmployeeMsg: state.Hod.uploadBulkEmployeeMsg,

    releseKmpSuccess: state.Hod.releseKmpSuccess,
    releseKmpError: state.Hod.releseKmpError,
    releseKmpLoading: state.Hod.releseKmpLoading,
    releseKmpMsg: state.Hod.releseKmpMsg,

    emailPanRequestLoading: state.Hod.emailPanRequestLoading,
    emailPanRequestSuccess: state.Hod.emailPanRequestSuccess,
    emailPanRequestError: state.Hod.emailPanRequestError,
    errorMassege: state.Hod.errorMassege,

    pdfDownloadError: state.common.pdfDownloadError,

    updateEmployeeLoading: state.common.updateEmployeeLoading,
    updateEmployeeSuccess: state.common.updateEmployeeSuccess,
    updateEmployeeError: state.common.updateEmployeeErroe,
    updateEmployeeData: state.common.updateEmployeeData,
    updateEmployeeMsg: state.common.updateEmployeeMsg,

    updateUPSIAccessLoading: state.common.updateUPSIAccessLoading,
    updateUPSIAccessSuccess: state.common.updateUPSIAccessSuccess,
    updateUPSIAccessError: state.common.updateUPSIAccessError,
    updateUPSIAccessData: state.common.updateUPSIAccessData,
    updateUPSIAccessMsg: state.common.updateUPSIAccessMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetKmp: (token, query) => {
      dispatch(getKmp(token, query));
    },
    EmailPanRequest: (data, token) => {
      dispatch(emailPanRequest(data, token));
    },
    KmpRelative: (id, token) => {
      dispatch(kmpRelative(id, token));
    },
    ReleseKmp: (id, token) => {
      dispatch(releaseKmp(id, token));
    },
    ResetPass: (id, token) => {
      dispatch(resetPassword(id, token));
    },
    PdfDownload: (startDate, endDate, request_status, type, token, query) => {
      dispatch(
        pdfDownload(startDate, endDate, request_status, type, token, query)
      );
    },
    UpdateEmployee: (query, body, token) => {
      dispatch(updateEmployee(query, body, token));
    },
    UpdateUPSIAccess: (query, body, token) => {
      dispatch(updateUPSIAccess(query, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);
