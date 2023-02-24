import React from "react";
import { UploadDocument } from "../admin/UploadDocument";
import UploadUser from "../admin/UploadUser";
import AddModal from "./AddModal";
import "../stylesheet/style.css";
import UploadDPModal from "../admin/UploadDPModal";

export const LeftBar = (props) => {
  console.log(props.itemChecker);
  return (
    <div>
      <UploadDocument
        state={props.state}
        handleUpload={props.handleUpload}
        handleUploadDate={props.handleUploadDate}
        handleSubmit={props.handleSubmit}
        resetValue={props.resetValue}
      />
      {/* <ConfigureModal
        state={props.state}
        windowCloserSubmit={props.windowCloserSubmit}
        handleWindowCloser={props.handleWindowCloser}
      />*/}
      <UploadUser
        state={props.state}
        handleUploadKmp={props.handleUploadKmp}
        handleBulkKmpSubmit={props.handleBulkKmpSubmit}
        resetValue={props.resetValue}
      />
      <AddModal
        state={props.state}
        HandleChange={props.handleChangeNewKmp}
        //addEmailPan={this.clickRelative}
        onSubmit={props.onSubmitPanEmail}
      />
      {props.itemChecker == "personal_info" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal col s12 m12 l12 "
            id="profile"
            onClick={props.handleChoose}
          >
            profile
          </a>
          {/* <AddModal state={state} /> */}
          <a
            className="btn btn-modal col s12 m12 l12"
            id="relative"
            // className="btn btn-modal col s12 m12 l12 modal-trigger"
            // data-target="disclouser-form-modal"
            style={{ marginTop: 10 }}
            onClick={props.handleChoose}
          >
            Relatives
          </a>
        </div>
      ) : props.itemChecker == "report" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="violation"
            onClick={props.handleChoose}
          >
            violation report
          </a>
          <br />
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="compare"
            onClick={props.handleChoose}
          >
            compare transaction
          </a>
          <br />
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="activity"
            onClick={props.handleChoose}
          >
            activity log
          </a>
        </div>
      ) : props.itemChecker == "upload" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal needMargin modal-trigger col s12 m12 l12"
            data-target="upload-modal"
            onClick={props.handleChoose}
            // props.handleUpload={props.handleUpload}
          >
            Upload Weekly Data
          </a>
          <br />
          {/* <a
                  className="btn btn-modal needMargin modal-trigger col s12 m12 l12"
                  // id="generate_employee_report"
                  data-target="upload-user-modal"
                  onClick={props.handleChoose}
                >
                  add bulk KMP
                </a> */}
        </div>
      ) : props.itemChecker == "request" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="correction"
            onClick={props.handleChoose}
          >
            Correction Request
          </a>
        </div>
      ) : props.itemChecker == "upsi" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            // data-target="upload-modal"
            id="upsi_log"
            onClick={props.handleChoose}
            // props.handleUpload={props.handleUpload}
          >
            UPSI Log
          </a>
          <br />
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="share"
            onClick={props.handleChoose}
          >
            Share
          </a>
        </div>
      ) : props.itemChecker == "template" ? (
        <div className="left-bar row left">
          {/* <a
            className="btn btn-modal needMargin modal-trigger col s12 m12 l12"
            data-target="configure-modal"
            id="configure"
            onClick={props.handleChoose}
          >
            window closure
          </a> */}
          <br />
          <ul class="collapsible">
            <li>
              <div class="collapsible-header">
                <i class="material-icons">arrow_drop_down</i>Existing Templates
              </div>
              <div class="collapsible-body">
                {props.templates &&
                  props.templates.map((template) => (
                    <>
                      <a
                        className="btn btn-modal needMargin col s12 m12 l12"
                        id={template.id}
                        onClick={props.handleChooseTemplate}
                      >
                        {template.name}
                      </a>
                      <br />
                    </>
                  ))}
              </div>
            </li>
          </ul>
        </div>
      ) : props.itemChecker == "cp" ? (
        <div className="left-bar row left">
          <a
            className="btn btn-modal needMargin col s12 m12 l12"
            id="view_cp"
            onClick={props.handleChoose}
          >
            View Insiders
          </a>
          <br />
          <a
            className="btn btn-modal needMargin modal-trigger col s12 m12 l12"
            // id="generate_employee_report"
            data-target="upload-user-modal"
            onClick={props.handleChoose}
          >
            {/* create employee report */}
            add bulk Insiders
          </a>
          <br />
          <a
            className="btn btn-modal needMargin modal-trigger col s12 m12 l12"
            data-target="add-modal"
            onClick={props.handleChoose}
          >
            {/* create employee report */}
            add new CP
          </a>
          <br />
        </div>
      ) : props.itemChecker === "conversation" ? (
        <div className="left-bar row left">
          <a
            id="upsi_sent_log"
            className="btn btn-modal needMargin col s12 m12 l12"
            onClick={props.handleChoose}
          >
            UPSI Sent Log
          </a>
          <a
            id="upsi_receive_log"
            className="btn btn-modal needMargin col s12 m12 l12"
            onClick={props.handleChoose}
          >
            UPSI Receive Log
          </a>
        </div>
      ) : null}
    </div>
  );
};
