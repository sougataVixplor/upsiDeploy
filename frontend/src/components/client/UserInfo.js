import React, { Component } from "react";
import { connect } from "react-redux";
import { addRelativeFlag, sharePdf } from "../../store/action/CommonAction";
import {
  releaseRelative,
  updateUser,
  resetProps,
} from "../../store/action/ClientAction";
import { RelativeTab } from "../layout/RelativeTab";
import { viewCorrectionRequest } from "../../store/action/HodAction";
import M from "materialize-css";
import moment from "moment";
import { signOut, changePassword } from "../../store/action/AuthAction";
import swal from "sweetalert";

export class UserInfo extends Component {
  state = {
    getUserFlag: true,
    name: "",
    pan: "",
    address: "",
    phone: null,
    designation: null,
    category: "",
    other_identifier_no: "",
    other_identifier_type: "",
    security_type: null,
    last_benpos_date: null,
    last_institute: "",
    last_employer: "",
    email: "",
    emp_code: "",
    folios: [
      { folio: "", current_share: 0 },
      { folio: "", current_share: 0 },
      { folio: "", current_share: 0 },
      { folio: "", current_share: 0 },
      { folio: "", current_share: 0 },
    ],

    relatives: [],
    relativeAdder: false,
    change: [],
    set: false,

    onRequestFlag: false,
    type: "",

    edit: false,

    sharePdfSuccessAdd: false,
    sharePdfSuccesslogin: false,
  };

  componentDidMount = () => {
    if (this.props.user) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "-" + dd + "-" + yyyy;
      console.log("today", today, new Date());
      this.setState({ getUserFlag: true, last_benpos_date: today });
      this.props.ResetProps();
      this.props.ViewCorrectionRequest(
        this.props.userData.userDetails.id,
        this.props.user.accessToken
      );
    }
  };

  componentDidUpdate = () => {
    if (this.state.name != "" && this.state.set) {
      M.updateTextFields();
      this.setState({ set: false });
    }
    if (
      this.state.getUserFlag &&
      this.props.correctionUserSuccess &&
      !this.props.correctionUserLoading
    ) {
      var uData = this.props.correctionUserList;
      var folios = this.state.folios;
      if (this.props.correctionUserList.Folios) {
        var f = this.props.correctionUserList.Folios;
        for (var i = 0; i < Math.min(f.length, 5); i++) {
          folios[i] = {
            folio: f[i].folio,
            current_share: f[i].current_share,
            id: f[i].id,
          };
        }
      }

      var uData = this.props.correctionUserList;
      var rels = this.state.relatives;
      if (this.props.correctionUserList.Relatives) {
        var f = this.props.correctionUserList.Relatives;
        for (var i = 0; i < f.length; i++) {
          rels.push({});
          rels[i] = {
            id: f[i].id,
            type: f[i].type,
            name: f[i].name,
            pan: f[i].pan,
            address: f[i].address,
            phone: f[i].phone,
            designation: f[i].designation,
            category: f[i].category,
            security_type: f[i].security_type,
            last_benpos_date: f[i].last_benpos_date,
            last_institute: f[i].last_institute,
            last_employer: f[i].last_employer,
            email: f[i].email,
            relation: f[i].relation,
            emp_sub_code: f[i].emp_sub_code,
            other_identifier_no: f[i].other_identifier_no,
            other_identifier_type: f[i].other_identifier_type,
            last_institute: f[i].last_institute,
            last_employer: f[i].last_employer,
            prefilled: true,
            folios: [
              { folio: "", current_share: 0 },
              { folio: "", current_share: 0 },
              { folio: "", current_share: 0 },
              { folio: "", current_share: 0 },
              { folio: "", current_share: 0 },
            ],
          };
          if (f[i].Folios) {
            for (var j = 0; j < Math.min(5, f[i].Folios.length); j++) {
              rels[i]["folios"][j] = {
                folio: f[i].Folios[j].folio,
                current_share: f[i].Folios[j].current_share,
                id: f[i].Folios[j].id,
              };
            }
          }
        }
      }
      this.setState({
        id: uData.id,
        name: uData.name,
        pan: uData.pan,
        address: uData.address,
        phone: uData.phone,
        designation: uData.designation,
        category: uData.category,
        security_type: uData.security_type,
        last_benpos_date: moment(uData.last_benpos_date).format("DD-MM-YYYY"),
        last_institute: uData.last_institute,
        last_employer: uData.last_employer,
        other_identifier_no: uData.other_identifier_no,
        other_identifier_type: uData.other_identifier_type,
        email: uData.email,
        emp_code: uData.emp_code,
        folios: folios,
        relatives: rels,
        set: true,
        getUserFlag: false,
      });
    }
    if (this.state.onRequestFlag && !this.props.updateLoading) {
      if (this.props.updateSuccess) {
        if (this.props.userData.userDetails.status == "Temp") {
          swal("Success", "SuccessFul", "success");
          //this.props.SignOut(this.props.user.accessToken);
        } else {
          swal("Success", "SuccessFul", "success");
        }
        // var modal = document.getElementById("download-modal");
        // var instance = M.Modal.getInstance(modal);
        // instance.open();
        if (this.props.userData.userDetails.status == "Temp") {
          var type = "New_cp_added";
          var type1 = "New_cp_login_details";
          this.props.SharePdf(
            type,
            this.props.user.id,
            this.props.user.accessToken
          );
          this.setState({ sharePdfSuccessAdd: true }, () => {
            if (this.state.sharePdfSuccessAdd) {
              this.props.SharePdf(
                type1,
                this.props.user.id,
                this.props.user.accessToken
              );
              this.setState(
                {
                  sharePdfSuccessAdd: false,
                  sharePdfSuccesslogin: true,
                },
                () => {
                  if (this.state.sharePdfSuccesslogin) {
                    this.props.SignOut(this.props.user.accessToken);
                    this.setState({ sharePdfSuccesslogin: false });
                  }
                }
              );
            }
          });
        } else {
          var type = "Cp_update_request";
          this.props.SharePdf(
            type,
            this.props.user.id,
            this.props.user.accessToken
          );
        }
        // this.props.SharePdf(
        //   type,
        //   this.props.user.id,
        //   this.props.user.accessToken
        // );
        this.setState({ type: "success", onRequestFlag: false });
      } else if (this.props.updateError) {
        swal("OOPS!", this.props.userUpdateMsg, "error");
        this.setState({ type: "error", onRequestFlag: false });
      }
    }
  };

  addRelative = (element) => {
    console.log("hjgd");
    var r = this.state.relatives;
    r.push({
      type: "",
      name: "",
      email: "",
      pan: "",
      address: "",
      phone: null,
      designation: null,
      category: "",
      security_type: "Shares",
      last_benpos_date: null,
      current_share: 0,
      status: "Active",
      is_active: true,
      other_identifier_no: "",
      other_identifier_type: "",
      last_institute: "",
      last_employer: "",
      email: "",
      last_benpos_date: "",
      relation: "",
      emp_sub_code: "",
      folios: [
        { folio: "", current_share: 0 },
        { folio: "", current_share: 0 },
        { folio: "", current_share: 0 },
        { folio: "", current_share: 0 },
        { folio: "", current_share: 0 },
      ],
    });
    this.setState({ relatives: r });
  };

  deleteTab = (e) => {
    console.log(e.target);
    var index = e.target.id;
    this.state.relatives.splice(index, 1);
    this.setState({
      relatives: this.state.relatives,
    });
  };

  HandleChange = (e) => {
    if (e.target.id == "last_benpos_date") {
      this.setState({
        [e.target.id]: e.target.value,
      });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  HandleFolioChange = (e) => {
    var ind = Number(e.target.id.split("-")[1]);
    var type = e.target.id.split("-")[0];

    var fols = this.state.folios;

    fols[ind - 1][type] = e.target.value;

    this.setState({ folios: fols });
  };

  HandleRelativeChange = (e) => {
    var ind = Number(e.target.id.split("-")[1]);
    var type = e.target.id.split("-")[0];

    var rels = this.state.relatives;
    rels[ind][type] = e.target.value;

    this.setState({ relatives: rels });
  };

  HandleRelFolioChange = (e, i) => {
    var ind = Number(e.target.id.split("-")[1]);
    var type = e.target.id.split("-")[0];
    console.log(ind, type, i);

    var rels = this.state.relatives;

    rels[i].folios[ind - 1][type] = e.target.value;

    this.setState({ relatives: rels });
  };

  OnSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.name == "" ||
      this.state.designation == "" ||
      this.state.category == "" ||
      this.state.email == ""
    ) {
      alert("Fill all the required fields");
    } else if (this.state.relatives.length > 0) {
      console.log("in relative condition");
      for (var i = 0; i < this.state.relatives.length; i++) {
        console.log("in for loop", i, this.state.relatives[i]);
        if (
          this.state.relatives[i].type == "" ||
          this.state.relatives[i].name == "" ||
          this.state.relatives[i].relation == "" ||
          this.state.relatives[i].pan == ""
        ) {
          alert("Fill all the required fields in relative section");
        } else {
          if (this.state.last_benpos_date == "Invalid date") {
            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, "0");
            // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            // var yyyy = today.getFullYear();
            // today = mm + "-" + dd + "-" + yyyy;
            // console.log("today", today, new Date());
            // this.setState({ last_benpos_date: today }, () => {
            //   this.setState({ onRequestFlag: true });
            //   console.log(this.state);
            //   this.props.UpdateUser(
            //     this.state,
            //     this.props.user.id,
            //     this.props.userData.userDetails.status,
            //     this.props.user.accessToken
            //   );
            // });
            var d = new Date();
            var day = d.getDate();
            if (day.toString().length == 1) day = "0" + day;
            var month = d.getMonth() + 1;
            if (month.toString().length == 1) month = "0" + month;
            var Year = d.getFullYear();
            var today = Year + "-" + month + "-" + day;
            this.setState({ onRequestFlag: true });
            this.props.UpdateUser(
              { ...this.state, last_benpos_date: today },
              this.props.user.id,
              this.props.userData.userDetails.status,
              this.props.user.accessToken
            );
          } else {
            this.setState({ onRequestFlag: true });
            console.log(this.state);
            this.props.UpdateUser(
              this.state,
              this.props.user.id,
              this.props.userData.userDetails.status,
              this.props.user.accessToken
            );
          }
        }
      }
    } else {
      if (this.state.last_benpos_date == "Invalid date") {
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, "0");
        // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        // var yyyy = today.getFullYear();
        // today = mm + "-" + dd + "-" + yyyy;
        // console.log("today", today, new Date());
        // this.setState({ last_benpos_date: today }, () => {
        //   this.setState({ onRequestFlag: true });
        //   console.log(this.state);
        //   this.props.UpdateUser(
        //     this.state,
        //     this.props.user.id,
        //     this.props.userData.userDetails.status,
        //     this.props.user.accessToken
        //   );
        // });
        var d = new Date();
        var day = d.getDate();
        if (day.toString().length == 1) day = "0" + day;
        var month = d.getMonth() + 1;
        if (month.toString().length == 1) month = "0" + month;
        var Year = d.getFullYear();
        var today_rel = Year + "-" + month + "-" + day;
        this.setState({ onRequestFlag: true });
        this.props.UpdateUser(
          { ...this.state, last_benpos_date: today_rel },
          this.props.user.id,
          this.props.userData.userDetails.status,
          this.props.user.accessToken
        );
      } else {
        this.setState({ onRequestFlag: true });
        console.log(this.state);
        this.props.UpdateUser(
          this.state,
          this.props.user.id,
          this.props.userData.userDetails.status,
          this.props.user.accessToken
        );
      }
    }
  };

  releaseRelative = (element, id) => {
    console.log(id, element.currentTarget.id);
    var index = element.currentTarget.id;
    this.state.relatives.splice(index, 1);
    this.setState({
      relatives: this.state.relatives,
    });
    this.props.ReleaseRelative(id, this.props.user.accessToken);
  };

  editFlag = () => {
    this.setState({ edit: !this.state.edit });
  };

  onSharePdf = (e) => {
    if (this.props.userData.userDetails.status == "Temp") {
      var type = "New_cp_added";
    } else {
      var type = "Cp_update_request";
    }
    this.props.SharePdf(type, this.props.user.id, this.props.user.accessToken);
  };
  render() {
    console.log("loc state", this.state);
    return (
      <div>
        <div
          className="row item-header"
          style={{ width: "79%", marginLeft: 126 }}
        >
          <b>Personal Information</b>
        </div>
        <div
          className="container"
          style={{ marginTop: 15, height: "77vh", overflow: "auto" }}
        >
          <form style={{ width: "98%" }}>
            <fieldset
              disabled={
                this.props.correctionUserList.status == "Update" ||
                this.props.correctionUserList.status == "Release" ||
                this.props.correctionUserList.status == "Deactive" ||
                this.props.updateLoading ||
                this.props.updateSuccess
              }
            >
              {this.props.userData &&
                this.props.userData.userDetails &&
                (this.props.userData.userDetails.status == "Temp" ||
                  this.props.userData.userDetails.canEdit) && (
                  <div className="row">
                    <div
                      className="col s10 m10 l10"
                      style={{
                        height: 40,
                        color: "slategrey",
                        fontWeight: 900,
                        marginLeft: 72,
                      }}
                    >
                      <span className="right" style={{ marginTop: 10 }}>
                        To fill up/update the following data click on the pen --
                        {">"}
                        {/* <i className="material-icons">trending_flat</i> */}
                      </span>
                    </div>

                    <div className="col s1 m1 l1 right">
                      <a
                        className={
                          this.state.edit
                            ? "btn-floating right btn-small"
                            : "btn-floating right btn-button"
                        }
                        onClick={this.editFlag}
                      >
                        <i className="material-icons">edit</i>
                      </a>
                    </div>
                  </div>
                )}
              <div>
                <span
                  style={{
                    fontSize: "smaller",
                    marginLeft: "-79%",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "red" }}>*</span> indicates the
                  mandatory fields
                </span>
              </div>
              <fieldset>
                <legend>Personal Information</legend>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.name
                      }
                      id="name"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      required
                      placeholder="Enter your Name"
                      class="validate"
                    />
                    <label className="active" for="name">
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div class="input-field col s6 m6 l6">
                    <input
                      disabled
                      onChange={this.HandleChange}
                      value={this.state.pan}
                      id="pan"
                      type="text"
                      required
                      placeholder="Enter your PAN Number"
                    />
                    <label className="active" for="pan">
                      PAN_NO<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.designation
                      }
                      id="designation"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Designation"
                    />
                    <label className="active" for="desg">
                      Designation<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>

                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.emp_code
                      }
                      id="emp_code"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      required
                      placeholder="Enter Your Employee Code"
                    />
                    <label className="active" for="emp_code">
                      Employee Code
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      value={this.state.email}
                      onChange={this.HandleChange}
                      id="email"
                      type="email"
                      disabled={this.state.edit ? false : true}
                      required
                      placeholder="Enter Your Email Id"
                    />
                    <label className="active" for="email">
                      EMAIL ID<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s4 m4 l4">
                    <input
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.phone
                      }
                      onChange={this.HandleChange}
                      id="phone"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Mobile Number"
                    />
                    <label className="active" for="mobile">
                      Mobile NO
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      id="last_institute"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.last_institute
                      }
                      placeholder="Enter Your Last Institute"
                    />
                    <label className="active" for="last_institute">
                      Last Institute
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.last_employer
                      }
                      onChange={this.HandleChange}
                      id="last_employer"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Last Employer"
                    />
                    <label className="active" for="last_employer">
                      Last Employer
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div
                    class="input-field col s4 m4 l4"
                    style={{ "margin-top": -17 }}
                  >
                    <p>
                      <label className="active">Other Identifier Type</label>
                    </p>
                    <select
                      class="browser-default"
                      disabled={this.state.edit ? false : true}
                      id="other_identifier_type"
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.other_identifier_type
                      }
                      style={{ "margin-top": 12 }}
                    >
                      <option value="" disabled selected>
                        Choose your option
                      </option>
                      <option value="Passport">Passport</option>
                      <option value="Aadhar">Aadhar</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Any Other">Any Other</option>
                    </select>
                  </div>

                  <div class="input-field col s4 m4 l4">
                    <input
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.other_identifier_no
                      }
                      onChange={this.HandleChange}
                      id="other_identifier_no"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Other Identifier Number"
                    />
                    <label className="active" for="other_identifier_no">
                      Other Identifier Number
                    </label>
                  </div>
                  <p>
                    <label className="active">
                      Category<span style={{ color: "red" }}>*</span>
                    </label>
                  </p>
                  <div class="input-field col s4 m4 l4">
                    <select
                      class="browser-default"
                      disabled={this.state.edit ? false : true}
                      id="category"
                      onChange={this.HandleChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.category
                      }
                      style={{ "margin-top": -22 }}
                    >
                      <option value="" disabled selected>
                        Choose your option
                      </option>
                      <option value="Promoter">Promoter</option>
                      {/* <option value="Employee">Employee</option> */}
                      <option value="Director">Director</option>
                      <option value="Partner">Partner</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <p>
                    <label className="active">Address</label>
                  </p>
                  <div className="col s12 m12 l12">
                    <textarea
                      onChange={this.HandleChange}
                      id="address"
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.address
                      }
                      rows="2"
                      cols="80"
                      name="address"
                      form="usrform"
                      disabled={this.state.edit ? false : true}
                      style={{ padding: 10 }}
                      placeholder="Enter Your Address"
                    >
                      Address
                    </textarea>
                  </div>
                </div>
              </fieldset>

              <fieldset style={{ marginTop: 20 }}>
                <legend>
                  Shareholding Details (leave blank if you have no holding)
                </legend>
                <label className="active">Security Types</label>

                <div class="input-field col s12 m12 l12">
                  <select
                    class="browser-default"
                    disabled={this.state.edit ? false : true}
                    id="security_type"
                    onChange={this.HandleChange}
                    value={
                      this.props.userData.userDetails.status == "Temp"
                        ? null
                        : this.state.security_type
                    }
                  >
                    <option value="Shares" selected>
                      Shares
                    </option>
                    <option value="Warrants">Warrants</option>
                    <option value="Convertible Debentures">
                      Convertible Debentures
                    </option>
                    <option value="Rights">Rights</option>
                    <option value="Rights">Entitlements</option>
                  </select>
                </div>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[0].folio
                      }
                      id="folio-1"
                      name="folio-1"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      required
                      placeholder="Enter Your Folio or DpId+ClientId"
                    />
                    <label className="active" for="folio-1">
                      FOLIO 1 <span>(Folio or DpId+ClientId)</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[0].current_share
                      }
                      id="current_share-1"
                      name="folio"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Number of Shares"
                    />
                    <label className="active" for="current_shr1">
                      Number of Shares
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[1].folio
                      }
                      id="folio-2"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Folio or DpId+ClientId"
                    />
                    <label className="active" for="folio-2">
                      FOLIO 2 <span>(Folio or DpId+ClientId)</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[1].current_share
                      }
                      id="current_share-2"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Number of Shares"
                    />
                    <label className="active" for="current_shr2">
                      Number of Shares
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[2].folio
                      }
                      id="folio-3"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Folio or DpId+ClientId"
                    />
                    <label className="active" for="dpcl3">
                      FOLIO 3 <span>(Folio or DpId+ClientId)</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[2].current_share
                      }
                      id="current_share-3"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Number of Shares"
                    />
                    <label className="active" for="current_shr3">
                      Number of Shares
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[3].folio
                      }
                      id="folio-4"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Folio or DpId+ClientId"
                    />
                    <label className="active" for="folio-4">
                      FOLIO 4 <span>(Folio or DpId+ClientId)</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[3].current_share
                      }
                      id="current_share-4"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Number of Shares"
                    />
                    <label className="active" for="current_shr4">
                      Number of Shares
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s6 m6 l6">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[4].folio
                      }
                      id="folio-5"
                      type="text"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Folio or DpId+ClientId"
                    />
                    <label className="active" for="folio-5">
                      FOLIO 5 <span>(Folio or DpId+ClientId)</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l4">
                    <input
                      onChange={this.HandleFolioChange}
                      value={
                        this.props.userData.userDetails.status == "Temp"
                          ? null
                          : this.state.folios[4].current_share
                      }
                      id="current_share-5"
                      type="number"
                      disabled={this.state.edit ? false : true}
                      placeholder="Enter Your Number of Shares"
                    />
                    <label className="active" for="current_shr5">
                      Number of Shares
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s5 m5 l6">
                    <input
                      onChange={this.HandleChange}
                      defaultValue={
                        this.state.last_benpos_date
                          ? this.state.last_benpos_date
                              .split("-")
                              .reverse()
                              .join("-")
                          : ""
                      }
                      /* defaultValue={
                      this.state.last_benpos_date
                        ? moment(this.state.last_benpos_date).format(
                            "DD-MM-YYYY"
                          )
                        : ""
                    } */
                      id="last_benpos_date"
                      type="date"
                      disabled={this.state.edit ? false : true}
                      required
                    />
                    <label className="active" for="last_benpos_date">
                      Current BENPOS{" "}
                      <span>(Default is set to current date)</span>
                    </label>
                  </div>
                </div>
              </fieldset>

              {/*....................relative part.....................*/}

              <div className="row left">
                <div className="col s12 m12 l12" style={{ marginTop: 16 }}>
                  <span>
                    Add Immidiate Relatives/Material Financial Relationship
                  </span>{" "}
                  <a
                    className="btn-floating btn-button "
                    onClick={this.addRelative}
                    disabled={this.state.edit ? false : true}
                    //data-position="bottom"
                    title="Add"
                  >
                    <i className="material-icons">add</i>
                  </a>
                </div>
              </div>
              <div className="col s12 m12 l12">
                {this.state.relatives.map((comp, index) => (
                  <RelativeTab
                    state={this.state}
                    index={index}
                    HandleFolioChange={this.HandleRelFolioChange}
                    HandleChange={this.HandleRelativeChange}
                    deleteTab={this.deleteTab}
                    HandleDelete={this.releaseRelative}
                  />
                ))}
              </div>
              <div>
                {this.props.userData.userDetails.status != "Temp" ? (
                  <button
                    type="submit"
                    onClick={this.OnSubmit}
                    disabled={this.state.edit ? false : true}
                    className="btn right"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={this.OnSubmit}
                    disabled={
                      this.state.edit || this.state.onRequestFlag ? false : true
                    }
                    className="btn right"
                  >
                    Submit
                  </button>
                )}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    userData: state.auth.data,
    addRelativeFlagSuccess: state.common.addRelativeFlagSuccess,
    addRelativeFlag: state.common.addRelativeFlag,

    userUpdateData: state.client.userUpdateData,
    updateLoading: state.client.userUpdateLoading,
    updateSuccess: state.client.userUpdateSuccess,
    updateError: state.client.userUpdateError,
    userUpdateMsg: state.client.userUpdateMsg,

    correctionUserList: state.Hod.correctionUserList,
    correctionUserSuccess: state.Hod.correctionUserSuccess,
    correctionUserError: state.Hod.correctionUserError,
    correctionUserLoading: state.Hod.correctionUserLoading,

    correctionRequestSuccess: state.Hod.correctionRequestSuccess,

    sharePdfSuccess: state.common.sharePdfSuccess,
    sharePdfLoading: state.common.sharePdfLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddRelativeFlag: () => {
      dispatch(addRelativeFlag());
    },
    UpdateUser: (data, id, stat, token) => {
      dispatch(updateUser(data, id, stat, token));
    },
    ReleaseRelative: (id, token) => {
      dispatch(releaseRelative(id, token));
    },
    ViewCorrectionRequest: (id, token) => {
      dispatch(viewCorrectionRequest(id, token));
    },
    ResetProps: () => {
      dispatch(resetProps());
    },
    SharePdf: (type, id, pdf, token) => {
      dispatch(sharePdf(type, id, pdf, token));
    },
    SignOut: (token) => {
      dispatch(signOut(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
