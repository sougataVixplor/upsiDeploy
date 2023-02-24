import React from "react";
import moment from "moment";

export const RelativeTab = ({
  state,
  index,
  HandleChange,
  HandleFolioChange,
  deleteTab,
  HandleDelete,
}) => {
  console.log(state.relatives[index]);
  return (
    <div>
      <ul className="collection">
        <li className="collection-item avatar">
          {state.relatives[index].id ? null : (
            <button
              className="btn btn-flat right"
              disabled={state.edit ? false : true}
              onClick={deleteTab}
            >
              <i id={index} className="material-icons small">
                cancel
              </i>
            </button>
          )}

          <form action="">
            <div className="row">
              <div className="col s12 m12 l12">
                <p>Add relative detail</p>{" "}
                <label className="active" style={{ paddingRight: "86%" }}>
                  <span style={{ color: "red" }}>*</span> Relative Category
                </label>
                <div className="input-field col s6 m6 l6">
                  <select
                    value={state.relatives[index].type}
                    // disabled={state.edit ? false : true}
                    onChange={HandleChange}
                    id={"type-" + index}
                    className="browser-default"
                    required
                    disabled={state.edit ? false : true}
                  >
                    <option value="" disabled selected>
                      Choose Your Option
                    </option>
                    <option value={"Immediate Relative"}>
                      Immediate Relative
                    </option>
                    <option value={"Material Financial Relationship"}>
                      Material Financial Relationship
                    </option>
                  </select>
                </div>
                {state.relatives[index].id ? (
                  <div className="col s6 m6 l6">
                    <a
                      className="btn btn-button right"
                      disabled={state.edit ? false : true}
                      id={index}
                      style={{ marginTop: 17 }}
                      onClick={(element) =>
                        HandleDelete(element, state.relatives[index].id)
                      }
                    >
                      Delete
                    </a>
                  </div>
                ) : null}
              </div>
              <div className="row">
                <fieldset>
                  <legend>Personal Information</legend>
                  <div className="input-field col s6 m6 l6">
                    <input
                      type="text"
                      id={"name" + "-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].name}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Name"
                    />
                    <label className="active" for={"name" + "-" + index}>
                      Relative name<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="input-field col s6 m6 l6">
                    <input
                      type="text"
                      id={"email" + "-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].email}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Email Id"
                    />
                    <label className="active" for={"email" + "-" + index}>
                      EMAIL ID
                    </label>
                  </div>

                  <div className="input-field col s4 m4 l4">
                    <input
                      type="number"
                      id={"phone" + "-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].phone}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Phone Number"
                    />
                    <label className="active" for={"phone" + "-" + index}>
                      Phone Number
                    </label>
                  </div>
                  <div className="input-field col s4 m4 l4">
                    <input
                      type="text"
                      id={"pan-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].pan}
                      required
                      className="validate"
                      disabled={
                        state.relatives[index].prefilled || !state.edit
                          ? true
                          : false
                      }
                      placeholder="Enter Your Relative's PAN Number"
                    />
                    <label className="active" for={"pan-" + index}>
                      PAN No.<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="input-field col s4 m4 l4">
                    <input
                      type="number"
                      id={"current_share" + "-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].current_share}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Total Current Share"
                    />
                    <label
                      className="active"
                      for={"current_share" + "-" + index}
                    >
                      Current Total Share
                    </label>
                  </div>
                  <div className="input-field col s6 m6 l6">
                    <input
                      type="text"
                      id={"emp_sub_code" + "-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].emp_sub_code}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Employee Sub Code"
                    />
                    <label
                      className="active"
                      for={"emp_sub_code" + "-" + index}
                    >
                      Emp sub code
                    </label>
                  </div>
                  <div className="input-field col s6 m6 l6">
                    <input
                      type="text"
                      id={"relation-" + index}
                      onChange={HandleChange}
                      value={state.relatives[index].relation}
                      required
                      className="validate"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relation"
                    />
                    <label className="active" for={"relation-" + index}>
                      Relation<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l6">
                    <input
                      id={"last_institute" + "-" + index}
                      type="text"
                      disabled={state.edit ? false : true}
                      onChange={HandleChange}
                      value={state.relatives[index].last_institute}
                      placeholder="Enter Your Relative's Last Institute"
                    />
                    <label className="active" for="last_institute">
                      Last Institute
                    </label>
                  </div>
                  <div class="input-field col s4 m4 l6">
                    <input
                      value={state.relatives[index].last_employer}
                      onChange={HandleChange}
                      id={"last_employer" + "-" + index}
                      type="text"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Last Employer"
                    />
                    <label className="active" for="last_employer">
                      Last Employer
                    </label>
                  </div>

                  <p style={{ marginLeft: "-83%" }}>
                    <label className="active">Other Identifier Type</label>
                  </p>
                  <div class="input-field col s4 m4 l6">
                    <select
                      class="browser-default"
                      disabled={state.edit ? false : true}
                      onChange={HandleChange}
                      id={"other_identifier_type" + "-" + index}
                      value={state.relatives[index].other_identifier_type}
                      style={{ "margin-top": 2 }}
                    >
                      <option value="" disabled selected>
                        Choose your option
                      </option>
                      <option value="Passport">Passport</option>
                      <option value="Aadhar">Aadhar</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Any Other">Any Other</option>
                    </select>
                  </div>

                  <div class="input-field col s4 m4 l6">
                    <input
                      value={state.relatives[index].other_identifier_no}
                      onChange={HandleChange}
                      id={"other_identifier_no" + "-" + index}
                      type="text"
                      disabled={state.edit ? false : true}
                      placeholder="Enter Your Relative's Other Identifier Number"
                    />
                    <label className="active" for="last_employer">
                      Other Identifier Number
                    </label>
                  </div>
                </fieldset>

                <fieldset style={{ marginTop: 20 }}>
                  <legend>
                    Shareholding Details (leave blank if your relative have no holding)
                  </legend>
                  <div className="row">
                    <div className="input-field col s12 m12 l12">
                      <p>
                        <label className="active">Security Types</label>
                      </p>
                      <select
                        className="browser-default"
                        id={"security_type" + "-" + index}
                        onChange={HandleChange}
                        value={state.relatives[index].security_type}
                        required
                        disabled={state.edit ? false : true}
                      >
                        <option value="Shares" selected>
                          Shares
                        </option>
                        <option value="Warrants">Warrants</option>
                        <option value="Convertible Debentures">
                          Convertible Debentures
                        </option>
                        <option value="Rights">Rights</option>
                        <option value="Rights">Entitlements</option>
                      </select>
                    </div>
                    <div className="input-field col s6 m6 l6">
                      <input
                        id={"folio-1"}
                        type="text"
                        className="validate"
                        // disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[0].folio}
                        required
                        // className="validate"
                        disabled={state.edit ? false : true}
                        placeholder="Enter Your Relative's Folio or DpId+ClientId"
                      />
                      <label className="active" for={"folio-1"}>
                        FOLIO 1 <span>(Folio or DpId+ClientId)</span>
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        id={"current_share-1"}
                        type="number"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[0].current_share}
                        placeholder="Enter Your Relative's Number of Shares"
                      />
                      <label className="active" for={"current_shrare-1"}>
                        Number of Shares
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 m6 l6">
                      <input
                        id={"folio-2"}
                        type="text"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[1].folio}
                        placeholder="Enter Your Relative's Folio or DpId+ClientId"
                      />
                      <label className="active" for={"folio-2"}>
                        FOLIO 2 <span>(Folio or DpId+ClientId)</span>
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        id={"current_share-2"}
                        type="number"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[1].current_share}
                        placeholder="Enter Your Relative's Number of Shares"
                      />
                      <label className="active" for={"current_share-2"}>
                        Number of Shares
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 m6 l6">
                      <input
                        id={"folio-3"}
                        type="text"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[2].folio}
                        placeholder="Enter Your Relative's Folio or DpId+ClientId"
                      />
                      <label className="active" for={"folio-3"}>
                        FOLIO 3 <span>(Folio or DpId+ClientId)</span>
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        id={"current_share-3"}
                        type="number"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[2].current_share}
                        placeholder="Enter Your Relative's Number of Shares"
                      />
                      <label className="active" for={"current_share-3"}>
                        Number of Shares
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 m6 l6">
                      <input
                        id={"folio-4"}
                        type="text"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[3].folio}
                        placeholder="Enter Your Relative's Folio or DpId+ClientId"
                      />
                      <label className="active" for={"folio-4"}>
                        FOLIO 4 <span>(Folio or DpId+ClientId)</span>
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        id={"current_share-4"}
                        type="number"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[3].current_share}
                        placeholder="Enter Your Relative's Number of Shares"
                      />
                      <label className="active" for={"current_share-4"}>
                        Number of Shares
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6 m6 l6">
                      <input
                        id={"folio-5"}
                        type="text"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[4].folio}
                        placeholder="Enter Your Relative's Folio or DpId+ClientId"
                      />
                      <label className="active" for={"folio-5"}>
                        FOLIO 5 <span>(Folio or DpId+ClientId)</span>
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        id={"current_share-5"}
                        type="number"
                        className="validate"
                        disabled={state.edit ? false : true}
                        onChange={(e) => {
                          HandleFolioChange(e, index);
                        }}
                        value={state.relatives[index].folios[4].current_share}
                        placeholder="Enter Your Relative's Number of Shares"
                      />
                      <label className="active" for={"current_share-5"}>
                        Number of Shares
                      </label>
                    </div>
                    <div className="input-field col s4 m4 l4">
                      <input
                        type="date"
                        className="validate"
                        disabled={state.edit ? false : true}
                        id={"last_benpos_date-" + index}
                        onChange={HandleChange}
                        defaultValue={
                          state.relatives[index].last_benpos_date
                            ? state.relatives[index].last_benpos_date
                                .split("-")
                                .reverse()
                                .join("-")
                            : ""
                        }
                        required
                        // className="validate"
                        // disabled={state.edit ? false : true}
                      />
                      <label
                        className="active"
                        // className="active"
                        for={"current_benpos_date-" + index}
                      >
                        BENPOS Date
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </li>
      </ul>
    </div>
  );
};
