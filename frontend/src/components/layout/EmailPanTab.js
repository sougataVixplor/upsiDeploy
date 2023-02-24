import React from "react";

export const EmailPanTab = ({ state, index, HandleChange, deleteTab }) => {
  return (
    <div>
      <ul class="collection">
        <li class="collection-item">
          <div className="row">
            <div className="col s11 m11 l11">
              {/* <div className="col s6 m6 l6">
                <label for="pan">PAN</label>
                <input id="pan" type="text" class="validate" value={state.pan} onChange={HandleChange} />
              </div> */}
              <div className="col s12 m12 l12">
                <label for="mail">Email</label>
                <textarea
                  rows="2"
                  cols="40"
                  id="email"
                  value={state.email}
                  onChange={HandleChange}
                  style={{ padding: 10 }}
                />
              </div>
            </div>
            {/* <div className="col s1 m1 l1">
              <a className="btn btn-flat" id={index} onClick={deleteTab}>
                <i class="material-icons">cancel</i>
              </a>
            </div> */}
          </div>
        </li>
      </ul>
    </div>
  );
};
