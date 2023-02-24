import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { Multiselect } from "multiselect-react-dropdown";
import { getKmp, shareUpsi } from "../../store/action/HodAction";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import swal from "sweetalert";
import { Redirect } from "react-router-dom";

export class ShareUpsi extends Component {
  state = {
    kmpFlag: true,
    options: [],
    selectedOption: [
      {
        id: this.props.userData.userDetails.pan,
        value: this.props.userData.userDetails.email,
        label:
          this.props.userData.userDetails.emp_code +
          "|" +
          this.props.userData.userDetails.name,
      },
    ],
    to: [],
    by: [],
    share_by: "",
    share_to: "",
    subject: "",
    body: "",
    onRequestFlag: false,
    type: "",
  };
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {
      preventScrolling: false,
    });
    if (this.props.user) {
      this.props.GetKmp(this.props.user.accessToken);
    }
  };
  componentDidUpdate() {
    if (this.props.getKmpSuccess && this.state.kmpFlag) {
      var kmps = this.props.kmps;
      var by = [];
      var info = {
        id: this.props.userData.userDetails.pan,
        value: this.props.userData.userDetails.email,
        label:
          this.props.userData.userDetails.emp_code +
          "|" +
          this.props.userData.userDetails.name,
      };
      by.push(info);
      var data = [];
      for (var i = 0; i < kmps.length; i++) {
        if (kmps[i].is_active == true && kmps[i].status == "Active") {
          var info = {
            id: kmps[i].pan,
            value: kmps[i].email,
            label: kmps[i].emp_code + "|" + kmps[i].name,
          };
          data.push(info);
        }
      }
      this.setState({
        options: data,
        kmpFlag: false,
        by: by,
      });
    }

    if (this.state.onRequestFlag && !this.props.shareUpsiLoading) {
      if (this.props.shareUpsiSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({
          type: "success",
          onRequestFlag: false,
          navigateFlag: true,
        });
      } else if (this.props.shareUpsiError) {
        swal("OOPS!", this.props.shareUpsiMsg, "error");
        this.setState({ type: "error", onRequestFlag: false });
      }
    }
  }

  HandleShare = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSelectBy = (opt) => {
    var resetBy = [];
    if (opt.length > 0) {
      if (opt["0"].value == "*") {
        this.setState({ by: this.state.options });
      } else {
        this.setState({ by: opt });
      }
    } else {
      this.setState({ by: resetBy });
    }
  };
  handleRemoveBy = (selectedList, removedItem) => {
    console.log(selectedList, removedItem);
    if (selectedList.length == 0) {
      const result = this.state.by.filter(
        (by) => by.value == removedItem.value
      );
      console.log(result);
      this.setState({ by: result });
    } else {
      this.setState({ by: selectedList });
    }
  };
  handleSelect = (opt) => {
    console.log(opt);
    var reset = [];
    if (opt.length > 0) {
      if (opt["0"].value == "*") {
        this.setState({ to: this.state.options });
      } else {
        this.setState({ to: opt });
      }
    } else {
      this.setState({ to: reset });
    }
  };
  MailSent = (e) => {
    e.preventDefault();
    console.log(this.state);
    if (!this.state.body || this.state.body === "") {
      alert("Mail body is required");
      return;
    }
    if (!this.state.subject || this.state.subject === "") {
      alert("Mail subject is required");
      return;
    }
    if (this.state.selectedOption.length)
      if (
        (this.state.to.length == 0 && this.state.share_to == "") ||
        this.state.by.length == 0
      ) {
        alert("Please mention Share by and Share to");
      } else {
        var mail = [];
        for (var i = 0; i < this.state.to.length; i++) {
          mail.push(this.state.to[i].value);
        }
        var mail_by = [];
        for (var i = 0; i < this.state.by.length; i++) {
          mail_by.push(this.state.by[i].value);
        }
        var sender_id = "";
        for (var i = 0; i < this.state.by.length; i++) {
          if (i === 0) {
            sender_id = this.state.by[i].id;
          } else {
            sender_id += "," + this.state.by[i].id;
          }
        }
        var receiver_id = "";
        for (var i = 0; i < this.state.to.length; i++) {
          if (i === 0) {
            receiver_id = this.state.to[i].id;
          } else {
            receiver_id += "," + this.state.to[i].id;
          }
        }
        var data = {
          shared_by: mail_by,
          shared_with:
            this.state.share_to == "" ? mail : mail.concat(this.state.share_to),
          subject: this.state.subject,
          information: this.state.body,
          receiver_id: receiver_id,
          sender_id: sender_id,
        };
        console.log(data);
        this.setState({ onRequestFlag: true });
        this.props.ShareUpsi(
          data,
          this.state.attachment,
          this.props.user.accessToken
        );
      }
  };

  onChangeFile = (e) => {
    // console.error('file : ', e.target.files[0])
    if (e.target?.files[0]?.size > 35e6) {
      swal("Alert", "File size more than 30 MB is not supported", "info");
      document.getElementById(e.target.id).value = null;
    } else this.setState({ [e.target.id]: e.target.files[0] });
  };

  render() {
    if (this.state.navigateFlag) return <Redirect to="/" />;

    console.log("state", this.state);
    console.log("props", this.props);
    return (
      <div>
        <div className="container">
          <form
            action="#"
            style={{
              width: "100%",
              height: "84vh",
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: 38,
            }}
          >
            <div
              className="row item-header"
              style={{ width: "100%", marginLeft: 20 }}
            >
              <b>Share UPSI</b>
            </div>

            <div
              className="row"
              style={{
                width: "100%",
                marginLeft: 20,
              }}
            >
              <div>
                <div className="row">
                  <div class="col s12 m12 l12">
                    <span className="textarea-heading">Shared By</span>
                    <div>
                      <label>Insider</label>
                      <Multiselect
                        id="to"
                        displayValue="label"
                        disable={true}
                        selectedValues={this.state.selectedOption}
                        options={[
                          { label: "All", value: "*" },
                          {
                            label:
                              this.props.userData.userDetails.emp_code +
                              "|" +
                              this.props.userData.userDetails.name,
                            value: this.props.userData.userDetails.email,
                          },
                          ...this.state.options,
                        ]}
                        onSelect={this.handleSelectBy}
                        onRemove={this.handleRemoveBy}
                      />
                    </div>
                  </div>
                  <div class="col s12 m12 l12">
                    <span className="textarea-heading">Shared With</span>

                    <div className="row">
                      <div className="col s6 m6 l6">
                        <label>Insider</label>
                        <Multiselect
                          id="to"
                          displayValue="label"
                          showCheckbox={true}
                          options={[
                            { label: "All", value: "*" },
                            ...this.state.options,
                          ]}
                          onSelect={this.handleSelect}
                        />
                      </div>
                      <div className="col s6 m6 l6">
                        <label>
                          Outsider{" "}
                          <span
                            style={{
                              fontSize: "x-small",
                              fontWeight: 900,
                              color: "darkgray",
                            }}
                          >
                            ( Please use only comma "," as a seperator (no
                            space, no special character nothing but a comma)like
                            ex- abc@xyz.com,qwe@bnm.com )
                          </span>
                        </label>

                        <textarea
                          id="share_to"
                          onChange={this.HandleShare}
                          required
                          style={{ resize: "none", padding: 10 }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style={{ marginTop: -33 }}>
                  <form class="col s12" id="upsi" onSubmit={this.MailSent}>
                    <div class="row">
                      <div class="input-field col s12">
                        <span className="textarea-heading">Subject</span>
                        <textarea
                          id="subject"
                          placeholder="Write your subject..."
                          onChange={this.HandleShare}
                          value={this.state.subject}
                          required
                          style={{ resize: "none", padding: 10 }}
                        ></textarea>
                      </div>
                      <div
                        class="input-field col s12"
                        style={{ marginTop: -11 }}
                      >
                        <span className="textarea-heading">Body</span>
                        <textarea
                          id="body"
                          //className="textarea"
                          placeholder="Write your mail..."
                          onChange={this.HandleShare}
                          value={this.state.body}
                          required
                          style={{
                            resize: "none",
                            height: "25vh",
                            padding: 10,
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </form>
                  {/* <div style={{ marginLeft: 10 }}>
                  <label for="myfile">Select a file:</label>
                  <input type="file" id="myfile" name="myfile" />
                </div> */}
                </div>
                <div className="row">
                  <div className="col s4 m4 l4" style={{ marginTop: "-47px" }}>
                    <span className="textarea-heading left">Attachment</span>
                    <input
                      type="file"
                      id="attachment"
                      onChange={this.onChangeFile}
                      accept=".*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: -33 }}>
              {this.props.shareUpsiLoading ? (
                <span
                  className="right"
                  style={{ marginTop: "-38px", marginLeft: "-5px" }}
                >
                  Sending...
                </span>
              ) : (
                <button
                  className="btn btn-button right"
                  type="submit"
                  form="upsi"
                  onClick={this.MailSent}
                  style={{ marginTop: "-40px" }}
                  disabled={this.props.shareUpsiLoading}
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userData: state.auth.data,
  kmps: state.Hod.getKmp,
  getKmpSuccess: state.Hod.getKmpSuccess,

  shareUpsiSuccess: state.Hod.shareUpsiSuccess,
  shareUpsiError: state.Hod.shareUpsiError,
  shareUpsiLoading: state.Hod.shareUpsiLoading,
  shareUpsiMsg: state.Hod.shareUpsiMsg,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetKmp: (token) => {
      dispatch(getKmp(token));
    },
    ShareUpsi: (body, attachment, token) => {
      dispatch(shareUpsi(body, attachment, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareUpsi);
