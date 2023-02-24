import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { withRouter } from "react-router";
import TopNav from "../layout/TopNav";
import { Redirect } from "react-router";
import moment from "moment";
import {
  getInsidersexcel,
  gotoCompare,
  leftBarItemChange,
  setQuery,
  sharePdf,
  toogleConversationFlag,
} from "../../store/action/CommonAction";
import {
  uploadBulkEmployee,
  getUpsi,
  emailPanRequest,
} from "../../store/action/HodAction";
import { UploadDocument } from "../admin/UploadDocument";
import swal from "sweetalert";

export class Dashboard extends Component {
  state = {
    chooseFlag: null,
    weeklyData: "",
    compareTransData: [],
    violationTransData: [],
    date: "",
    from: "",
    to: "",
    purpose: "",
    uploadFlag: false,
    bulkKmp: "",
    comparetransFlag: true,
    violationTransFlag: true,
    activityLogFlag: true,
    compStartDate: "",
    compEndDate: "",
    startDate: "",
    endDate: "",
    filterData: [],
    NewData: [],
    filterFlag: false,
    share_by: "",
    share_to: "",
    subject: "",
    body: "",
    onRequestFlag: false,
    type: "",
    email: "",
    company: {},
    configFlag: false,
    configSubmitFlag: false,
    annualConfirmFlag: false,
    configShareFlag: false,
  };

  componentDidMount() {
    M.AutoInit();
    var today = this.getDateValue();
    this.props.ToogleConversationFlag(false);
    if (this.props.user) {
      if (this.props.user.is_compliance) {
        this.setState({
          company: this.props.userData.userDetails.Company,
          today: today,
        });
      }
      this.get15Date();
    }
    if (this.props.query?.type === "upsi_conversation") {
      this.props.LeftBarItemChange("conversation");
      this.props.history.push({
        pathname: "/admin",
      });
    }
  }

  componentDidUpdate() {
    if (
      !this.props.weeklyDataLoading &&
      this.props.weeklyDataSuccess &&
      this.state.uploadFlag
    ) {
      console.log("modal open...");
      var modal = document.getElementById("massege-modal");
      var instance = M.Modal.getInstance(modal);
      instance.open();
      this.setState({ uploadFlag: false });
    } else if (
      !this.props.weeklyDataLoading &&
      this.props.weeklyDataError &&
      this.state.uploadFlag
    ) {
      // swal("OOPS!", 'Error to upload benpos data', "error");
      swal("OOPS!", this.props.weeklyDataMsg, "error");
      this.setState({ uploadFlag: false, weeklyData: "", date: "" });
    }
    if (this.state.configFlag && !this.props.windowConfigLoding) {
      if (this.props.windowConfigSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({ configFlag: false });
      }
      if (this.props.windowConfigError) {
        swal("OOPS!", this.props.windowConfigMsg, "error");
        this.setState({ configFlag: false });
      }
    }
    if (
      this.state.configSubmitFlag &&
      !this.props.windowConfigSubmitSendLoding &&
      this.props.windowConfigSubmitSendSuccess
    ) {
      this.props.SharePdf("Window_closure", null, this.props.user.accessToken);
      this.setState({ configSubmitFlag: false });
    }
    if (this.state.configShareFlag && !this.props.sharePdfLoading) {
      if (this.props.sharePdfSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({ configShareFlag: false });
      }
      if (this.props.sharePdfError) {
        swal("OOPS!", this.props.sharePdfMsg, "error");
        this.setState({ configShareFlag: false });
      }
      if (this.props.windowConfigSubmitSendError) {
        swal("OOPS!", this.props.windowConfigMsg, "error");
        this.setState({ configShareFlag: false });
      }
    }
  }

  getDateValue = () => {
    var d = new Date();
    var day = d.getDate();
    if (day.toString().length == 1) day = "0" + day;
    var month = d.getMonth() + 1;
    if (month.toString().length == 1) month = "0" + month;
    var Year = d.getFullYear();
    return Year + "-" + month + "-" + day;
  };

  dateFormatter = (inputDate) => {
    var splitDate = inputDate.split("-");
    if (splitDate.count == 0) {
      return null;
    }
    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];
    return day + "/" + month + "/" + year;
  };
  compareTransactionDateFormat = (inputDate) => {
    var date = new Date(inputDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  };
  onclick = (e) => {
    this.props.LeftBarItemChange(e.target.id);
    this.props.history.push({
      pathname: "/admin",
    });
  };

  handleUpload = (e) => {
    this.setState({ weeklyData: e.target.files[0] });
  };
  handleUploadDate = (e) => {
    this.setState({ date: e.target.value });
  };
  handleSubmit = (e) => {
    var date = this.state.date;
    var formattedDate = this.dateFormatter(date);
    var excel = this.state.weeklyData;
    console.log(formattedDate, excel);
    var modal = document.getElementById("upload-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.setState({ uploadFlag: true, weeklyData: "", date: "" });
    this.props.UploadExcel(formattedDate, excel, this.props.user.accessToken);
  };

  resetValue = (id) => {
    if (id == "doc") {
      this.setState({ weeklyData: "" });
    }
    if (id == "user") {
      this.setState({ bulkKmp: "" });
    }
  };

  sendMail = (e) => {
    console.error("sendMail = ", this.state);
    if (!this.state.annualConfirmFlag) {
      var modal = document.getElementById("confirmation-modal");
      var instance = M.Modal.getInstance(modal);
      instance.close();
      console.error("sendMail = ", this.state);
      this.props.SharePdf(
        "Cp_annual_declaration",
        null,
        this.props.user.accessToken
      );
      this.setState({ annualConfirmFlag: true });
      console.error("sendMail = ", this.state);
    }
  };

  sendMailCO = (e) => {
    console.error("sendMailCO = ", this.state);
    if (!this.state.annualConfirmFlag) {
      var modal = document.getElementById("confirmation-modal");
      var instance = M.Modal.getInstance(modal);
      instance.close();
      console.error("sendMailCO = ", this.state);
      this.props.SharePdf(
        "Co_annual_declaration",
        null,
        this.props.user.accessToken
      );
      this.setState({ annualConfirmFlag: true });
      console.error("sendMailCO = ", this.state);
    }
  };

  windowCloserSubmit = (e) => {
    console.log(this.state);
    var from = this.state.from;
    var to = this.state.to;
    var purpose = this.state.purpose;
    var type = "submit";
    if (this.state.from == "") {
      from = moment(this.state.company.window_close_from).format("YYYY-MM-DD");
    }
    if (this.state.to == "") {
      to = moment(this.state.company.window_close_to).format("YYYY-MM-DD");
    }
    if (this.state.purpose == "") {
      purpose = this.state.company.purpose;
    }
    this.setState({ from: "", to: "", purpose: "", configFlag: true });
    var data = {
      purpose: purpose,
    };
    var modal = document.getElementById("configure-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    console.log(from, to, purpose);
    this.props.WindowConfiguration(
      type,
      from,
      to,
      data,
      this.props.user.accessToken
    );
  };

  windowCloserSubmitShare = (e) => {
    var from = this.state.from;
    var to = this.state.to;
    var purpose = this.state.purpose;
    var type = "submit & send";
    if (this.state.from == "") {
      from = moment(this.state.company.window_close_from).format("YYYY-MM-DD");
    }
    if (this.state.to == "") {
      to = moment(this.state.company.window_close_to).format("YYYY-MM-DD");
    }
    if (this.state.purpose == "") {
      purpose = this.state.company.purpose;
    }
    this.setState({ from: "", to: "", purpose: "" });
    var data = {
      purpose: purpose,
    };
    this.setState({ from: "", to: "", purpose: "" });
    var data = {
      purpose: purpose,
    };
    var modal = document.getElementById("configure-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    console.log(from, to, purpose);
    this.setState({ configSubmitFlag: true, configShareFlag: true });
    this.props.WindowConfiguration(
      type,
      from,
      to,
      data,
      this.props.user.accessToken
    );
    //this.props.SharePdf("Window_closure", null, this.props.user.accessToken);
  };

  handleGo = (e) => {
    this.props.LeftBarItemChange("report");
    this.props.history.push({
      pathname: "/admin",
    });
    this.props.GoToCompare("compare");
    var startdate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 8
    );
    var enddate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    );
    var start_date = this.compareTransactionDateFormat(startdate);
    var end_date = this.compareTransactionDateFormat(enddate);
    this.setState({ startDate: start_date, endDate: end_date });
    var modal = document.getElementById("massege-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.props.CompareTransaction(
      start_date,
      end_date,
      this.props.user.accessToken
    );
  };
  handleWindowCloser = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };
  onTab = (e) => {
    if (e.target.id == "info") {
      this.props.history.push({
        pathname: "/info",
      });
    } else if (e.target.id == "request") {
      if (
        this.props.company &&
        new Date(
          new Date(this.props.company.window_close_from).setHours(0, 0, 0)
        ).getTime() <= new Date().getTime() &&
        new Date().getTime() <=
          new Date(
            new Date(this.props.company.window_close_to).setHours(23, 59, 59)
          ).getTime()
      ) {
        swal(
          "Info",
          "Trading window will be closed from " +
            this.getDate(this.props.company.window_close_from) +
            " to " +
            this.getDate(this.props.company.window_close_to),
          "info"
        );
      } else {
        this.props.history.push({
          pathname: "/request",
          state: "compare",
        });
      }
    } else if (e.target.id == "insiderExcel") {
      this.props.GetInsidersexcel(null, this.props.user.accessToken);
      this.setState({ downloadInsiderExelFlag: true });
    } else {
      this.props.history.push({
        pathname: "/view",
      });
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

  get15Date = () => {
    var d = new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000);
    var day = d.getDate();
    if (day.toString().length == 1) day = "0" + day;
    var month = d.getMonth() + 1;
    if (month.toString().length == 1) month = "0" + month;
    var Year = d.getFullYear();
    this.setState({ day15: Year + "-" + month + "-" + day });
  };

  render() {
    console.log(this.state);
    console.log(this.props);

    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          "overflow-x": "auto",
          "overflow-y": "auto",
        }}
      >
        <TopNav />
        <UploadDocument
          state={this.state}
          handleUpload={this.handleUpload}
          handleUploadDate={this.handleUploadDate}
          handleSubmit={this.handleSubmit}
          resetValue={this.resetValue}
        />
        {this.props.user &&
        this.props.user.is_compliance &&
        !this.props.userData.userDetails.isManagement ? (
          <div className="dashboard" style={{ marginTop: "60px" }}>
            <div class="row dashboard-row-client" style={{ marginTop: 40 }}>
              <div className="col s4 m4 l4">
                <div
                  class="card dashboard-card"
                  id="request"
                  onClick={this.onclick}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div class="card-image dashboard-card-image" id="request">
                    <img
                      id="request"
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iNzcuOTM3NSIgeTE9Ijg0LjY1NjI1IiB4Mj0iNzcuOTM3NSIgeTI9IjEwMy40Njg3NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xXzQ4MTU5X2dyMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc3LjkzNzUiIHkxPSIxOS4yNjEzMSIgeDI9Ijc3LjkzNzUiIHkyPSIxNTYuMzQ4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfNDgxNTlfZ3IyIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTIzLjYyNSIgeTE9IjE5LjI2MTMxIiB4Mj0iMTIzLjYyNSIgeTI9IjE1Ni4zNDgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItM180ODE1OV9ncjMiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I1NWUwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2I1NWUwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4OC42ODc1IiB5MT0iMTkuMjYxMzEiIHgyPSI4OC42ODc1IiB5Mj0iMTU2LjM0OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci00XzQ4MTU5X2dyNCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYjU1ZTAwIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYjU1ZTAwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSIiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGc+PHBhdGggZD0iTTg2LDk5LjQzNzVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NWgtMTAuNzVjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NXYtMTAuNzVjMCwtMS40ODM1IDEuMjA0LC0yLjY4NzUgMi42ODc1LC0yLjY4NzVoMTAuNzVjMS40ODM1LDAgMi42ODc1LDEuMjA0IDIuNjg3NSwyLjY4NzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTFfNDgxNTlfZ3IxKSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjksOTEuMzc1aC0xMC43NWMtMi45NjQzMSwwIC01LjM3NSwyLjQxMDY5IC01LjM3NSw1LjM3NXYzMi4yNWgtNjkuODc1di02OS44NzVoMzIuMjVjMi45NjQzMSwwIDUuMzc1LC0yLjQxMDY5IDUuMzc1LC01LjM3NXYtMTAuNzVjMCwtMi45NjQzMSAtMi40MTA2OSwtNS4zNzUgLTUuMzc1LC01LjM3NWgtNDAuMzEyNWMtNy40MDk0NCwwIC0xMy40Mzc1LDYuMDI4MDYgLTEzLjQzNzUsMTMuNDM3NXY4NmMwLDcuNDA5NDQgNi4wMjgwNiwxMy40Mzc1IDEzLjQzNzUsMTMuNDM3NWg4NmM3LjQwOTQ0LDAgMTMuNDM3NSwtNi4wMjgwNiAxMy40Mzc1LC0xMy40Mzc1di00MC4zMTI1YzAsLTIuOTY0MzEgLTIuNDEwNjksLTUuMzc1IC01LjM3NSwtNS4zNzV6TTEyOSwxMzcuMDYyNWMwLDQuNDQ1MTMgLTMuNjE3MzcsOC4wNjI1IC04LjA2MjUsOC4wNjI1aC04NmMtNC40NDUxMiwwIC04LjA2MjUsLTMuNjE3MzggLTguMDYyNSwtOC4wNjI1di04NmMwLC00LjQ0NTEzIDMuNjE3MzgsLTguMDYyNSA4LjA2MjUsLTguMDYyNWg0MC4zMTI1djEwLjc1aC0zMi4yNWMtMi45NjQzMSwwIC01LjM3NSwyLjQxMDY5IC01LjM3NSw1LjM3NXY2OS44NzVjMCwyLjk2NDMxIDIuNDEwNjksNS4zNzUgNS4zNzUsNS4zNzVoNjkuODc1YzIuOTY0MzEsMCA1LjM3NSwtMi40MTA2OSA1LjM3NSwtNS4zNzV2LTMyLjI1aDEwLjc1eiIgZmlsbD0idXJsKCNjb2xvci0yXzQ4MTU5X2dyMikiPjwvcGF0aD48cGF0aCBkPSJNMTM3LjA2MjUsMjEuNWgtMzQuOTM3NWMtMi45NjQzMSwwIC01LjM3NSwyLjQxMDY5IC01LjM3NSw1LjM3NXYxMC43NWMwLDIuOTY0MzEgMi40MTA2OSw1LjM3NSA1LjM3NSw1LjM3NWgyNi44NzV2MjYuODc1YzAsMi45NjQzMSAyLjQxMDY5LDUuMzc1IDUuMzc1LDUuMzc1aDEwLjc1YzIuOTY0MzEsMCA1LjM3NSwtMi40MTA2OSA1LjM3NSwtNS4zNzV2LTM0LjkzNzVjMCwtNy40MDk0NCAtNi4wMjgwNiwtMTMuNDM3NSAtMTMuNDM3NSwtMTMuNDM3NXpNMTQ1LjEyNSw2OS44NzVoLTEwLjc1di0yNi44NzVjMCwtMi45NjQzMSAtMi40MTA2OSwtNS4zNzUgLTUuMzc1LC01LjM3NWgtMjYuODc1di0xMC43NWgzNC45Mzc1YzQuNDQ1MTMsMCA4LjA2MjUsMy42MTczOCA4LjA2MjUsOC4wNjI1eiIgZmlsbD0idXJsKCNjb2xvci0zXzQ4MTU5X2dyMykiPjwvcGF0aD48cGF0aCBkPSJNOTEuMzc1LDc1LjI1aC0yNi44NzVjLTIuOTY0MzEsMCAtNS4zNzUsMi40MTA2OSAtNS4zNzUsNS4zNzV2MjYuODc1YzAsMi45NjQzMSAyLjQxMDY5LDUuMzc1IDUuMzc1LDUuMzc1aDI2Ljg3NWMyLjk2NDMxLDAgNS4zNzUsLTIuNDEwNjkgNS4zNzUsLTUuMzc1di0yNi44NzVjMCwtMC40NzgzNyAtMC4wODMzMSwtMC45MzI1NiAtMC4yMDE1NiwtMS4zNzMzMWwxNi4zMjY1NiwtMTYuMzI2NTZ2MTcuNjk5ODhoNS4zNzV2LTIxLjVjMCwtMi45NjQzMSAtMi40MTA2OSwtNS4zNzUgLTUuMzc1LC01LjM3NWgtMjEuNXY1LjM3NWgxNy42OTk4OGwtMTYuMzI2NTYsMTYuMzIzODhjLTAuNDQwNzUsLTAuMTE1NTYgLTAuODk0OTQsLTAuMTk4ODcgLTEuMzczMzEsLTAuMTk4ODd6TTkxLjM3NSwxMDcuNWgtMjYuODc1di0yNi44NzVoMjYuODc1eiIgZmlsbD0idXJsKCNjb2xvci00XzQ4MTU5X2dyNCkiPjwvcGF0aD48L2c+PHBhdGggZD0iIiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      style={{ marginLeft: "60px" }}
                      onClick={this.onclick}
                    />
                  </div>
                  <div
                    id="request"
                    class="btn-flat dashboard-card-action"
                    onClick={this.onclick}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="request"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500 }}
                      >
                        Requests
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col s4 m4 l4">
                <div
                  class="card dashboard-card"
                  id="upsi"
                  onClick={this.onclick}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div
                    class="card-image dashboard-card-image"
                    id="upsi"
                    onClick={this.onclick}
                  >
                    <img
                      id="upsi"
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMTIuODc1IiB5MT0iNDkuMzgyODEiIHgyPSIxMTIuODc1IiB5Mj0iNzUuOTIxODgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMV80NDA0Nl9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjE3LjEzMjgxIiB4Mj0iODYiIHkyPSIxNTUuNTIyOTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMl80NDA0Nl9ncjIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIxMTIuODc1IiB5MT0iMTcuMTMyODEiIHgyPSIxMTIuODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfNDQwNDZfZ3IzIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNDAuMzEyNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNDAuMzEyNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci00XzQ0MDQ2X2dyNCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjQwLjMxMjUiIHkxPSIxNy4xMzI4MSIgeDI9IjQwLjMxMjUiIHkyPSIxNTUuNTIyOTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNV80NDA0Nl9ncjUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI0MC4zMTI1IiB5MT0iMTcuMTMyODEiIHgyPSI0MC4zMTI1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTZfNDQwNDZfZ3I2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjAuNDY4NzUiIHkxPSIxNy4xMzI4MSIgeDI9IjYwLjQ2ODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTdfNDQwNDZfZ3I3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjQuNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNjQuNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci04XzQ0MDQ2X2dyOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc2LjU5Mzc1IiB5MT0iMTcuMTMyODEiIHgyPSI3Ni41OTM3NSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci05XzQ0MDQ2X2dyOSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc2LjU5Mzc1IiB5MT0iMTcuMTMyODEiIHgyPSI3Ni41OTM3NSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xMF80NDA0Nl9ncjEwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjQuNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNjQuNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xMV80NDA0Nl9ncjExIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjAuNDY4NzUiIHkxPSIxNy4xMzI4MSIgeDI9IjYwLjQ2ODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTEyXzQ0MDQ2X2dyMTIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iPjxwYXRoIGQ9Ik0xMTIuODc1LDUxLjA2MjVjLTUuOTM3MDYsMCAtMTAuNzUsNC44MTI5NCAtMTAuNzUsMTAuNzVjMCw1LjkzNzA2IDQuODEyOTQsMTAuNzUgMTAuNzUsMTAuNzVjNS45MzcwNiwwIDEwLjc1LC00LjgxMjk0IDEwLjc1LC0xMC43NWMwLC01LjkzNzA2IC00LjgxMjk0LC0xMC43NSAtMTAuNzUsLTEwLjc1eiIgZmlsbD0idXJsKCNjb2xvci0xXzQ0MDQ2X2dyMSkiPjwvcGF0aD48cGF0aCBkPSJNMTQ3LjgxMjUsNTMuNzVoLTMuNzQzNjljLTAuNzY4NjMsLTIuODUxNDQgLTIuMDEyOTQsLTUuNTg0NjIgLTMuNTkwNSwtOC4xNDA0NGwyLjgwMDM4LC0yLjgwMzA2YzMuMTQ0MzcsLTMuMTQ0MzcgMy4xNDQzNywtOC4yNTYgMCwtMTEuNDAwMzdjLTMuMTQ0MzgsLTMuMTQ0MzggLTguMjU2LC0zLjE0NDM3IC0xMS40MDAzNywwbC0yLjgzOCwyLjgzOGMtMi41MzQzMSwtMS41NTA2OSAtNS4yNTY3NSwtMi43ODQyNSAtOC4xMDI4MSwtMy41OTA1di0zLjc3ODYzYzAsLTQuNDQ1MTMgLTMuNjE3MzcsLTguMDYyNSAtOC4wNjI1LC04LjA2MjVjLTQuNDQ1MTMsMCAtOC4wNjI1LDMuNjE3MzcgLTguMDYyNSw4LjA2MjV2My43Nzg2M2MtMi44NDYwNiwwLjgwNjI1IC01LjU2ODUsMi4wMzk4MSAtOC4xMDI4MSwzLjU5MDVsLTIuODM4LC0yLjgzOGMtMy4xNDQzNywtMy4xNDQzNyAtOC4yNTYsLTMuMTQ0MzcgLTExLjQwMDM3LDBjLTEuNzAzODcsMS43MDM4OCAtMi40NTEsMy45ODI4NyAtMi4zMDg1Niw2LjIxNjE5aC01NS45NzUyNWMtNC40NDUxMywwIC04LjA2MjUsMy42MTczOCAtOC4wNjI1LDguMDYyNXY5MS4zNzVjMCwzLjQ5OTEzIDIuMjUyMTIsNi40NTUzOCA1LjM3NSw3LjU2OHYzLjE4NDY5YzAsMi45NjQzMSAyLjQxMDY5LDUuMzc1IDUuMzc1LDUuMzc1aDc3LjkzNzVjMi45NjQzMSwwIDUuMzc1LC0yLjQxMDY5IDUuMzc1LC01LjM3NXYtMy4xODJjMy4xMjI4NywtMS4xMTI2MyA1LjM3NSwtNC4wNjg4OCA1LjM3NSwtNy41Njh2LTMyLjc0NDVjMy4xMjI4NywtMS4xMTI2MyA1LjM3NSwtNC4wNjg4OCA1LjM3NSwtNy41Njh2LTMuNzc4NjJjMi44NDYwNiwtMC44MDYyNSA1LjU2ODUsLTIuMDM5ODEgOC4xMDI4MSwtMy41OTA1bDIuODM4LDIuODM4YzEuNTcyMTksMS41NzIxOSAzLjYzNjE5LDIuMzU2OTQgNS43MDAxOSwyLjM1Njk0YzIuMDY0LDAgNC4xMjgsLTAuNzg0NzUgNS43MDAxOSwtMi4zNTY5NGMzLjE0NDM3LC0zLjE0NDM3IDMuMTQ0MzcsLTguMjU2IDAsLTExLjQwMDM3bC0yLjgwMDM4LC0yLjgwMzA2YzEuNTgwMjUsLTIuNTU1ODEgMi44MjQ1NiwtNS4yODkgMy41OTA1LC04LjE0MDQ0aDMuNzQzNjljNC40NDUxMiwwIDguMDYyNSwtMy42MTczNyA4LjA2MjUsLTguMDYyNWMwLC00LjQ0NTEyIC0zLjYxNzM3LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1ek0xMzUuNjc4NDQsMzUuMjA4OTRjMS4wMTg1NiwtMS4wMTMxOSAyLjc4MTU2LC0xLjAxMzE5IDMuODAwMTMsMGMwLjUwNTI1LDAuNTA3OTQgMC43ODc0NCwxLjE4MjUgMC43ODc0NCwxLjkwMDA2YzAsMC43MTc1NiAtMC4yNzk1LDEuMzkyMTMgLTAuNzg3NDQsMS45MDAwNmwtMi4yNDY3NSwyLjI0Njc1Yy0xLjE3MTc1LC0xLjM1NDUgLTIuNDQyOTQsLTIuNjIwMzEgLTMuODEzNTYsLTMuNzg2Njl6TTg2LjI3MTQ0LDM1LjIwODk0YzEuMDE4NTYsLTEuMDEzMTkgMi43ODE1NiwtMS4wMTMxOSAzLjgwMDEzLDBsMi4yNjI4NywyLjI2MDE5Yy0xLjM3MDYyLDEuMTY2MzggLTIuNjQxODEsMi40MzIxOSAtMy44MTM1NiwzLjc4NjY5bC0yLjI0Njc1LC0yLjI0Njc1Yy0wLjUwNTI1LC0wLjUwNzk0IC0wLjc4NzQ0LC0xLjE4MjUgLTAuNzg3NDQsLTEuOTAwMDZjMCwtMC43MTc1NiAwLjI3NjgxLC0xLjM5MjEzIDAuNzg0NzUsLTEuOTAwMDZ6TTI2Ljg3NSwxNDcuODEyNXYtMi42ODc1aDc3LjkzNzV2Mi42ODc1ek0xMDcuNSwxMzkuNzVoLTgzLjMxMjVjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NXYtOTEuMzc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1aDU4LjQ3NDYzbDIuNjA5NTYsMi42MDk1NmMtMS41ODAyNSwyLjU1NTgxIC0yLjgyNDU2LDUuMjg2MzEgLTMuNTkzMTksOC4xNDA0NGgtMy43NDFjLTQuNDQ1MTMsMCAtOC4wNjI1LDMuNjE3MzggLTguMDYyNSw4LjA2MjVjMCw0LjQ0NTEzIDMuNjE3MzcsOC4wNjI1IDguMDYyNSw4LjA2MjVoMy43NDM2OWMwLjc2ODYzLDIuODUxNDQgMi4wMTI5NCw1LjU4NDYzIDMuNTkzMTksOC4xNDA0NGwtMi44MDMwNiwyLjgwMzA2Yy0zLjE0NDM3LDMuMTQ0MzcgLTMuMTQ0MzcsOC4yNTYgMCwxMS40MDAzN2MxLjU3MjE5LDEuNTcyMTkgMy42MzYxOSwyLjM1Njk0IDUuNzAwMTksMi4zNTY5NGMyLjA2NCwwIDQuMTI4LC0wLjc4NDc1IDUuNzAwMTksLTIuMzU2OTRsMi44MzgsLTIuODM4YzIuNTM0MzEsMS41NTA2OSA1LjI1Njc1LDIuNzg0MjUgOC4xMDI4MSwzLjU5MDV2My43Nzg2MmMwLDMuNDk5MTIgMi4yNTIxMyw2LjQ1NTM4IDUuMzc1LDcuNTY4djMyLjc0NDVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXpNODYuMjcxNDQsODQuNjE1OTRsMi4yNDY3NSwtMi4yNDY3NWMxLjE3MTc1LDEuMzU0NSAyLjQ0Mjk0LDIuNjIwMzEgMy44MTM1NiwzLjc4NjY5bC0yLjI2Mjg3LDIuMjYwMTljLTEuMDE4NTYsMS4wMTMxOSAtMi43ODE1NiwxLjAxMzE5IC0zLjgwMDEzLDBjLTAuNTA1MjUsLTAuNTA3OTQgLTAuNzg3NDQsLTEuMTgyNSAtMC43ODc0NCwtMS45MDAwNmMwLC0wLjcxNzU2IDAuMjgyMTksLTEuMzg5NDQgMC43OTAxMywtMS45MDAwNnpNMTM5LjQ3ODU2LDg0LjYxNTk0YzAuNTA1MjUsMC41MDc5NCAwLjc4NzQ0LDEuMTgyNSAwLjc4NzQ0LDEuOTAwMDZjMCwwLjcxNzU2IC0wLjI3OTUsMS4zOTIxMiAtMC43ODc0NCwxLjkwMDA2Yy0xLjAxODU2LDEuMDEzMTkgLTIuNzgxNTYsMS4wMTMxOSAtMy44MDAxMywwbC0yLjI2Mjg4LC0yLjI2MDE5YzEuMzcwNjIsLTEuMTY2MzggMi42NDE4MSwtMi40MzIxOSAzLjgxMzU2LC0zLjc4NjY5ek0xNDcuODEyNSw2NC41aC04LjEyNDMxbC0wLjQwMzEzLDIuMjAxMDZjLTEuODYyNDQsMTAuMTI5MTkgLTExLjEzOTY5LDE5LjM4NDk0IC0yMS41NzI1NiwyMS41Mjk1NmwtMi4xNSwwLjQ0MDc1djguMDc4NjNjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1di04LjA3ODYzbC0yLjE0NzMxLC0wLjQ0MDc1Yy0xMC40MzU1NiwtMi4xNDQ2MyAtMTkuNzEwMTIsLTExLjQwMDM3IC0yMS41NzI1NiwtMjEuNTI5NTZsLTAuNDA1ODEsLTIuMjAxMDZoLTguMTI0MzFjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NWMwLC0xLjQ4MzUgMS4yMDQsLTIuNjg3NSAyLjY4NzUsLTIuNjg3NWg4LjEyNDMxbDAuNDAzMTMsLTIuMjAxMDZjMS44NjI0NCwtMTAuMTI5MTkgMTEuMTM5NjksLTE5LjM4NDk0IDIxLjU3MjU2LC0yMS41Mjk1NmwyLjE1LC0wLjQ0MDc1di04LjA3ODYzYzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1djguMDc4NjNsMi4xNDczMSwwLjQ0MDc1YzEwLjQzNTU2LDIuMTQ0NjMgMTkuNzEwMTIsMTEuNDAwMzggMjEuNTcyNTYsMjEuNTI5NTZsMC40MDU4MSwyLjIwMTA2aDguMTI0MzFjMS40ODM1LDAgMi42ODc1LDEuMjA0IDIuNjg3NSwyLjY4NzVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItMl80NDA0Nl9ncjIpIj48L3BhdGg+PHBhdGggZD0iTTExMi44NzUsNDAuMzEyNWMtMTEuODU0NTYsMCAtMjEuNSw5LjY0NTQ0IC0yMS41LDIxLjVjMCwxMS44NTQ1NiA5LjY0NTQ0LDIxLjUgMjEuNSwyMS41YzExLjg1NDU2LDAgMjEuNSwtOS42NDU0NCAyMS41LC0yMS41YzAsLTExLjg1NDU2IC05LjY0NTQ0LC0yMS41IC0yMS41LC0yMS41ek0xMTIuODc1LDc3LjkzNzVjLTguODkyOTQsMCAtMTYuMTI1LC03LjIzMjA2IC0xNi4xMjUsLTE2LjEyNWMwLC04Ljg5Mjk0IDcuMjMyMDYsLTE2LjEyNSAxNi4xMjUsLTE2LjEyNWM4Ljg5Mjk0LDAgMTYuMTI1LDcuMjMyMDYgMTYuMTI1LDE2LjEyNWMwLDguODkyOTQgLTcuMjMyMDYsMTYuMTI1IC0xNi4xMjUsMTYuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0zXzQ0MDQ2X2dyMykiPjwvcGF0aD48cGF0aCBkPSJNNDAuMzEyNSw4My4zMTI1Yy00LjQ0NTEyLDAgLTguMDYyNSwzLjYxNzM4IC04LjA2MjUsOC4wNjI1YzAsNC40NDUxMiAzLjYxNzM4LDguMDYyNSA4LjA2MjUsOC4wNjI1YzQuNDQ1MTIsMCA4LjA2MjUsLTMuNjE3MzggOC4wNjI1LC04LjA2MjVjMCwtNC40NDUxMiAtMy42MTczOCwtOC4wNjI1IC04LjA2MjUsLTguMDYyNXpNNDAuMzEyNSw5NC4wNjI1Yy0xLjQ4MzUsMCAtMi42ODc1LC0xLjIwNCAtMi42ODc1LC0yLjY4NzVjMCwtMS40ODM1IDEuMjA0LC0yLjY4NzUgMi42ODc1LC0yLjY4NzVjMS40ODM1LDAgMi42ODc1LDEuMjA0IDIuNjg3NSwyLjY4NzVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItNF80NDA0Nl9ncjQpIj48L3BhdGg+PHBhdGggZD0iTTQwLjMxMjUsNjEuODEyNWMtNC40NDUxMiwwIC04LjA2MjUsMy42MTczNyAtOC4wNjI1LDguMDYyNWMwLDQuNDQ1MTMgMy42MTczOCw4LjA2MjUgOC4wNjI1LDguMDYyNWM0LjQ0NTEyLDAgOC4wNjI1LC0zLjYxNzM3IDguMDYyNSwtOC4wNjI1YzAsLTQuNDQ1MTMgLTMuNjE3MzgsLTguMDYyNSAtOC4wNjI1LC04LjA2MjV6TTQwLjMxMjUsNzIuNTYyNWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1YzAsMS40ODM1IC0xLjIwNCwyLjY4NzUgLTIuNjg3NSwyLjY4NzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTVfNDQwNDZfZ3I1KSI+PC9wYXRoPjxwYXRoIGQ9Ik00MC4zMTI1LDEwNC44MTI1Yy00LjQ0NTEyLDAgLTguMDYyNSwzLjYxNzM4IC04LjA2MjUsOC4wNjI1YzAsNC40NDUxMiAzLjYxNzM4LDguMDYyNSA4LjA2MjUsOC4wNjI1YzQuNDQ1MTIsMCA4LjA2MjUsLTMuNjE3MzggOC4wNjI1LC04LjA2MjVjMCwtNC40NDUxMiAtMy42MTczOCwtOC4wNjI1IC04LjA2MjUsLTguMDYyNXpNNDAuMzEyNSwxMTUuNTYyNWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1YzAsMS40ODM1IC0xLjIwNCwyLjY4NzUgLTIuNjg3NSwyLjY4NzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTZfNDQwNDZfZ3I2KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw3Mi41NjI1aDEzLjQzNzV2NS4zNzVoLTEzLjQzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTdfNDQwNDZfZ3I3KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw5NC4wNjI1aDIxLjV2NS4zNzVoLTIxLjV6IiBmaWxsPSJ1cmwoI2NvbG9yLThfNDQwNDZfZ3I4KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSwxMTUuNTYyNWg0NS42ODc1djUuMzc1aC00NS42ODc1eiIgZmlsbD0idXJsKCNjb2xvci05XzQ0MDQ2X2dyOSkiPjwvcGF0aD48cGF0aCBkPSJNNTMuNzUsMTA0LjgxMjVoNDUuNjg3NXY1LjM3NWgtNDUuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItMTBfNDQwNDZfZ3IxMCkiPjwvcGF0aD48cGF0aCBkPSJNNTMuNzUsODMuMzEyNWgyMS41djUuMzc1aC0yMS41eiIgZmlsbD0idXJsKCNjb2xvci0xMV80NDA0Nl9ncjExKSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw2NC41aDEzLjQzNzV2NS4zNzVoLTEzLjQzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTEyXzQ0MDQ2X2dyMTIpIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      style={{ marginLeft: "60px" }}
                      onClick={this.onclick}
                    />
                  </div>
                  <div
                    id="upsi"
                    class="btn-flat dashboard-card-action"
                    onClick={this.onclick}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="upsi"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500, margin: 8 }}
                      >
                        UPSI
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col s4 m4 l4">
                <div
                  class="card dashboard-card"
                  id="cp"
                  onClick={this.onclick}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div
                    class="card-image dashboard-card-image"
                    id="cp"
                    onClick={this.onclick}
                  >
                    <img
                      id="cp"
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjI2LjAxNzY5IiB4Mj0iODYiIHkyPSIxNTEuNjY2MzciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMV9rdTgwdC1ybzZ3ZXdfZ3IxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNTcuNTQ0NzUiIHkxPSI0Ny45NzQ1NiIgeDI9IjU3LjU0NDc1IiB5Mj0iMTIyLjA4MjM4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfa3U4MHQtcm82d2V3X2dyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc5LjIzNTU2IiB5MT0iNDcuOTc0NTYiIHgyPSI3OS4yMzU1NiIgeTI9IjEyMi4wODIzOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0zX2t1ODB0LXJvNndld19ncjMiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIxMDYuMTU2MjUiIHkxPSI0Ny45NzQ1NiIgeDI9IjEwNi4xNTYyNSIgeTI9IjEyMi4wODIzOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci00X2t1ODB0LXJvNndld19ncjQiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjQ3Ljk3NDU2IiB4Mj0iODYiIHkyPSIxMjIuMDgyMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNV9rdTgwdC1ybzZ3ZXdfZ3I1Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnPjxwYXRoIGQ9Ik0xMzcuMDYyNSwxNTAuNWgtMTAyLjEyNWMtNy40MDk0NCwwIC0xMy40Mzc1LC02LjAyODA2IC0xMy40Mzc1LC0xMy40Mzc1di0xMDIuMTI1YzAsLTcuNDA5NDQgNi4wMjgwNiwtMTMuNDM3NSAxMy40Mzc1LC0xMy40Mzc1aDEwMi4xMjVjNy40MDk0NCwwIDEzLjQzNzUsNi4wMjgwNiAxMy40Mzc1LDEzLjQzNzV2MTAyLjEyNWMwLDcuNDA5NDQgLTYuMDI4MDYsMTMuNDM3NSAtMTMuNDM3NSwxMy40Mzc1ek0zNC45Mzc1LDI2Ljg3NWMtNC40NDUxMywwIC04LjA2MjUsMy42MTczNyAtOC4wNjI1LDguMDYyNXYxMDIuMTI1YzAsNC40NDUxMiAzLjYxNzM3LDguMDYyNSA4LjA2MjUsOC4wNjI1aDEwMi4xMjVjNC40NDUxMiwwIDguMDYyNSwtMy42MTczOCA4LjA2MjUsLTguMDYyNXYtMTAyLjEyNWMwLC00LjQ0NTEzIC0zLjYxNzM4LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1eiIgZmlsbD0idXJsKCNjb2xvci0xX2t1ODB0LXJvNndld19ncjEpIj48L3BhdGg+PGc+PGNpcmNsZSBjeD0iMjEuNDEyIiBjeT0iMjAuNSIgdHJhbnNmb3JtPSJzY2FsZSgyLjY4NzUsMi42ODc1KSIgcj0iMi41IiBmaWxsPSJ1cmwoI2NvbG9yLTJfa3U4MHQtcm82d2V3X2dyMikiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI5LjQ4MyIgY3k9IjIwLjUyOSIgdHJhbnNmb3JtPSJzY2FsZSgyLjY4NzUsMi42ODc1KSIgcj0iMy41IiBmaWxsPSJ1cmwoI2NvbG9yLTNfa3U4MHQtcm82d2V3X2dyMykiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjM5LjUiIGN5PSIyMS41IiB0cmFuc2Zvcm09InNjYWxlKDIuNjg3NSwyLjY4NzUpIiByPSI0LjUiIGZpbGw9InVybCgjY29sb3ItNF9rdTgwdC1ybzZ3ZXdfZ3I0KSI+PC9jaXJjbGU+PHBhdGggZD0iTTEwOC42ODI1LDc1LjcyMDMxYy01Ljc1Mzk0LC0wLjY5ODc1IC0xMS4wODU5NCwxLjA0ODEyIC0xNS4xNDQwNiw0LjMxNjEyYy0xLjU1MzM4LC01Ljc3ODEyIC02LjcxNjA2LC0xMC4wNTEyNSAtMTIuOTEzNDQsLTEwLjA1MTI1Yy00LjY2MDEzLDAgLTguNzYxMjUsMi40MDUzMSAtMTEuMTcxOTQsNi4wNTQ5NGMtMS4zNDEwNiwtNC45MjYxOSAtNi4wMzYxMiwtOC41ODM4OCAtMTEuNjcxODEsLTguNTgzODhjLTYuNjc4NDQsMCAtMTIuMDkzNzUsNS4xMTE2MyAtMTIuMDkzNzUsMTEuNDIxODh2MjAuNTU5MzhoMjEuNXYxMy40Mzc1aDE4LjgxMjV2MTYuMTI1aDQwLjMxMjV2LTMyLjUxMDY5YzAsLTEwLjMwMzg3IC03LjQwMTM3LC0xOS41MjQ2OSAtMTcuNjMsLTIwLjc2OXoiIGZpbGw9InVybCgjY29sb3ItNV9rdTgwdC1ybzZ3ZXdfZ3I1KSI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg=="
                      style={{ marginLeft: "60px" }}
                      onClick={this.onclick}
                    />
                  </div>
                  <div
                    id="cp"
                    class="btn-flat dashboard-card-action"
                    onClick={this.onclick}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="cp"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500 }}
                      >
                        CP/ DP Management
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col s4 m4 l4">
                <div
                  class="card dashboard-card"
                  id="other"
                  onClick={this.onclick}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div
                    class="card-image dashboard-card-image"
                    id="other"
                    onClick={this.onclick}
                  >
                    <img
                      id="other"
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1Ni40Mzc1IiB5MT0iMjcuNzY5OTQiIHgyPSI1Ni40Mzc1IiB5Mj0iMTQzLjIzNTY5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTFfNTIxNTdfZ3IxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTIzLjYyNSIgeTE9IjY0LjUiIHgyPSIxMjMuNjI1IiB5Mj0iOTEuMzc1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfNTIxNTdfZ3IyIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmNjk1M2UiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmNjk1M2UiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTAyLjEyNSIgeTE9IjEyNy45OTIxOSIgeDI9IjEwMi4xMjUiIHkyPSIxNDUuNDkwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0zXzUyMTU3X2dyMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjY5NTNlIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjY5NTNlIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjEyOSIgeTE9IjQxLjIwNzQ0IiB4Mj0iMTI5IiB5Mj0iMTU2LjY3MzE5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTRfNTIxNTdfZ3I0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTI5IiB5MT0iNDEuMjA3NDQiIHgyPSIxMjkiIHkyPSIxNTYuNjczMTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNV81MjE1N19ncjUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2JiNWQwOSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2JiNWQwOSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI5NC4wNjI1IiB5MT0iNDEuMjA3NDQiIHgyPSI5NC4wNjI1IiB5Mj0iMTU2LjY3MzE5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTZfNTIxNTdfZ3I2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiYjVkMDkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnPjxwYXRoIGQ9Ik01MS4wNjI1LDY3LjE4NzVoMTAuNzV2NS4zNzVoLTEwLjc1eiIgZmlsbD0idXJsKCNjb2xvci0xXzUyMTU3X2dyMSkiPjwvcGF0aD48cGF0aCBkPSJNMTQyLjQzNzUsODMuMzEyNWMwLDQuNDQ1MTIgMy42MTczOCw4LjA2MjUgOC4wNjI1LDguMDYyNWM0LjQ0NTEyLDAgOC4wNjI1LC0zLjYxNzM4IDguMDYyNSwtOC4wNjI1di0xMC43NWMwLC00LjQ0NTEzIC0zLjYxNzM4LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1aC01MS4wNjI1Yy01LjkyODYzLDAgLTEwLjc1LDQuODIxMzggLTEwLjc1LDEwLjc1YzAsNS45Mjg2MiA0LjgyMTM3LDEwLjc1IDEwLjc1LDEwLjc1YzUuOTI4NjMsMCAxMC43NSwtNC44MjEzOCAxMC43NSwtMTAuNzVjMCwtMS45NjcyNSAtMC41Njk3NSwtMy43ODY2OSAtMS40OTQyNSwtNS4zNzVoMzMuNzQ0MjV6TTE1MC41LDY5Ljg3NWMxLjQ4MzUsMCAyLjY4NzUsMS4yMDQgMi42ODc1LDIuNjg3NXYxMC43NWMwLDEuNDgzNSAtMS4yMDQsMi42ODc1IC0yLjY4NzUsMi42ODc1Yy0xLjQ4MzUsMCAtMi42ODc1LC0xLjIwNCAtMi42ODc1LC0yLjY4NzV2LTEzLjQzNzV6TTEwNC44MTI1LDc1LjI1YzAsMi45NjQzMSAtMi40MTA2OSw1LjM3NSAtNS4zNzUsNS4zNzVjLTIuOTY0MzEsMCAtNS4zNzUsLTIuNDEwNjkgLTUuMzc1LC01LjM3NWMwLC0yLjk2NDMxIDIuNDEwNjksLTUuMzc1IDUuMzc1LC01LjM3NWMyLjk2NDMxLDAgNS4zNzUsMi40MTA2OSA1LjM3NSw1LjM3NXoiIGZpbGw9InVybCgjY29sb3ItMl81MjE1N19ncjIpIj48L3BhdGg+PHBhdGggZD0iTTk5LjQzNzUsMTI5aDUuMzc1djE2LjEyNWgtNS4zNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTNfNTIxNTdfZ3IzKSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjAuOTM3NSw5MS4zNzVoMTYuMTI1djUuMzc1aC0xNi4xMjV6IiBmaWxsPSJ1cmwoI2NvbG9yLTRfNTIxNTdfZ3I0KSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjAuOTM3NSw4MC42MjVoMTYuMTI1djUuMzc1aC0xNi4xMjV6IiBmaWxsPSJ1cmwoI2NvbG9yLTVfNTIxNTdfZ3I1KSI+PC9wYXRoPjxwYXRoIGQ9Ik0xNDIuNDM3NSw5Ni43NXY1LjM3NWgtNjkuODc1di00M2MwLC00LjEzMzM4IC0xLjU3NDg3LC03Ljg5MzE5IC00LjE0MTQ0LC0xMC43NWg2NS45NTM5NGM0LjQ1MzE5LDAgOC4wNjI1LDMuNjA5MzEgOC4wNjI1LDguMDYyNXYyLjY4NzVoNS4zNzV2LTIuNjg3NWMwLC03LjQyMDE5IC02LjAxNzMxLC0xMy40Mzc1IC0xMy40Mzc1LC0xMy40Mzc1aC03Ny45Mzc1Yy04LjkwNjM3LDAgLTE2LjEyNSw3LjIxODYzIC0xNi4xMjUsMTYuMTI1djUxLjA2MjVjMCw0LjQ1MzE5IDMuNjA5MzEsOC4wNjI1IDguMDYyNSw4LjA2MjVoMjEuNWgxMy40Mzc1djUuMzc1YzAsMi45NjQzMSAyLjQxMDY5LDUuMzc1IDUuMzc1LDUuMzc1djIxLjVoLTI2Ljg3NXY1LjM3NWg2NC41di01LjM3NWgtMTAuNzV2LTIxLjVjMi45NjQzMSwwIDUuMzc1LC0yLjQxMDY5IDUuMzc1LC01LjM3NXYtNS4zNzVoMTguODEyNWM0LjQ1MzE5LDAgOC4wNjI1LC0zLjYwOTMxIDguMDYyNSwtOC4wNjI1di0xMy40Mzc1ek02Ny4xODc1LDExMi44NzVoLTE4LjgxMjVjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NXYtNTAuNTg2ODFjMCwtNS42MTE1IDQuMDkzMDYsLTEwLjYzMTc1IDkuNjc3NjksLTExLjE3NDYzYzYuNDA5NjksLTAuNjIzNSAxMS44MjIzMSw0LjQxNTU2IDExLjgyMjMxLDEwLjY5ODk0ek0xMTAuMTg3NSwxNTAuNWgtMTYuMTI1di0yMS41aDE2LjEyNXpNMTE1LjU2MjUsMTIzLjYyNWgtMjYuODc1di01LjM3NWgyNi44NzV6TTE0Mi40Mzc1LDExMC4xODc1YzAsMS40ODM1IC0xLjIwNCwyLjY4NzUgLTIuNjg3NSwyLjY4NzVoLTY3LjE4NzV2LTUuMzc1aDY5Ljg3NXoiIGZpbGw9InVybCgjY29sb3ItNl81MjE1N19ncjYpIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      style={{ marginLeft: "60px" }}
                      onClick={this.onclick}
                    />
                  </div>
                  <div
                    id="other"
                    class="btn-flat dashboard-card-action"
                    onClick={this.onclick}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="other"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500 }}
                      >
                        Bulk Mail
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col s4 m4 l4">
                <div
                  class="card dashboard-card"
                  id="conversation"
                  onClick={this.onclick}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div
                    class="card-image dashboard-card-image"
                    id="conversation"
                    onClick={this.onclick}
                  >
                    <img
                      id="conversation"
                      alt="svgImg"
                      src="data:image/png;base64,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"
                      style={{ marginLeft: "60px" }}
                      onClick={this.onclick}
                    />
                  </div>
                  <div
                    id="conversation"
                    class="btn-flat dashboard-card-action"
                    onClick={this.onclick}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="conversation"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500 }}
                      >
                        UPSI Conversation
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : this.props.userData &&
          this.props.userData.userDetails.isManagement ? (
          <div className="dashboard" style={{ marginTop: "60px" }}>
            <div className="row dashboard-row-client" style={{ marginTop: 40 }}>
              <div className="col s4 m4 l4">
                <div
                  className="card dashboard-card"
                  id="insiderExcel"
                  onClick={this.onTab}
                  style={{
                    width: "300px",
                    marginLeft: "0vw",
                    "border-radius": "3px",
                  }}
                >
                  <div
                    id="insiderExcel"
                    className="card-image dashboard-card-image"
                  >
                    <img
                      id="insiderExcel"
                      alt="svgImg"
                      height="100px"
                      width="100px"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAZlBMVEX/////pQD/ogD/wHb/ngD/4cD/zZX/oAD/8+P///3/sEX/9ej/nAD/qCr//PT/px//vGn/+O7/tFD/xHr/qzP/69P/6Mz/rzv/2az/79r/1aX/vWT/zo7/0pn/5cb/yYj/uF3/37hN5zh8AAADWElEQVR4nO2ca5eqIBSGlSg0bzVWWnnr///J041RcBuIpOess9+15tuIT5snQWDGcabkfElX6eU8qY0p8a6EEXL/uXoLAUTMfYVFiyDECXF5SBIvQJAytw1L5wcIErebJJidYB0KBOF6doINFQjoZn4CJhAwJEACJEACJEACJEACJEACJEACJEACJEACJEACJPjPCYJ1UZfV3phgX5V1sTZf8I3rhDJG6SH3jQj8/EDvDYRJbbjyvv/dPwh3fQQ1gb/jS88sAsuoBmj3D9hPD0FJ4P+0v0GMEMT9g51cSBVBvJu6/+CJ+wdURlAQxDtx7T0Zvw+Uiy249Cp2xGcC/ypfno8mSMU79Fz4SNB1wLgbrsSVGxE64hOB6MAz5DqaoFcDyYUPBLIDhjWQPXgiNG1HDBP4DXTpeA+k78L7Pq0LgwR9Bx4x+C44NfBJOi4MEQAOPEpQjwdw9lnPRbfjwgAB5MDdw2zyY7mD8HYBJgAdMHwoD1bh7QJIADtgWIFHvO1wR0AEA12wnbAz7x1gBB8k8GGAw6SjAcMu9AksO/CLALvQAASNZQd4BlxIC4mgSK07wBOALvQ/L1iBg5VjCTHogk5IZOlwSLCFPp86bGvtYAbsgrICNhzggV1QANhxgGe8C9Yc4BnrgkUHeMa5YNUBnjEuWHaAR98F6w7wBJodQQwciI95efOAd3Qxei5oOOB7tzI/duf+SUhpGDZH1ZWBRkeQSFmBYxM+bpjw2a0XvUc1Ehaqa9UuaDhQhO9G6OtcY3cGQJUIKhc0HCjaYfw1exDXCZQd8dkFDQeO8rqCJzSo8YL5yQUNB6RXYuI5F/FpGyq/EE48+GgiB/VzwBfPNbKLk4rNhcpuGB4jtMaCo0hAUmclEeictYRd0BsLpLOdZCUTUK3TnpALOg48CMQJrSkB4IKOAzYJei5ozwesEUgu6M8H7BEILmg6YJnAiTPeGM305wM2Cd5r74yOWju3SnCX4Van9W3UlNAygUGQAAmQAAmQAAn+NYLqywSVioBtqvU3U0kr4n0Cl9HvRnrdAghmDhIgARL8RQSl2Q6OrbDSOS1cg5PjgFuaswFk98HqvGQ3sOdf7d/YUlUg7PYass/Z82/45w4jWft/C07lav6Up+e9/wC11z3GRVzDjgAAAABJRU5ErkJggg=="
                      style={{ marginLeft: "60px", paddingTop: "10px" }}
                      // onClick={this.onTab}
                    />
                  </div>
                  <div
                    id="insiderExcel"
                    className="btn-flat dashboard-card-action"
                    // onClick={this.onTab}
                    style={{ marginTop: "-60%" }}
                  >
                    <span style={{ marginTop: "-10%" }}>
                      <a
                        id="insiderExcel"
                        className="dashboard-card-name"
                        style={{ color: "#022d36", fontWeight: 500 }}
                      >
                        Download Insiders Details
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div class="row dashboard-row-client" style={{ marginTop: 40 }}>
              {!this.props.userData?.userDetails?.firstLogin ? (
                <div className="dashboard" style={{ marginTop: "60px" }}>
                  <div className="col s4 m4 l4">
                    <div
                      class="card dashboard-card"
                      id="info"
                      onClick={this.onTab}
                      style={{
                        width: "300px",
                        marginLeft: "0vw",
                        "border-radius": "3px",
                      }}
                    >
                      <div
                        id="info"
                        class="card-image dashboard-card-image"
                        onClick={this.onTab}
                      >
                        <img
                          id="info"
                          alt="svgImg"
                          onClick={this.onTab}
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iODYiIHkxPSIxNS40NTMxMyIgeDI9Ijg2IiB5Mj0iMzguMzA3NjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMV82OTM3NV9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjE1LjExNzE5IiB4Mj0iODYiIHkyPSIxNTQuOTY5MzEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMl82OTM3NV9ncjIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I1NWUwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2I1NWUwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjUxLjA2MjUiIHgyPSI4NiIgeTI9IjU4LjQ1MzEzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfNjkzNzVfZ3IzIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iODYiIHkxPSIxNS4xMTcxOSIgeDI9Ijg2IiB5Mj0iMTU0LjU0NDY5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTRfNjkzNzVfZ3I0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnPjxwYXRoIGQ9Ik04NiwxNi4xMjVjLTUuOTM3MDYsMCAtMTAuNzUsNC44MTI5NCAtMTAuNzUsMTAuNzVjMCw1LjkzNzA2IDQuODEyOTQsMTAuNzUgMTAuNzUsMTAuNzVjNS45MzcwNiwwIDEwLjc1LC00LjgxMjk0IDEwLjc1LC0xMC43NWMwLC01LjkzNzA2IC00LjgxMjk0LC0xMC43NSAtMTAuNzUsLTEwLjc1eiIgZmlsbD0idXJsKCNjb2xvci0xXzY5Mzc1X2dyMSkiPjwvcGF0aD48cGF0aCBkPSJNODYsNDAuMzEyNWMtNy40MDk0NCwwIC0xMy40Mzc1LC02LjAyODA2IC0xMy40Mzc1LC0xMy40Mzc1YzAsLTcuNDA5NDQgNi4wMjgwNiwtMTMuNDM3NSAxMy40Mzc1LC0xMy40Mzc1YzcuNDA5NDQsMCAxMy40Mzc1LDYuMDI4MDYgMTMuNDM3NSwxMy40Mzc1YzAsNy40MDk0NCAtNi4wMjgwNiwxMy40Mzc1IC0xMy40Mzc1LDEzLjQzNzV6TTg2LDE4LjgxMjVjLTQuNDQ1MTMsMCAtOC4wNjI1LDMuNjE3MzcgLTguMDYyNSw4LjA2MjVjMCw0LjQ0NTEzIDMuNjE3MzcsOC4wNjI1IDguMDYyNSw4LjA2MjVjNC40NDUxMiwwIDguMDYyNSwtMy42MTczNyA4LjA2MjUsLTguMDYyNWMwLC00LjQ0NTEzIC0zLjYxNzM3LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1eiIgZmlsbD0idXJsKCNjb2xvci0yXzY5Mzc1X2dyMikiPjwvcGF0aD48cGF0aCBkPSJNNzUuMjUsNDguMzc1YzAsNS45MzY2OSA0LjgxMzMxLDEwLjc1IDEwLjc1LDEwLjc1YzUuOTM2NjksMCAxMC43NSwtNC44MTMzMSAxMC43NSwtMTAuNzUiIGZpbGw9InVybCgjY29sb3ItM182OTM3NV9ncjMpIj48L3BhdGg+PHBhdGggZD0iTTEwMi4xMjUsNDUuNjg3NWgtMzIuMjVjLTcuNDA5NDQsMCAtMTMuNDM3NSw2LjAyODA2IC0xMy40Mzc1LDEzLjQzNzV2NDNjMCw0LjQ0NTEyIDMuNjE3MzgsOC4wNjI1IDguMDYyNSw4LjA2MjVjMC45NDYsMCAxLjg0MzYzLC0wLjE5MzUgMi42ODc1LC0wLjQ5NDV2MzUuNDMyYzAsNS45Mjg2MyA0LjgyMTM4LDEwLjc1IDEwLjc1LDEwLjc1YzMuMjI3NjksMCA2LjA4OTg3LC0xLjQ1NjYzIDguMDYyNSwtMy43MTQxMmMxLjk3MjYzLDIuMjU3NSA0LjgzNDgxLDMuNzE0MTIgOC4wNjI1LDMuNzE0MTJjNS45Mjg2MywwIDEwLjc1LC00LjgyMTM3IDEwLjc1LC0xMC43NXYtMzUuNDMyYzAuODQzODcsMC4zMDEgMS43NDE1LDAuNDk0NSAyLjY4NzUsMC40OTQ1YzQuNDQ1MTIsMCA4LjA2MjUsLTMuNjE3MzggOC4wNjI1LC04LjA2MjV2LTQzYzAsLTcuNDA5NDQgLTYuMDI4MDYsLTEzLjQzNzUgLTEzLjQzNzUsLTEzLjQzNzV6TTk5LjQzNzUsMTQ1LjEyNWMwLDIuOTY0MzEgLTIuNDEwNjksNS4zNzUgLTUuMzc1LDUuMzc1Yy0yLjk2NDMxLDAgLTUuMzc1LC0yLjQxMDY5IC01LjM3NSwtNS4zNzV2LTMyLjI1di0yLjY4NzVoLTUuMzc1djIuNjg3NXYzMi4yNWMwLDIuOTY0MzEgLTIuNDEwNjksNS4zNzUgLTUuMzc1LDUuMzc1Yy0yLjk2NDMxLDAgLTUuMzc1LC0yLjQxMDY5IC01LjM3NSwtNS4zNzV2LTQzdi0yLjY4NzVoMjYuODc1djIuNjg3NXpNMTEwLjE4NzUsMTAyLjEyNWMwLDEuNDgwODEgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDY2OSAtMi42ODc1LC0yLjY4NzV2LTMyLjI1aC01LjM3NXYyNC4xODc1aC0yNi44NzV2LTI0LjE4NzVoLTUuMzc1djMyLjI1YzAsMS40ODA4MSAtMS4yMDQsMi42ODc1IC0yLjY4NzUsMi42ODc1Yy0xLjQ4MzUsMCAtMi42ODc1LC0xLjIwNjY5IC0yLjY4NzUsLTIuNjg3NXYtNDNjMCwtNC40NDUxMiAzLjYxNzM3LC04LjA2MjUgOC4wNjI1LC04LjA2MjVoMzIuMjVjNC40NDUxMiwwIDguMDYyNSwzLjYxNzM4IDguMDYyNSw4LjA2MjV6IiBmaWxsPSJ1cmwoI2NvbG9yLTRfNjkzNzVfZ3I0KSI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                          style={{ marginLeft: "60px" }}
                        />
                      </div>
                      <div
                        id="info"
                        class="btn-flat dashboard-card-action"
                        onClick={this.onTab}
                        style={{ marginTop: "-60%" }}
                      >
                        <span style={{ marginTop: "-10%" }}>
                          <a
                            id="info"
                            className="dashboard-card-name"
                            style={{ color: "#022d36", fontWeight: 500 }}
                            onClick={this.onTab}
                          >
                            Personal Information
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row dashboard-row-client"
                    style={{ marginTop: 40 }}
                  >
                    {this.props.userData?.userDetails?.upsi ? (
                      <div className="col s4 m4 l4">
                        <div
                          class="card dashboard-card"
                          id="upsi"
                          onClick={this.onclick}
                          style={{
                            width: "300px",
                            marginLeft: "0vw",
                            "border-radius": "3px",
                          }}
                        >
                          <div
                            class="card-image dashboard-card-image"
                            id="upsi"
                            onClick={this.onclick}
                          >
                            <img
                              id="upsi"
                              alt="svgImg"
                              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMTIuODc1IiB5MT0iNDkuMzgyODEiIHgyPSIxMTIuODc1IiB5Mj0iNzUuOTIxODgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMV80NDA0Nl9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI4NiIgeTE9IjE3LjEzMjgxIiB4Mj0iODYiIHkyPSIxNTUuNTIyOTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMl80NDA0Nl9ncjIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIxMTIuODc1IiB5MT0iMTcuMTMyODEiIHgyPSIxMTIuODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfNDQwNDZfZ3IzIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiNTVlMDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNDAuMzEyNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNDAuMzEyNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci00XzQ0MDQ2X2dyNCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjQwLjMxMjUiIHkxPSIxNy4xMzI4MSIgeDI9IjQwLjMxMjUiIHkyPSIxNTUuNTIyOTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNV80NDA0Nl9ncjUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI0MC4zMTI1IiB5MT0iMTcuMTMyODEiIHgyPSI0MC4zMTI1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTZfNDQwNDZfZ3I2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjAuNDY4NzUiIHkxPSIxNy4xMzI4MSIgeDI9IjYwLjQ2ODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTdfNDQwNDZfZ3I3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjQuNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNjQuNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci04XzQ0MDQ2X2dyOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc2LjU5Mzc1IiB5MT0iMTcuMTMyODEiIHgyPSI3Ni41OTM3NSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci05XzQ0MDQ2X2dyOSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5NzI2Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9Ijc2LjU5Mzc1IiB5MT0iMTcuMTMyODEiIHgyPSI3Ni41OTM3NSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xMF80NDA0Nl9ncjEwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjQuNSIgeTE9IjE3LjEzMjgxIiB4Mj0iNjQuNSIgeTI9IjE1NS41MjI5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xMV80NDA0Nl9ncjExIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjk3MjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNjAuNDY4NzUiIHkxPSIxNy4xMzI4MSIgeDI9IjYwLjQ2ODc1IiB5Mj0iMTU1LjUyMjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTEyXzQ0MDQ2X2dyMTIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmOTcyNiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iPjxwYXRoIGQ9Ik0xMTIuODc1LDUxLjA2MjVjLTUuOTM3MDYsMCAtMTAuNzUsNC44MTI5NCAtMTAuNzUsMTAuNzVjMCw1LjkzNzA2IDQuODEyOTQsMTAuNzUgMTAuNzUsMTAuNzVjNS45MzcwNiwwIDEwLjc1LC00LjgxMjk0IDEwLjc1LC0xMC43NWMwLC01LjkzNzA2IC00LjgxMjk0LC0xMC43NSAtMTAuNzUsLTEwLjc1eiIgZmlsbD0idXJsKCNjb2xvci0xXzQ0MDQ2X2dyMSkiPjwvcGF0aD48cGF0aCBkPSJNMTQ3LjgxMjUsNTMuNzVoLTMuNzQzNjljLTAuNzY4NjMsLTIuODUxNDQgLTIuMDEyOTQsLTUuNTg0NjIgLTMuNTkwNSwtOC4xNDA0NGwyLjgwMDM4LC0yLjgwMzA2YzMuMTQ0MzcsLTMuMTQ0MzcgMy4xNDQzNywtOC4yNTYgMCwtMTEuNDAwMzdjLTMuMTQ0MzgsLTMuMTQ0MzggLTguMjU2LC0zLjE0NDM3IC0xMS40MDAzNywwbC0yLjgzOCwyLjgzOGMtMi41MzQzMSwtMS41NTA2OSAtNS4yNTY3NSwtMi43ODQyNSAtOC4xMDI4MSwtMy41OTA1di0zLjc3ODYzYzAsLTQuNDQ1MTMgLTMuNjE3MzcsLTguMDYyNSAtOC4wNjI1LC04LjA2MjVjLTQuNDQ1MTMsMCAtOC4wNjI1LDMuNjE3MzcgLTguMDYyNSw4LjA2MjV2My43Nzg2M2MtMi44NDYwNiwwLjgwNjI1IC01LjU2ODUsMi4wMzk4MSAtOC4xMDI4MSwzLjU5MDVsLTIuODM4LC0yLjgzOGMtMy4xNDQzNywtMy4xNDQzNyAtOC4yNTYsLTMuMTQ0MzcgLTExLjQwMDM3LDBjLTEuNzAzODcsMS43MDM4OCAtMi40NTEsMy45ODI4NyAtMi4zMDg1Niw2LjIxNjE5aC01NS45NzUyNWMtNC40NDUxMywwIC04LjA2MjUsMy42MTczOCAtOC4wNjI1LDguMDYyNXY5MS4zNzVjMCwzLjQ5OTEzIDIuMjUyMTIsNi40NTUzOCA1LjM3NSw3LjU2OHYzLjE4NDY5YzAsMi45NjQzMSAyLjQxMDY5LDUuMzc1IDUuMzc1LDUuMzc1aDc3LjkzNzVjMi45NjQzMSwwIDUuMzc1LC0yLjQxMDY5IDUuMzc1LC01LjM3NXYtMy4xODJjMy4xMjI4NywtMS4xMTI2MyA1LjM3NSwtNC4wNjg4OCA1LjM3NSwtNy41Njh2LTMyLjc0NDVjMy4xMjI4NywtMS4xMTI2MyA1LjM3NSwtNC4wNjg4OCA1LjM3NSwtNy41Njh2LTMuNzc4NjJjMi44NDYwNiwtMC44MDYyNSA1LjU2ODUsLTIuMDM5ODEgOC4xMDI4MSwtMy41OTA1bDIuODM4LDIuODM4YzEuNTcyMTksMS41NzIxOSAzLjYzNjE5LDIuMzU2OTQgNS43MDAxOSwyLjM1Njk0YzIuMDY0LDAgNC4xMjgsLTAuNzg0NzUgNS43MDAxOSwtMi4zNTY5NGMzLjE0NDM3LC0zLjE0NDM3IDMuMTQ0MzcsLTguMjU2IDAsLTExLjQwMDM3bC0yLjgwMDM4LC0yLjgwMzA2YzEuNTgwMjUsLTIuNTU1ODEgMi44MjQ1NiwtNS4yODkgMy41OTA1LC04LjE0MDQ0aDMuNzQzNjljNC40NDUxMiwwIDguMDYyNSwtMy42MTczNyA4LjA2MjUsLTguMDYyNWMwLC00LjQ0NTEyIC0zLjYxNzM3LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1ek0xMzUuNjc4NDQsMzUuMjA4OTRjMS4wMTg1NiwtMS4wMTMxOSAyLjc4MTU2LC0xLjAxMzE5IDMuODAwMTMsMGMwLjUwNTI1LDAuNTA3OTQgMC43ODc0NCwxLjE4MjUgMC43ODc0NCwxLjkwMDA2YzAsMC43MTc1NiAtMC4yNzk1LDEuMzkyMTMgLTAuNzg3NDQsMS45MDAwNmwtMi4yNDY3NSwyLjI0Njc1Yy0xLjE3MTc1LC0xLjM1NDUgLTIuNDQyOTQsLTIuNjIwMzEgLTMuODEzNTYsLTMuNzg2Njl6TTg2LjI3MTQ0LDM1LjIwODk0YzEuMDE4NTYsLTEuMDEzMTkgMi43ODE1NiwtMS4wMTMxOSAzLjgwMDEzLDBsMi4yNjI4NywyLjI2MDE5Yy0xLjM3MDYyLDEuMTY2MzggLTIuNjQxODEsMi40MzIxOSAtMy44MTM1NiwzLjc4NjY5bC0yLjI0Njc1LC0yLjI0Njc1Yy0wLjUwNTI1LC0wLjUwNzk0IC0wLjc4NzQ0LC0xLjE4MjUgLTAuNzg3NDQsLTEuOTAwMDZjMCwtMC43MTc1NiAwLjI3NjgxLC0xLjM5MjEzIDAuNzg0NzUsLTEuOTAwMDZ6TTI2Ljg3NSwxNDcuODEyNXYtMi42ODc1aDc3LjkzNzV2Mi42ODc1ek0xMDcuNSwxMzkuNzVoLTgzLjMxMjVjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NXYtOTEuMzc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1aDU4LjQ3NDYzbDIuNjA5NTYsMi42MDk1NmMtMS41ODAyNSwyLjU1NTgxIC0yLjgyNDU2LDUuMjg2MzEgLTMuNTkzMTksOC4xNDA0NGgtMy43NDFjLTQuNDQ1MTMsMCAtOC4wNjI1LDMuNjE3MzggLTguMDYyNSw4LjA2MjVjMCw0LjQ0NTEzIDMuNjE3MzcsOC4wNjI1IDguMDYyNSw4LjA2MjVoMy43NDM2OWMwLjc2ODYzLDIuODUxNDQgMi4wMTI5NCw1LjU4NDYzIDMuNTkzMTksOC4xNDA0NGwtMi44MDMwNiwyLjgwMzA2Yy0zLjE0NDM3LDMuMTQ0MzcgLTMuMTQ0MzcsOC4yNTYgMCwxMS40MDAzN2MxLjU3MjE5LDEuNTcyMTkgMy42MzYxOSwyLjM1Njk0IDUuNzAwMTksMi4zNTY5NGMyLjA2NCwwIDQuMTI4LC0wLjc4NDc1IDUuNzAwMTksLTIuMzU2OTRsMi44MzgsLTIuODM4YzIuNTM0MzEsMS41NTA2OSA1LjI1Njc1LDIuNzg0MjUgOC4xMDI4MSwzLjU5MDV2My43Nzg2MmMwLDMuNDk5MTIgMi4yNTIxMyw2LjQ1NTM4IDUuMzc1LDcuNTY4djMyLjc0NDVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXpNODYuMjcxNDQsODQuNjE1OTRsMi4yNDY3NSwtMi4yNDY3NWMxLjE3MTc1LDEuMzU0NSAyLjQ0Mjk0LDIuNjIwMzEgMy44MTM1NiwzLjc4NjY5bC0yLjI2Mjg3LDIuMjYwMTljLTEuMDE4NTYsMS4wMTMxOSAtMi43ODE1NiwxLjAxMzE5IC0zLjgwMDEzLDBjLTAuNTA1MjUsLTAuNTA3OTQgLTAuNzg3NDQsLTEuMTgyNSAtMC43ODc0NCwtMS45MDAwNmMwLC0wLjcxNzU2IDAuMjgyMTksLTEuMzg5NDQgMC43OTAxMywtMS45MDAwNnpNMTM5LjQ3ODU2LDg0LjYxNTk0YzAuNTA1MjUsMC41MDc5NCAwLjc4NzQ0LDEuMTgyNSAwLjc4NzQ0LDEuOTAwMDZjMCwwLjcxNzU2IC0wLjI3OTUsMS4zOTIxMiAtMC43ODc0NCwxLjkwMDA2Yy0xLjAxODU2LDEuMDEzMTkgLTIuNzgxNTYsMS4wMTMxOSAtMy44MDAxMywwbC0yLjI2Mjg4LC0yLjI2MDE5YzEuMzcwNjIsLTEuMTY2MzggMi42NDE4MSwtMi40MzIxOSAzLjgxMzU2LC0zLjc4NjY5ek0xNDcuODEyNSw2NC41aC04LjEyNDMxbC0wLjQwMzEzLDIuMjAxMDZjLTEuODYyNDQsMTAuMTI5MTkgLTExLjEzOTY5LDE5LjM4NDk0IC0yMS41NzI1NiwyMS41Mjk1NmwtMi4xNSwwLjQ0MDc1djguMDc4NjNjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1di04LjA3ODYzbC0yLjE0NzMxLC0wLjQ0MDc1Yy0xMC40MzU1NiwtMi4xNDQ2MyAtMTkuNzEwMTIsLTExLjQwMDM3IC0yMS41NzI1NiwtMjEuNTI5NTZsLTAuNDA1ODEsLTIuMjAxMDZoLTguMTI0MzFjLTEuNDgzNSwwIC0yLjY4NzUsLTEuMjA0IC0yLjY4NzUsLTIuNjg3NWMwLC0xLjQ4MzUgMS4yMDQsLTIuNjg3NSAyLjY4NzUsLTIuNjg3NWg4LjEyNDMxbDAuNDAzMTMsLTIuMjAxMDZjMS44NjI0NCwtMTAuMTI5MTkgMTEuMTM5NjksLTE5LjM4NDk0IDIxLjU3MjU2LC0yMS41Mjk1NmwyLjE1LC0wLjQ0MDc1di04LjA3ODYzYzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1djguMDc4NjNsMi4xNDczMSwwLjQ0MDc1YzEwLjQzNTU2LDIuMTQ0NjMgMTkuNzEwMTIsMTEuNDAwMzggMjEuNTcyNTYsMjEuNTI5NTZsMC40MDU4MSwyLjIwMTA2aDguMTI0MzFjMS40ODM1LDAgMi42ODc1LDEuMjA0IDIuNjg3NSwyLjY4NzVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItMl80NDA0Nl9ncjIpIj48L3BhdGg+PHBhdGggZD0iTTExMi44NzUsNDAuMzEyNWMtMTEuODU0NTYsMCAtMjEuNSw5LjY0NTQ0IC0yMS41LDIxLjVjMCwxMS44NTQ1NiA5LjY0NTQ0LDIxLjUgMjEuNSwyMS41YzExLjg1NDU2LDAgMjEuNSwtOS42NDU0NCAyMS41LC0yMS41YzAsLTExLjg1NDU2IC05LjY0NTQ0LC0yMS41IC0yMS41LC0yMS41ek0xMTIuODc1LDc3LjkzNzVjLTguODkyOTQsMCAtMTYuMTI1LC03LjIzMjA2IC0xNi4xMjUsLTE2LjEyNWMwLC04Ljg5Mjk0IDcuMjMyMDYsLTE2LjEyNSAxNi4xMjUsLTE2LjEyNWM4Ljg5Mjk0LDAgMTYuMTI1LDcuMjMyMDYgMTYuMTI1LDE2LjEyNWMwLDguODkyOTQgLTcuMjMyMDYsMTYuMTI1IC0xNi4xMjUsMTYuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0zXzQ0MDQ2X2dyMykiPjwvcGF0aD48cGF0aCBkPSJNNDAuMzEyNSw4My4zMTI1Yy00LjQ0NTEyLDAgLTguMDYyNSwzLjYxNzM4IC04LjA2MjUsOC4wNjI1YzAsNC40NDUxMiAzLjYxNzM4LDguMDYyNSA4LjA2MjUsOC4wNjI1YzQuNDQ1MTIsMCA4LjA2MjUsLTMuNjE3MzggOC4wNjI1LC04LjA2MjVjMCwtNC40NDUxMiAtMy42MTczOCwtOC4wNjI1IC04LjA2MjUsLTguMDYyNXpNNDAuMzEyNSw5NC4wNjI1Yy0xLjQ4MzUsMCAtMi42ODc1LC0xLjIwNCAtMi42ODc1LC0yLjY4NzVjMCwtMS40ODM1IDEuMjA0LC0yLjY4NzUgMi42ODc1LC0yLjY4NzVjMS40ODM1LDAgMi42ODc1LDEuMjA0IDIuNjg3NSwyLjY4NzVjMCwxLjQ4MzUgLTEuMjA0LDIuNjg3NSAtMi42ODc1LDIuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItNF80NDA0Nl9ncjQpIj48L3BhdGg+PHBhdGggZD0iTTQwLjMxMjUsNjEuODEyNWMtNC40NDUxMiwwIC04LjA2MjUsMy42MTczNyAtOC4wNjI1LDguMDYyNWMwLDQuNDQ1MTMgMy42MTczOCw4LjA2MjUgOC4wNjI1LDguMDYyNWM0LjQ0NTEyLDAgOC4wNjI1LC0zLjYxNzM3IDguMDYyNSwtOC4wNjI1YzAsLTQuNDQ1MTMgLTMuNjE3MzgsLTguMDYyNSAtOC4wNjI1LC04LjA2MjV6TTQwLjMxMjUsNzIuNTYyNWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1YzAsMS40ODM1IC0xLjIwNCwyLjY4NzUgLTIuNjg3NSwyLjY4NzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTVfNDQwNDZfZ3I1KSI+PC9wYXRoPjxwYXRoIGQ9Ik00MC4zMTI1LDEwNC44MTI1Yy00LjQ0NTEyLDAgLTguMDYyNSwzLjYxNzM4IC04LjA2MjUsOC4wNjI1YzAsNC40NDUxMiAzLjYxNzM4LDguMDYyNSA4LjA2MjUsOC4wNjI1YzQuNDQ1MTIsMCA4LjA2MjUsLTMuNjE3MzggOC4wNjI1LC04LjA2MjVjMCwtNC40NDUxMiAtMy42MTczOCwtOC4wNjI1IC04LjA2MjUsLTguMDYyNXpNNDAuMzEyNSwxMTUuNTYyNWMtMS40ODM1LDAgLTIuNjg3NSwtMS4yMDQgLTIuNjg3NSwtMi42ODc1YzAsLTEuNDgzNSAxLjIwNCwtMi42ODc1IDIuNjg3NSwtMi42ODc1YzEuNDgzNSwwIDIuNjg3NSwxLjIwNCAyLjY4NzUsMi42ODc1YzAsMS40ODM1IC0xLjIwNCwyLjY4NzUgLTIuNjg3NSwyLjY4NzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTZfNDQwNDZfZ3I2KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw3Mi41NjI1aDEzLjQzNzV2NS4zNzVoLTEzLjQzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTdfNDQwNDZfZ3I3KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw5NC4wNjI1aDIxLjV2NS4zNzVoLTIxLjV6IiBmaWxsPSJ1cmwoI2NvbG9yLThfNDQwNDZfZ3I4KSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSwxMTUuNTYyNWg0NS42ODc1djUuMzc1aC00NS42ODc1eiIgZmlsbD0idXJsKCNjb2xvci05XzQ0MDQ2X2dyOSkiPjwvcGF0aD48cGF0aCBkPSJNNTMuNzUsMTA0LjgxMjVoNDUuNjg3NXY1LjM3NWgtNDUuNjg3NXoiIGZpbGw9InVybCgjY29sb3ItMTBfNDQwNDZfZ3IxMCkiPjwvcGF0aD48cGF0aCBkPSJNNTMuNzUsODMuMzEyNWgyMS41djUuMzc1aC0yMS41eiIgZmlsbD0idXJsKCNjb2xvci0xMV80NDA0Nl9ncjExKSI+PC9wYXRoPjxwYXRoIGQ9Ik01My43NSw2NC41aDEzLjQzNzV2NS4zNzVoLTEzLjQzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTEyXzQ0MDQ2X2dyMTIpIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                              style={{ marginLeft: "60px" }}
                              onClick={this.onclick}
                            />
                          </div>
                          <div
                            id="upsi"
                            class="btn-flat dashboard-card-action"
                            onClick={this.onclick}
                            style={{ marginTop: "-60%" }}
                          >
                            <span style={{ marginTop: "-10%" }}>
                              <a
                                id="upsi"
                                className="dashboard-card-name"
                                style={{
                                  color: "#022d36",
                                  fontWeight: 500,
                                  margin: 8,
                                }}
                              >
                                UPSI
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="col s4 m4 l4">
                      <div
                        class="card dashboard-card"
                        id="conversation"
                        onClick={this.onclick}
                        style={{
                          width: "300px",
                          marginLeft: "0vw",
                          "border-radius": "3px",
                        }}
                      >
                        <div
                          class="card-image dashboard-card-image"
                          id="conversation"
                          onClick={this.onclick}
                        >
                          <img
                            id="conversation"
                            alt="svgImg"
                            src="data:image/png;base64,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"
                            style={{ marginLeft: "60px" }}
                            onClick={this.onclick}
                          />
                        </div>
                        <div
                          id="conversation"
                          class="btn-flat dashboard-card-action"
                          onClick={this.onclick}
                          style={{ marginTop: "-60%" }}
                        >
                          <span style={{ marginTop: "-10%" }}>
                            <a
                              id="conversation"
                              className="dashboard-card-name"
                              style={{ color: "#022d36", fontWeight: 500 }}
                            >
                              UPSI Conversation
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span style={{ marginTop: "20px", fontWeight: "500" }}>
                  Please change your password and re-login to continue
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    userData: state.auth.data,
    common: state.common.leftBarItem,

    getFolio: state.Hod.getFolio,
    upsiList: state.Hod.upsiList.data,

    uploadBulkEmployeeSuccess: state.Hod.uploadBulkEmployeeSuccess,
    uploadBulkEmployeeError: state.Hod.uploadBulkEmployeeError,
    uploadBulkEmployeeLoading: state.Hod.uploadBulkEmployeeLoading,

    sharePdfSuccess: state.common.sharePdfSuccess,
    sharePdfLoading: state.common.sharePdfLoading,
    sharePdfError: state.common.sharePdfError,
    sharePdfMsg: state.common.sharePdfMsg,

    company: state.common.getCompanyData,

    insiderExcelDownloadLoading: state.common.insiderExcelDownloadLoading,
    insiderExcelDownloadSuccess: state.common.insiderExcelDownloadSuccess,
    insiderExcelDownloadError: state.common.insiderExcelDownloadError,
    insiderExcelDownloadMsg: state.common.insiderExcelDownloadMsg,

    query: state.common.query,

    toogleConversationFlag: state.common.toogleConversationFlag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UploadBulkEmployee: (excelFile, token) => {
      dispatch(uploadBulkEmployee(excelFile, token));
    },

    GetUpsi: (start_date, end_date, token) => {
      dispatch(getUpsi(start_date, end_date, token));
    },
    LeftBarItemChange: (id) => {
      dispatch(leftBarItemChange(id));
    },
    EmailPanRequest: (data, token) => {
      dispatch(emailPanRequest(data, token));
    },
    SharePdf: (type, id, token) => {
      dispatch(sharePdf(type, id, token));
    },
    GoToCompare: (id) => {
      dispatch(gotoCompare(id));
    },
    GetInsidersexcel: (query, token) => {
      dispatch(getInsidersexcel(query, token));
    },
    ToogleConversationFlag: (flag) => {
      dispatch(toogleConversationFlag(flag));
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
