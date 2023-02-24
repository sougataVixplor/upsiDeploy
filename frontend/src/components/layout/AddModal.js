import React from "react";
import "../stylesheet/modals.css";
import "../stylesheet/common.css";
import { EmailPanTab } from "./EmailPanTab";

const AddModal = ({ state, addEmailPan, HandleChange, onSubmit }) => {
  return (
    <div id="add-modal" class="modal">
      <div class="row modal-content">
        <div className="row modal-title ">
          <span>Add New CP</span>
        </div>
        <p>**Send a mail to the new CP for sharing data</p>
        {/* <a class="btn-floating btn-button waves-effect waves-light" onClick={addEmailPan}><i class="material-icons">add</i></a> */}
        <form onSubmit={onSubmit}>
          {/* state.change.map((comp,index) => (comp)) */}
          {/* <EmailPanTab HandleChange={HandleChange} state={state} /> */}
          <div className="row">
            <div className="col s12 m12 l12">
              <label>PAN</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div className="col s12 m12 l12">
              <input required id="pan" onChange={HandleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l12">
              <label>Email</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div className="col s12 m12 l12">
              <input required id="email" onChange={HandleChange} />
            </div>
          </div>
          <div className="row" style={{ transform: "translate(109px, 53px)" }}>
            <button
              type="button"
              className="modal-close waves-effect waves btn-flat"
            >
              CANCEL
            </button>
            <button type="submit" className="waves-effect waves btn-flat">
              Send Mail
            </button>
          </div>
        </form>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default AddModal;
