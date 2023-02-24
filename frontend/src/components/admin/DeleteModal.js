import React from "react";

const DeleteModal = ({ id, HandleDelete }) => {
  // console.log(users)
  return (
    <div
      id="delete-user-modal"
      className="modal modal-fixed-footer"
      style={{ height: "20%" }}
    >
      <div className="row modal-title center" style={{ paddingTop: 15 }}>
        <span>Are you sure?</span>
      </div>
      <div className="modal-footer" style={{ textAlign: "center" }}>
        <button
          form="deleteUser"
          id={id}
          className="waves-effect waves btn-flat"
          onClick={HandleDelete}
        >
          Yes
        </button>
        <button className="modal-close waves-effect waves btn-flat">No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
