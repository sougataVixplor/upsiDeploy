import React from "react";

export const SystemResetModal = (props) => {
  console.log("model open");
  return (
    <div id="confirm-modal" className="modal">
      <div class="row modal-content">
        <div className="row modal-title center" style={{ paddingTop: 15 }}>
          <span>Are you sure to want to {props.message} ?</span>
        </div>
      </div>
      <div className="modal-footer" style={{ textAlign: "center" }}>
        <button
          className="waves-effect waves btn-flat modal-close "
          onClick={props.handleClick}
        >
          Yes
        </button>
        <button className="modal-close waves-effect waves btn-flat">No</button>
      </div>
    </div>
  );
};
