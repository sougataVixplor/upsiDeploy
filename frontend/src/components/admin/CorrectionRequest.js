import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import moment from "moment";
import {
  correctionRequest,
  getKmp,
  viewCorrectionRequest,
} from "../../store/action/HodAction";
import { ViewCorrectionRequestModal } from "./ViewCorrectionRequestModal";

import swal from "sweetalert";
import { sharePdf } from "../../store/action/CommonAction";
import TableViewCorrectionRequest from "../layout/TableViewCorrectionRequest";

export class CorrectionRequest extends Component {
  state = {
    userList: [],
    getuserFlag: true,
    userId: "",
    onRequestFlag: false,
    type: "",
    query: "",
    id: "",
    status: "",
    reqType: "",
  };
  componentDidMount() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {
      preventScrolling: false,
    });
    // var elem = document.querySelectorAll(".");
    // var instance = M.Tooltip.init(elem, {});
    this.props.GetKmp(this.props.user.accessToken);
  }
  componentDidUpdate() {
    // var elem = document.querySelectorAll(".");
    // var instance = M.Tooltip.init(elem, {});
    if (this.props.getKmpSuccess && this.state.getuserFlag) {
      console.log(this.props.kmps);
      var filteredUser = this.props.kmps.filter(
        (user) => user.status == "Update"
      );
      this.setState({ userList: filteredUser, getuserFlag: false });
    }
    // if(!this.props.correctionRequestLoading && this.state.getuserFlag && this.props.correctionRequestSuccess){
    //   var filteredUser1= this.props.kmps.filter((user)=>user.status == "Update")
    //     this.setState({userList: filteredUser1, getuserFlag: false})
    // }
    if (this.state.onRequestFlag && !this.props.correctionRequestLoading) {
      if (this.props.correctionRequestSuccess) {
        swal("Success", "SuccessFul", "success");
        var modal = document.getElementById("view-correction-request-modal");
        var instance = M.Modal.getInstance(modal);
        instance.close();
        // instance.open();
        if (this.state.status == "Approved") {
          var type = "Cp_update_approved";
        } else if (this.state.status == "Rejected") {
          var type = "Cp_update_rejected";
        }
        this.props.SharePdf(type, this.state.id, this.props.user.accessToken);
        this.props.GetKmp(this.props.user.accessToken);
        this.setState({ type: "success", onRequestFlag: false });
      } else if (this.props.correctionRequestError) {
        swal("OOPS!", this.props.correctionRequestMsg, "error");
        this.props.GetKmp(this.props.user.accessToken);
        this.setState({ type: "error", onRequestFlag: false });
      }
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onApprove = (e) => {
    e.preventDefault();
    var user = this.props.kmps.find((o) => o.id == e.target.id);
    console.log(user);
    this.setState({
      id: e.target.id,
      status: "Approved",
      onRequestFlag: true,
      getuserFlag: false,
    });
    var data = { status: "Approved", pan: user.pan, reason: this.state.reason };
    this.props.CorrectionRequest(
      data,
      e.target.id,
      this.props.user.accessToken
    );
  };
  onReject = (e) => {
    e.preventDefault();
    // console.log("id",e.target.id)
    var user = this.props.kmps.find((o) => o.id == e.target.id);
    console.log(user);
    this.setState({
      id: e.target.id,
      status: "Rejected",
      onRequestFlag: true,
      getuserFlag: false,
    });
    var data = { status: "Rejected", pan: user.pan, reason: this.state.reason };
    this.props.CorrectionRequest(
      data,
      e.target.id,
      this.props.user.accessToken
    );
  };

  OnAppproveClick = (e) => {
    this.setState({ reqType: "Approved" });
  };
  OnRejectClick = (e) => {
    this.setState({ reqType: "Rejected" });
  };

  onViewCorrectionRequest = (e) => {
    this.setState({ userId: e.target.id });
    this.props.ViewCorrectionRequest(e.target.id, this.props.user.accessToken);
  };
  render() {
    const query = this.state.query;
    const filteredUser = this.props.kmps
      ? query
        ? this.props.kmps.filter((user) => {
            return (
              user.pan.toLowerCase().includes(query.toLowerCase()) ||
              user.name.toLowerCase().includes(query.toLowerCase())
            );
          })
        : this.props.kmps
      : [];
    return (
      <div className="">
        <ViewCorrectionRequestModal
          id={this.state.userId}
          // UserInfo={this.props.correctionUserList && this.props.correctionUserList.temp_info ? JSON.parse(this.props.correctionUserList.temp_info) : this.props.correctionUserList.temp_info}
          UserInfo={this.props.correctionUserList.temp_info}
          onApprove={this.onApprove}
          onReject={this.onReject}
          onApproveClick={this.OnAppproveClick}
          onRejectClick={this.OnRejectClick}
          state={this.state}
          handleChange={this.handleChange}
        />
        <div className="row container">
          <div
            className="row item-header"
            style={{ width: "100%", marginLeft: 20 }}
          >
            <b>Correction Request</b>
          </div>
          <div className="col s1 m1 l1 right">
            <i
              className="material-icons right"
              style={{ "margin-top": 8, "margin-right": 51 }}
            >
              search
            </i>
          </div>
          <div
            className="col s11 m11 l11 input-field search-box"
            style={{ marginTop: "-6px" }}
          >
            <input
              className="serach-input"
              id="query"
              type="text"
              onChange={this.handleChange}
              placeholder="Search with Name and Pan"
            />
          </div>
        </div>
        {/* <form action="#" style={{ height: "50vh", overflow: "auto" }}>
          <div
            className="row list-item-header"
            style={{ width: "94%", marginLeft: 20 }}
          >
            <div className="col s3 m3 l3">
              <b>Name</b>
            </div>
            <div className="col s3 m3 l3">
              <b>PAN</b>
            </div>
            <div className="col s3 m3 l3">
              <b>Timestamp</b>
            </div>
            <div className="col s3 m3 l3">
              <b>Action</b>
            </div>
          </div>
          <div className="row" style={{ height: "60vh", marginLeft: 20 }}>
            {filteredUser &&
              filteredUser.map((user, ind) =>
                user.status == "Update" ? (
                  <div className="row list-item" style={{ width: "94%" }}>
                    <div className="col s3 m3 l3">{user.name}</div>
                    <div className="col s3 m3 l3">{user.pan}</div>
                    <div className="col s3 m3 l3">
                      {user.updatedAt
                        ? moment(user.updatedAt).format("DD-MM-YYYY, h:mm:ss a")
                        : ""}
                    </div>
                    <div className="col s3 m3 l3">
                      <div className="row">
                        <div className="col s4 m4 l6">
                          <button
                            className="btn-floating btn-small right btn-button modal-trigger "
                            //data-position="left"
                            title="View The Correction Request"
                            data-target="view-correction-request-modal"
                            onClick={this.onViewCorrectionRequest}
                          >
                            <i
                              class="material-icons small"
                              id={user.id}
                              style={{ color: "white" }}
                            >
                              chevron_right
                            </i>
                          </button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </form> */}
        {filteredUser && filteredUser.length > 0 ? (
          <TableViewCorrectionRequest
            data={filteredUser}
            headers={[
              {
                name: "Name",
                key: (d) => {
                  return d.name;
                },
              },
              {
                name: "PAN",
                key: (list) => {
                  return list.pan;
                },
              },
              {
                name: "Time",
                key: (d) => {
                  return d.createdAt
                    ? moment(d.createdAt).format("DD-MM-YYYY, h:mm:ss a")
                    : "";
                },
              },
            ]}
            actions={[
              {
                name: "Action",
                key: [
                  {
                    name: "correction",
                    f: this.onViewCorrectionRequest,
                    modal: "view-correction-request-modal",
                  },
                ],
              },
            ]}
          />
        ) : (
          <span style={{ fontWeight: 600, fontSize: 20 }}>No Data Found</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    kmps: state.Hod.getKmp,
    getKmpSuccess: state.Hod.getKmpSuccess,
    correctionUserList: state.Hod.correctionUserList,
    correctionUserSuccess: state.Hod.correctionUserSuccess,

    correctionRequestLoading: state.Hod.correctionRequestLoading,
    correctionRequestSuccess: state.Hod.correctionRequestSuccess,
    correctionRequestError: state.Hod.correctionRequestError,
    correctionRequestMsg: state.Hod.correctionRequestMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetKmp: (token) => {
      dispatch(getKmp(token));
    },
    CorrectionRequest: (data, id, token) => {
      dispatch(correctionRequest(data, id, token));
    },
    ViewCorrectionRequest: (id, token) => {
      dispatch(viewCorrectionRequest(id, token));
    },
    SharePdf: (type, id, token) => {
      dispatch(sharePdf(type, id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectionRequest);
