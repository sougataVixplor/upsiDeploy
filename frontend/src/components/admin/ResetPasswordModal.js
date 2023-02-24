import React from "react";
import "../stylesheet/common.css"

const ResetPasswordModal = ({pass}) => {
  console.log(pass)
  return (
    <div id="reset-password-modal" className="modal">
        <div className="modal-content reset_pass">
            <h5>Password Reset Successful</h5>
            <p>Your New Password is:&nbsp;<b>{pass ? pass.password : null}</b></p>
        </div>
    </div>
  );
};

export default ResetPasswordModal;
