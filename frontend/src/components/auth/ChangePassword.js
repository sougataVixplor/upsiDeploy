import React from "react";
// import '../stylesheets/common.css'

const ChangePassword = ({ state, HandleChange, OnSubmit }) => {
  return (
    <div id="change-password-modal" className="modal modal-fixed-footer">
      <div className="row modal-content">
        <div className="row modal-title">
          <span>Change Password</span>
        </div>
        <div className="row">
          <div className="col s12">
            <form id="changePassword" onSubmit={OnSubmit}>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password"
                  value={state.password}
                  onChange={HandleChange}
                  required
                />
                <label>Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="newPassword"
                  value={state.newPassword}
                  onChange={HandleChange}
                  required
                />
                <label>New Password</label>
              </div>
              <div>
                <span style={{ "font-size": 12, "font-weight": "700" }}>
                  <b>Note:</b> Password should contains atleast one Capital
                  letter, one Small letter.<br></br>Password should contains
                  atleast one Number.<br></br> Password must contain a special
                  character.<br></br>Password length must be greater than 9
                  characters.
                </span>
              </div>
              {/*   <div className="input-field col s12">
                    <input
                      type="password"
                      id="retypePassword"
                    //   onChange={HandleChange}
                    //   value={state.email}
                      required
                    />
                    <label>Re-Type Password</label>
                    </div> */}
            </form>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="submit"
          form="changePassword"
          className="waves-effect waves btn-flat"
        >
          Yes
        </button>
        <button className="modal-close waves-effect waves btn-flat">No</button>
      </div>
    </div>
  );
};

export default ChangePassword;
