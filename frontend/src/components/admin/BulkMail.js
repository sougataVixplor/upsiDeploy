import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { getKmp, bulkMail } from "../../store/action/HodAction";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Multiselect } from "multiselect-react-dropdown";

import swal from "sweetalert";
import { Redirect } from "react-router-dom";

export class BulkMail extends Component {
  state = {
    kmpFlag: true,
    options: [],
    to: [],
    subject: "",
    body: "",
    onRequestFlag: false,
    type: "",
  };
  componentDidMount = () => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
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
      var data = [];
      for (var i = 0; i < kmps.length; i++) {
        if (kmps[i].is_active == true && kmps[i].status == "Active") {
          var info = {
            value: kmps[i].email,
            label: kmps[i].emp_code + "|" + kmps[i].name,
          };
          data.push(info);
        }
      }
      this.setState({ options: data, kmpFlag: false });
    }
    if (this.state.onRequestFlag && !this.props.bulkMailLoading) {
      if (this.props.bulkMailSuccess) {
        swal("Success", "SuccessFul", "success");
        this.setState({
          type: "success",
          onRequestFlag: false,
          navigateFlag: true,
        });
      } else if (this.props.bulkMailError) {
        swal("OOPS!", this.props.bulkMailMessage, "error");
        this.setState({ type: "error", onRequestFlag: false });
      }
    }
  }

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

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.to);
    if (
      this.state.to.length == 0 ||
      this.state.subject == "" ||
      this.state.body == ""
    ) {
      alert("Fiil up all fields");
    } else {
      var mail = [];
      for (var i = 0; i < this.state.to.length; i++) {
        mail.push(this.state.to[i].value);
      }
      var data = {
        to: mail,
        subject: this.state.subject,
        body: this.state.body,
      };
      this.setState({ onRequestFlag: true });
      console.log("data:", data);
      this.props.BulkMail(
        data,
        this.state.attachment,
        this.props.user.accessToken
      );
    }
  };

  onChangeFile = (e) => {
    // console.error('file : ', e.target.files[0])
    if (e.target.files[0]?.size > 35e6) {
      swal("Alert", "File size more than 1 MB is not supported", "info");
      document.getElementById(e.target.id).value = null;
    } else this.setState({ [e.target.id]: e.target.files[0] });
  };

  render() {
    if (this.state.navigateFlag) return <Redirect to="/" />;

    return (
      <div className="container">
        <form
          action="#"
          style={{
            width: "100%",
            height: "84vh",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: 11,
          }}
        >
          <div
            className="row item-header"
            style={{ width: "100%", marginLeft: 20 }}
          >
            <b>Send Mail</b>
          </div>
          <div className="row" style={{ width: "100%", marginLeft: 20 }}>
            <div>
              <div
                class="input-field col s12 m12 l12"
                style={{ marginTop: -1 }}
              >
                {/* <Select
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="To..."
                  options={options}
                /> */}
                <span className="textarea-heading">To</span>
                <Multiselect
                  id="to"
                  displayValue="label"
                  showCheckbox
                  options={[
                    { label: "All", value: "*" },
                    ...this.state.options,
                  ]}
                  onSelect={this.handleSelect}
                />
              </div>

              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12" style={{ marginTop: 1 }}>
                      <span className="textarea-heading">Subject</span>
                      <textarea
                        id="subject"
                        placeholder="Write your subject..."
                        onChange={this.handleChange}
                        style={{ resize: "none", padding: 10 }}
                      ></textarea>
                    </div>
                    <div class="input-field col s12" style={{ marginTop: -5 }}>
                      <span className="textarea-heading">Body</span>
                      <textarea
                        id="body"
                        //className="textarea"
                        placeholder="Write your mail..."
                        onChange={this.handleChange}
                        style={{ resize: "none", padding: 10, height: 160 }}
                      ></textarea>
                    </div>
                    <div className="col s12 m12 l12">
                      <div className="row">
                        <div
                          className="col s22 m22 l2 left"
                          style={{ transform: "translate(-32px, 19px)" }}
                        >
                          <label style={{ fontSize: "12px" }}>Attachment</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s2 m2 l2 left">
                          <input
                            type="file"
                            id="attachment"
                            accept=".pdf,.xls,.xlsx"
                            onChange={this.onChangeFile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <div style={{ marginLeft: 10 }}>
                  <label for="myfile">Select a file:</label>
                  <input type="file" id="myfile" name="myfile" />
                </div> */}
              </div>
            </div>
          </div>
          <div style={{ transform: "translate(10px, -104px)" }}>
            {this.props.bulkMailLoading ? (
              <span
                className="right"
                style={{ marginTop: "-30px", marginLeft: "-5px" }}
              >
                Sending...
              </span>
            ) : (
              <button
                className="btn btn-button right"
                onClick={this.onSubmit}
                style={{ marginTop: "-20px" }}
              >
                Send
              </button>
            )}
          </div>
        </form>
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

    bulkMailSuccess: state.Hod.bulkMailSuccess,
    bulkMailError: state.Hod.bulkMailError,
    bulkMailLoading: state.Hod.bulkMailLoading,
    bulkMailMessage: state.Hod.bulkMailMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetKmp: (token) => {
      dispatch(getKmp(token));
    },
    BulkMail: (body, file, token) => {
      dispatch(bulkMail(body, file, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkMail);
