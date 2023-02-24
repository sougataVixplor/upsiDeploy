import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import BulkMail from "../admin/BulkMail";
import { LeftBar } from "../layout/LeftBar";
import TopNav from "../layout/TopNav";
import { Redirect } from "react-router";
import {
  uploadBulkEmployee,
  getUpsi,
  emailPanRequest,
  getConversations,
} from "../../store/action/HodAction";
import {
  downloadUpsi,
  gotoCompare,
  pdfDownload,
  resetReducer,
  toogleConversationFlag,
} from "../../store/action/CommonAction";
import { UpsiLog } from "../admin/UpsiLog";
import ShareUpsi from "../admin/ShareUpsi";
import UserInformation from "../admin/UserInformation";
import swal from "sweetalert";
import CorrectionRequest from "../admin/CorrectionRequest";
import BasicContainer from "../layout/BasicContainer";
import ReceiveLog from "../upsiConversations/ReceiveLog";
import SentLogs from "../upsiConversations/SentLogs";
import UpsiConversationLogModal from "../layout/UpsiConversationLogModal";

export class AdminDashboard extends Component {
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
    templates: [
      { name: "template 1", id: 1 },
      { name: "template 2", id: 2 },
      { name: "template 3", id: 3 },
      { name: "template 4", id: 4 },
      { name: "template 5", id: 5 },
      { name: "template 6", id: 6 },
    ],
    emailPanSubmitFlag: false,
    pdfDownloadFlag: false,
  };
  componentDidMount = () => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {
      preventScrolling: false,
    });
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {});
    if (this.props.common == "template") {
      this.props.GetTemplate(this.props.user.accessToken);
    }
    console.log(this.props);
    if (this.props.goToCompare == "compare") {
      this.setState({ chooseFlag: "compare" });
      this.props.GoToCompare(null);
    }
    if (this.props.query?.type === "upsi_conversation") {
      if (this.props.query?.category === "receive")
        this.setState({ chooseFlag: "upsi_receive_log" });
      else this.setState({ chooseFlag: "upsi_sent_log" });
    }
  };

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
      // swal("OOPS!", this.props.message, "error");
      swal("OOPS!", this.props.weeklyDataMsg, "error");
      this.setState({ uploadFlag: false, weeklyData: "", date: "" });
    }
    if (
      !this.props.compareTransactionLoading &&
      this.props.compareTransactionSuccess &&
      this.state.comparetransFlag &&
      this.state.chooseFlag == "compare"
    ) {
      // this.compareTransaction(this.props.compareTransaction);
      this.setState({
        comparetransFlag: false,
      });
      // var currentData = this.props.compareTransaction.current_benpos_data;
      // var previousData = this.props.compareTransaction.prev_benpos_data;
      // var newarr = [];
      // var newarr2 = [];
      // var compareData;
      // if (currentData.length == 0 && previousData.length == 0) {
      //   swal("Sorry", "No Data Found", "warning");
      // }
      // if (currentData.length == 0 && previousData.length > 0) {
      //   newarr = previousData;
      // } else if (currentData.length > 0 && previousData.length == 0) {
      //   newarr = currentData;
      // } else if (currentData.length > 0 && previousData.length > 0) {
      //   if (currentData.length > previousData.length) {
      //     compareData = currentData;
      //   } else if (previousData.length > currentData.length) {
      //     compareData = previousData;
      //   }
      //   console.log("compareData", compareData);
      //   if (compareData == undefined) {
      //     swal("Sorry", "No Data Found", "warning");
      //   } else {
      //     for (var i = 0; i < compareData.length; i++) {
      //       if (i == 0 && newarr.length == 0) {
      //         var info = {
      //           Folio: compareData[i].Folio,
      //           total_share: this.current(
      //             compareData[i].pan,
      //             currentData,
      //             previousData,
      //             "total_share",
      //             i
      //           ),
      //           previous_total_share: this.current(
      //             compareData[i].pan,
      //             currentData,
      //             previousData,
      //             "previous_total_share",
      //             i
      //           ),
      //           is_valid: currentData[i].is_valid,
      //           transaction_folio: [compareData[i].transaction_folio],
      //           Requests: compareData[i].Requests,
      //           pan: compareData[i].pan,
      //           current_benpos_date: compareData[i].current_benpos_date,
      //         };
      //         newarr.push(info);
      //       }
      //       if (i > 0 && newarr.length > 0) {
      //         for (var j = 0; j < newarr.length; j++) {
      //           var found = newarr.find(
      //             (x) =>
      //               x.pan == compareData[i].pan &&
      //               x.current_benpos_date == compareData[i].current_benpos_date
      //           );
      //           if (found == undefined) {
      //             var info = {
      //               Folio: compareData[i].Folio,
      //               total_share: this.current(
      //                 compareData[i].pan,
      //                 currentData,
      //                 previousData,
      //                 "total_share",
      //                 i
      //               ),
      //               previous_total_share: this.current(
      //                 compareData[i].pan,
      //                 compareData,
      //                 previousData,
      //                 "previous_total_share",
      //                 i
      //               ),
      //               is_valid: currentData[i].is_valid,
      //               transaction_folio: [compareData[i].transaction_folio],
      //               Requests: compareData[i].Requests,
      //               pan: compareData[i].pan,
      //               current_benpos_date: compareData[i].current_benpos_date,
      //             };
      //             newarr.push(info);
      //           } else {
      //             var index = newarr.findIndex(
      //               (x) =>
      //                 x.pan == compareData[i].pan &&
      //                 x.current_benpos_date ==
      //                   compareData[i].current_benpos_date
      //             );
      //             newarr[index].transaction_folio.push(
      //               compareData[i].transaction_folio
      //             );
      //           }
      //         }
      //       }
      //     }
      //     for (var k = 0; k < newarr.length; k++) {
      //       var folio = this.state.transaction_folio;
      //       var cids = newarr[k].transaction_folio;
      //       const removeRepeatNumbers = (array) => [...new Set(array)];
      //       var Data = removeRepeatNumbers(cids);
      //       newarr[k].transaction_folio = Data;
      //     }
      //     console.log(newarr);
      //   }
      // }

      // this.setState({
      //   compareTransData: newarr,
      //   compStartDate: this.props.compareTransaction.prev_benpos_date
      //     ? moment(this.props.compareTransaction.prev_benpos_date).format(
      //         "DD-MM-YYYY"
      //       )
      //     : "",
      //   compEndDate: this.props.compareTransaction.current_benpos_date
      //     ? moment(this.props.compareTransaction.current_benpos_date).format(
      //         "DD-MM-YYYY"
      //       )
      //     : "",
      //   comparetransFlag: false,
      // });
    }
    if (
      !this.props.violationTransactionLoading &&
      this.state.violationTransFlag &&
      this.state.chooseFlag == "violation"
    ) {
      var compareData = this.props.violationTransaction;
      var newarr = [];
      var newarr2 = [];
      for (var i = 0; i < compareData.length; i++) {
        if (i == 0 && newarr.length == 0) {
          var info = {
            Folio: compareData[i].Folio,
            total_share: compareData[i].total_share,
            previous_total_share: compareData[i].previous_total_share,
            is_valid: compareData[i].is_valid,
            transaction_folio: [compareData[i].transaction_folio],
            Requests: compareData[i].Requests,
            pan: compareData[i].pan,
            current_benpos_date: compareData[i].current_benpos_date,
          };
          newarr.push(info);
        }
        if (i > 0 && newarr.length > 0) {
          for (var j = 0; j < newarr.length; j++) {
            var found = newarr.find(
              (x) =>
                x.pan == compareData[i].pan &&
                x.current_benpos_date == compareData[i].current_benpos_date
            );
            if (found == undefined) {
              var info = {
                Folio: compareData[i].Folio,
                total_share: compareData[i].total_share,
                previous_total_share: compareData[i].previous_total_share,
                is_valid: compareData[i].is_valid,
                transaction_folio: [compareData[i].transaction_folio],
                Requests: compareData[i].Requests,
                pan: compareData[i].pan,
                current_benpos_date: compareData[i].current_benpos_date,
              };
              newarr.push(info);
            } else {
              var index = newarr.findIndex(
                (x) =>
                  x.pan == compareData[i].pan &&
                  x.current_benpos_date == compareData[i].current_benpos_date
              );
              newarr[index].transaction_folio.push(
                compareData[i].transaction_folio
              );
            }
          }
        }
      }
      for (var k = 0; k < newarr.length; k++) {
        var folio = this.state.transaction_folio;
        var cids = newarr[k].transaction_folio;
        const removeRepeatNumbers = (array) => [...new Set(array)];
        var Data = removeRepeatNumbers(cids);
        newarr[k].transaction_folio = Data;
      }
      console.log(newarr);
      this.setState({
        violationTransData: newarr,
        violationTransFlag: false,
      });
    }
    if (this.state.uploadFlag && !this.props.uploadBulkEmployeeLoading) {
      var info = {};
      var user = [];
      if (this.props.uploadBulkEmployeeSuccess) {
        if (this.props.uploadBulkEmployee.errorList.length == 0) {
          swal("Success", "Upload SuccessFull", "success");
        } else if (this.props.uploadBulkEmployee.errorList.length > 0) {
          for (
            var i = 0;
            i < this.props.uploadBulkEmployee.errorList.length;
            i++
          ) {
            info = this.props.uploadBulkEmployee.errorList[i].name;

            // swal(
            //   "OOPS! Error Uploading these user(s)",
            //   this.props.uploadBulkEmployee.errorList[i].name,
            //   "error"
            // );
            user.push(info);
          }
          swal("Bulk Insider Add Successful except the above Insider(s)  ", {
            title: [user],
          });
          console.log(user);
        }

        this.setState({ uploadFlag: false });
      } else if (this.props.uploadBulkEmployeeError) {
        swal("OOPS!", this.props.uploadBulkEmployeeMsg, "error");
        this.setState({ uploadFlag: false });
      }
    }
    if (this.state.emailPanSubmitFlag && !this.props.emailPanRequestLoading) {
      if (this.props.emailPanRequestSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({ emailPanSubmitFlag: false });
      } else if (this.props.emailPanRequestError) {
        swal("OOPS!", this.props.errorMassege, "error");
        this.setState({ emailPanSubmitFlag: false });
      }
    }

    if (this.props.common == "template") {
      console.log("from did update");
    }
    if (this.state.pdfDownloadFlag && this.props.pdfDownloadError) {
      swal("OOPS!", "Failed to download pdf", "error");
      this.props.ResetReducer({ pdfDownloadError: false });
      this.setState({ pdfDownloadFlag: false });
    }
    if (this.state.downloadUpsiFlag && this.props.downloadUPSIError) {
      this.setState({ downloadUpsiFlag: false });
      swal("OOPS!", this.props.downloadUPSIMsg, "error");
    }
  }

  current = (pan, arr1, arr2, flag, index) => {
    console.log(pan);
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i].pan == pan && arr2[j].pan == pan) {
          console.log("in if");
          if (flag == "total_share") {
            return arr1[i] ? arr1[i].total_share : 0;
          } else if (flag == "previous_total_share") {
            return arr2[j] ? arr2[j].total_share : 0;
          }
        } else {
          const found1 = arr1.find((o) => o.pan === pan);
          const found2 = arr2.find((o) => o.pan === pan);
          if (found1 == undefined) {
            if (flag == "total_share") {
              return 0;
            } else if (flag == "previous_total_share") {
              return arr2[j] ? arr2[j].total_share : 0;
            }
          } else if (found2 == undefined) {
            if (flag == "total_share") {
              return arr1[i] ? arr1[i].total_share : 0;
            } else if (flag == "previous_total_share") {
              return 0;
            }
          }
        }
      }
    }
  };

  handleChoose = (e) => {
    this.setState({ chooseFlag: e.target.id });
    var oneMonthAgo = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    );
    var start_date = this.compareTransactionDateFormat(oneMonthAgo);
    var end_date = this.compareTransactionDateFormat(new Date());
    if (
      e.target.id === "upsi_sent_log" &&
      this.state.chooseFlag === "upsi_sent_log"
    ) {
      this.props.ToogleConversationFlag(false);
    }
    if (
      e.target.id === "upsi_receive_log" &&
      this.state.chooseFlag === "upsi_receive_log"
    ) {
      this.props.ToogleConversationFlag(false);
    }
    this.setState({ startDate: start_date, endDate: end_date });
    if (e.target.id == "upsi_log") {
      this.props.GetUpsi(start_date, end_date, this.props.user.accessToken);
    }
  };
  handleGo = (e) => {
    this.setState({ chooseFlag: "compare" });
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
  handleUpload = (e) => {
    console.log("jsdgh", e.target.files[0]);
    this.setState({ weeklyData: e.target.files[0] });
  };
  handleUploadKmp = (e) => {
    console.log("bulk kmp");
    this.setState({ bulkKmp: e.target.files[0] });
  };
  handleUploadDate = (e) => {
    console.log(e.target.value);
    this.setState({ date: e.target.value });
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
  handleStartEndDate = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSearchWithDate = (e) => {
    var start_date = this.state.start_date
      ? this.dateFormatter(this.state.start_date)
      : this.state.startDate.split("-").reverse().join("-");
    var end_date = this.state.end_date
      ? this.dateFormatter(this.state.end_date)
      : this.state.endDate.split("-").reverse().join("-");
    console.log(start_date, end_date);
    if (this.state.chooseFlag == "violation") {
      this.setState({ violationTransFlag: true });
      this.props.ViolationTransaction(
        start_date,
        end_date,
        this.props.user.accessToken
      );
    }
    if (this.state.chooseFlag == "compare") {
      this.setState({ comparetransFlag: true });
      this.props.CompareTransaction(
        start_date,
        end_date,
        this.props.user.accessToken
      );
    }
    if (this.state.chooseFlag == "activity") {
      this.props.ActivityLog(start_date, end_date, this.props.user.accessToken);
    }
    if (this.state.chooseFlag == "upsi_log") {
      this.props.GetUpsi(start_date, end_date, this.props.user.accessToken);
    }
  };

  handleWindowCloser = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  compareTransactionDateFormat = (inputDate) => {
    var date = new Date(inputDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  };

  windowCloserSubmit = (e) => {
    var from = this.state.from;
    var to = this.state.to;
    var purpose = this.state.purpose;
    if (
      this.state.from == "" ||
      this.state.to == "" ||
      this.state.purpose == ""
    ) {
      alert("Fill all the fields");
    } else {
      this.setState({ from: "", to: "", purpose: "" });
      var data = {
        purpose: purpose,
      };
      var modal = document.getElementById("configure-modal");
      var instance = M.Modal.getInstance(modal);
      instance.close();
      console.log(from, to, purpose);
      this.props.WindowConfiguration(
        from,
        to,
        data,
        this.props.user.accessToken
      );
    }
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

  handleBulkKmpSubmit = (e, type) => {
    var excel = this.state.bulkKmp;
    var modal = document.getElementById("upload-user-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.setState({ uploadFlag: true });
    this.props.UploadBulkEmployee(excel, type, this.props.user.accessToken);
  };

  resetValue = (id) => {
    if (id == "doc") {
      this.setState({ weeklyData: "" });
    }
    if (id == "user") {
      this.setState({ bulkKmp: "" });
    }
  };

  handleChangeNewKmp = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmitPanEmail = (e) => {
    e.preventDefault();
    var pan = this.state.pan;
    var email = this.state.email;
    var company_id = this.props.userData.userDetails.Company.id;
    var data = {
      pan: pan,
      email: email,
      company_id: company_id,
    };
    this.setState({ pan: "", email: "", emailPanSubmitFlag: true });
    var modal = document.getElementById("add-modal");
    var instance = M.Modal.getInstance(modal);
    instance.close();
    this.props.EmailPanRequest(data, this.props.user.accessToken);
  };

  handleChangeTemplateValue = (e) => {
    var selectedTemplate = { ...this.state.selectedTemplate };
    selectedTemplate[e.target.id] = e.target.value;
    this.setState({ selectedTemplate: selectedTemplate });
  };

  handleChooseTemplate = (e) => {
    console.log(e.target.id, this.state.chooseFlag);
    var template = this.props.tempaltes.find((o) => o.id == e.target.id);
    this.setState({
      templateId: e.target.id,
      chooseFlag: "template" + e.target.id,
      selectedTemplate: template,
      edit: false,
    });
  };

  editFlag = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleSearch = (data, query, keys) => {
    console.error(data);
    if (query) {
      var op = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < keys.length; j++) {
          if (
            data[i][keys[j]] &&
            data[i][keys[j]]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            !op.find((f) => f.id == data[i].id)
          ) {
            op.push(data[i]);
          }
        }
      }
      return op;
    } else {
      return data;
    }
  };

  handelChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDownloadUPSI = (e) => {
    e.preventDefault();
    this.props.DownloadUpsi(
      {
        startDate: this.state.start_date
          ? this.state.start_date
          : this.state.startDate,
        endDate: this.state.end_date ? this.state.end_date : this.state.endDate,
        query: this.state.query,
      },
      this.props.user.accessToken
    );
    this.setState({ downloadUpsiFlag: true });
  };

  onOpenConversation = (e, upsi) => {
    this.props.GetConversation(
      {
        upsi_id: upsi.id,
        type: "log",
      },
      this.props.user.accessToken
    );
    var modal = document.getElementById("UpsiConversationLogModal");
    console.error(modal);
    var instance = M.Modal.getInstance(modal);
    console.error(instance);
    if (instance) instance.open();
  };

  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    console.log("admin state", this.state);
    console.log("file value", document.querySelector(".weeklyData"));
    console.log("props : ", this.props);
    return (
      <BasicContainer>
        <UpsiConversationLogModal state={this.state} props={this.props} />
        <div className="row">
          <TopNav />
          {this.props.common == "other" ? (
            <BulkMail />
          ) : (
            <>
              <LeftBar
                state={this.state}
                itemChecker={this.props.common}
                handleChoose={this.handleChoose}
                handleUpload={this.handleUpload}
                handleUploadDate={this.handleUploadDate}
                handleSubmit={this.handleSubmit}
                weeklyDataSuccess={this.props.weeklyDataSuccess}
                handleUploadKmp={this.handleUploadKmp}
                handleBulkKmpSubmit={this.handleBulkKmpSubmit}
                handleWindowCloser={this.handleWindowCloser}
                windowCloserSubmit={this.windowCloserSubmit}
                resetValue={this.resetValue}
                handleChangeNewKmp={this.handleChangeNewKmp}
                onSubmitPanEmail={this.onSubmitPanEmail}
                handleChooseTemplate={this.handleChooseTemplate}
                templates={this.props.tempaltes}
              />
              <div className="col s7 m7 l8">
                {this.state.chooseFlag == null ? (
                  this.props.common == "upsi" ? (
                    <div>
                      <div className="row container initial-writeups">
                        <ul>
                          <li>
                            UPSI Log -{" "}
                            <span>
                              Click the button to look on the UPSI logs over a
                              particular interval
                            </span>
                          </li>
                          <li>
                            Share - <span>Click the button to share UPSI</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : this.props.common == "request" ? (
                    <div>
                      <div className="row container initial-writeups">
                        <ul>
                          <li>
                            Correction Request -{" "}
                            <span>
                              Click the button to look on and Approve/Reject the
                              update information requests comming from CP
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : this.props.common == "cp" ? (
                    <div>
                      <div className="row container initial-writeups">
                        <ul>
                          <li>
                            View Insiders -{" "}
                            <span>
                              Click the button to look on the insider list and
                              Reset Password/View Relatives/Relese User as your
                              need
                            </span>
                          </li>
                          <li>
                            Add Bulk Insiders -{" "}
                            <span>Click the button to upload insider list</span>
                          </li>
                          <li>
                            Add New CP -{" "}
                            <span>
                              Click the button to send mail to the new user
                              selected as CP
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : this.props.common === "conversation" ? (
                    <div className="row container initial-writeups">
                      <li>
                        UPSI SENT LOG -{" "}
                        <span>
                          Click the button to view the list of UPSI send by the
                          user and click on the conversation icon to start
                          conversation
                        </span>
                      </li>
                      <li>
                        UPSI RECEIVE LOG -{" "}
                        <span>
                          Click the button to view the list of UPSI received by
                          the user and click on the conversation icon to start
                          conversation
                        </span>
                      </li>
                    </div>
                  ) : null
                ) : this.state.chooseFlag == "upsi_log" ? (
                  <UpsiLog
                    state={this.state}
                    handelChange={this.handelChange}
                    handleSearch={this.handleSearch}
                    upsiList={this.props.upsiList}
                    handleUploadDate={this.handleStartEndDate}
                    handleSearchWithDate={this.handleSearchWithDate}
                    onDownloadUPSI={this.onDownloadUPSI}
                    userDetails={this.props.userData?.userDetails}
                    onOpenConversation={this.onOpenConversation}
                  />
                ) : this.state.chooseFlag == "correction" ? (
                  <CorrectionRequest />
                ) : this.state.chooseFlag == "share" ? (
                  <ShareUpsi
                  // HandleShare={this.handleShare}
                  // MailSent={this.mailSent}
                  />
                ) : this.state.chooseFlag == "view_cp" ? (
                  <UserInformation />
                ) : this.state.chooseFlag === "upsi_sent_log" ? (
                  <SentLogs />
                ) : this.state.chooseFlag === "upsi_receive_log" ? (
                  <ReceiveLog />
                ) : null}
              </div>
            </>
          )}
        </div>
      </BasicContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    userData: state.auth.data,
    common: state.common.leftBarItem,
    goToCompare: state.common.goToCompare,

    upsiList: state.Hod.upsiList.data,

    uploadBulkEmployeeSuccess: state.Hod.uploadBulkEmployeeSuccess,
    uploadBulkEmployeeError: state.Hod.uploadBulkEmployeeError,
    uploadBulkEmployeeLoading: state.Hod.uploadBulkEmployeeLoading,
    uploadBulkEmployee: state.Hod.uploadBulkEmployee,
    uploadBulkEmployeeMsg: state.Hod.uploadBulkEmployeeMsg,

    emailPanRequestLoading: state.Hod.emailPanRequestLoading,
    emailPanRequestSuccess: state.Hod.emailPanRequestSuccess,
    emailPanRequestError: state.Hod.emailPanRequestError,
    errorMassege: state.Hod.errorMassege,

    pdfDownloadError: state.common.pdfDownloadError,

    downloadUPSILoading: state.common.downloadUPSILoading,
    downloadUPSISuccess: state.common.downloadUPSISuccess,
    downloadUPSIError: state.common.downloadUPSIError,
    downloadUPSIData: state.common.downloadUPSIData,
    downloadUPSIMsg: state.common.downloadUPSIMsg,

    query: state.common.query,

    toogleConversationFlag: state.common.toogleConversationFlag,

    getConversationLoading: state.Hod.getConversationLoading,
    getConversationSuccess: state.Hod.getConversationSuccess,
    getConversationError: state.Hod.getConversationError,
    conversation: state.Hod.conversation,
    getConversationMsg: state.Hod.getConversationMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UploadBulkEmployee: (excelFile, type, token) => {
      dispatch(uploadBulkEmployee(excelFile, type, token));
    },
    GetUpsi: (start_date, end_date, token) => {
      dispatch(getUpsi(start_date, end_date, token));
    },
    EmailPanRequest: (data, token) => {
      dispatch(emailPanRequest(data, token));
    },
    GoToCompare: (id) => {
      dispatch(gotoCompare(id));
    },
    PdfDownload: (startDate, endDate, request_status, type, token) => {
      dispatch(pdfDownload(startDate, endDate, request_status, type, token));
    },
    ResetReducer: (data) => {
      dispatch(resetReducer(data));
    },
    DownloadUpsi: (query, token) => {
      dispatch(downloadUpsi(query, token));
    },
    ToogleConversationFlag: (flag) => {
      dispatch(toogleConversationFlag(flag));
    },
    GetConversation: (query, token) => {
      dispatch(getConversations(query, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
