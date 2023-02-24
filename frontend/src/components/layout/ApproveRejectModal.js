import React from "react";

export const ApproveRejectModal = ({ id, OnRejected, HandleChange }) => {
  return (
    <div id="update-reject-modal" className="modal modal-fixed-footer">
      <div class="modal-content">
        <div className="row modal-title center" style={{ paddingTop: 15 }}>
          <span>Are you sure?</span>
        </div>
        <div className="row">
          <p>
            <label>Reason</label>
          </p>
          <form>
            <div className="col s10 m10 l10" style={{ marginLeft: 30 }}>
              <textarea
                onChange={HandleChange}
                id="reason"
                rows="2"
                cols="80"
                name="reason"
                form="usrform"
                style={{ resize: "none", height: "35vh",padding: 10 }}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer" style={{ textAlign: "center" }}>
        <button
          form="deleteUser"
          id={id}
          className="waves-effect modal-close waves btn-flat"
          onClick={OnRejected}
        >
          Yes
        </button>
        <button className="modal-close waves-effect waves btn-flat">No</button>
      </div>
    </div>
  );
};
