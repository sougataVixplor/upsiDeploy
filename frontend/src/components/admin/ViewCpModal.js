import React from "react";
import moment from "moment";
import "../stylesheet/modals.css";
import "../stylesheet/common.css";

export const ViewCpModal = ({ UserInfo }) => {
  console.log("user info", UserInfo);
  return (
    <div>
      <div id="view-cp-modal" class="modal">
        <div class="row modal-content">
          <div className="row modal-title ">
            <span style={{ marginLeft: 26 }}>View CP</span>
          </div>
          <form style={{ width: "98%", margin: 10 }}>
            <fieldset>
              <div className="row">
                <div class="input-field col s5 m5 l5">
                  <input
                    value={UserInfo && UserInfo.name}
                    id="name"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="name">
                    Name
                  </label>
                </div>
                <div class="input-field col s3 m3 l3">
                  <input
                    value={UserInfo && UserInfo.status}
                    id="status"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="status">
                    Status
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.pan}
                    id="pan"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="pan">
                    PAN_NO
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.designation}
                    id="designation"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="desg">
                    Designation
                  </label>
                </div>

                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.emp_code}
                    id="emp_code"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="emp_code">
                    EMP_CODE
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo && UserInfo.Company && UserInfo.Company.updatedAt
                        ? moment(UserInfo.Company.updatedAt).format(
                            "DD-MM-YYYY, h:mm:ss a"
                          )
                        : ""
                    }
                    id="emp_code"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="emp_code">
                    Timestamp
                  </label>
                </div>
              </div>
              <p>
                <label>Address</label>
              </p>
              <div className="row">
                <div className="col s12 m12 l12">
                  <textarea
                    id="address"
                    value={UserInfo && UserInfo.address}
                    rows="2"
                    cols="80"
                    name="address"
                    form="usrform"
                    style={{ padding: 10 }}
                  >
                    Address
                  </textarea>
                </div>
              </div>
              <div class="input-field col s12 m12 l12">
                <input
                  id="dop"
                  value={
                    UserInfo && UserInfo.date_of_appointment_as_insider
                      ? moment(UserInfo.date_of_appointment_as_insider).format(
                          "DD-MM-YYYY"
                        )
                      : ""
                  }
                  type="text"
                  class="validate"
                  required
                />
                <label className="active" for="dop">
                  Date of Appointment as Insider
                </label>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[0] &&
                      UserInfo.Folios[0].folio
                    }
                    id="folio-1"
                    name="folio"
                    type="text"
                    class="validate"
                    required
                  />
                  <label className="active" for="dpcl1">
                    FOLIO 1 <span>(Folio or DpId+ClientId)</span>
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[0] &&
                      UserInfo.Folios[0].current_share
                    }
                    id="current_share-1"
                    name="folio"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="current_shr1">
                    Number of Shares
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[1] &&
                      UserInfo.Folios[1].folio
                    }
                    id="folio-2"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="dpcl2">
                    FOLIO 2 <span>(Folio or DpId+ClientId)</span>
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[1] &&
                      UserInfo.Folios[1].current_share
                    }
                    id="current_share-2"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="current_shr2">
                    Number of Shares
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[2] &&
                      UserInfo.Folios[2].folio
                    }
                    id="folio-3"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="dpcl3">
                    FOLIO 3 <span>(Folio or DpId+ClientId)</span>
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[2] &&
                      UserInfo.Folios[2].current_share
                    }
                    id="current_share-3"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="current_shr3">
                    Number of Shares
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[3] &&
                      UserInfo.Folios[3].folio
                    }
                    id="folio-4"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="dpcl4">
                    FOLIO 4 <span>(Folio or DpId+ClientId)</span>
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[3] &&
                      UserInfo.Folios[3].current_share
                    }
                    id="current_share-4"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="current_shr4">
                    Number of Shares
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[4] &&
                      UserInfo.Folios[4].folio
                    }
                    id="folio-5"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="dpcl5">
                    FOLIO 5 <span>(Folio or DpId+ClientId)</span>
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={
                      UserInfo &&
                      UserInfo.Folios &&
                      UserInfo.Folios[4] &&
                      UserInfo.Folios[4].current_share
                    }
                    id="current_share-5"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="current_shr5">
                    Number of Shares
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s4 m4 l4">
                  <input
                    defaultValue={
                      UserInfo && UserInfo.last_benpos_date
                        ? moment(UserInfo.last_benpos_date).format("DD-MM-YYYY")
                        : ""
                    }
                    id="last_benpos_date"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="current_benpos">
                    Current BENPOS
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.email}
                    id="email"
                    type="email"
                    class="validate"
                    required
                  />
                  <label className="active" for="email">
                    EMAIL_ID
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.phone}
                    id="phone"
                    type="number"
                    class="validate"
                  />
                  <label className="active" for="mobile">
                    Mobile NO
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="input-field col s6 m6 l6">
                  <input
                    id="last_institute"
                    type="text"
                    class="validate"
                    value={UserInfo && UserInfo.last_institute}
                    required
                  />
                  <label className="active" for="last_institute">
                    Last Institute
                  </label>
                </div>
                <div class="input-field col s6 m6 l6">
                  <input
                    value={UserInfo && UserInfo.last_employer}
                    id="last_employer"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="last_employer">
                    Last Employer
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.other_identifier_type}
                    disabled
                    id="last_employer"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="last_employer">
                    Other Identifier Type
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.other_identifier_no}
                    disabled
                    id="last_employer"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="last_employer">
                    Other Identifier Number
                  </label>
                </div>
                <div class="input-field col s4 m4 l4">
                  <input
                    value={UserInfo && UserInfo.category}
                    disabled
                    id="last_employer"
                    type="text"
                    class="validate"
                  />
                  <label className="active" for="last_employer">
                    Category
                  </label>
                </div>
              </div>

              {/*....................relative part  map.....................*/}

              {UserInfo &&
                UserInfo.Relatives &&
                UserInfo.Relatives.map((user, index) => (
                  <div className="row" style={{ margin: 10 }}>
                    <div className="row">
                      <div className="input-field col s12 m12 l12">
                        <h6>
                          <span>
                            ................................................................................{" "}
                            Relative {index + 1}{" "}
                            ..................................................................................................
                          </span>
                        </h6>
                      </div>
                      <div className="input-field col s6 m6 l6">
                        <input
                          type="text"
                          id={"name" + "-"}
                          value={user.name}
                          required
                        />
                        <label className="active" for={"name" + "-"}>
                          Relative name
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="text"
                          id={"email" + "-"}
                          value={user.email}
                          required
                        />
                        <label className="active" for={"email" + "-"}>
                          Email
                        </label>
                      </div>
                      <div className="input-field col s2 m2 l2">
                        <input
                          type="text"
                          id={"status" + "-"}
                          value={user.status}
                          required
                        />
                        <label className="active" for={"status" + "-"}>
                          Status
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="number"
                          id={"phone" + "-" /*+ index*/}
                          value={user.phone}
                          required
                        />
                        <label
                          className="active"
                          for={"phone" + "-" /*+ index*/}
                        >
                          Phone Number
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="text"
                          id={"pan-" /*+ index*/}
                          value={user.pan}
                          required
                        />
                        <label className="active" for={"pan-" /*+ index*/}>
                          PAN No.
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="number"
                          id={"current_share" + "-" /*+ index*/}
                          value={user.total_share}
                          required
                        />
                        <label
                          className="active"
                          for={"current_share" + "-" /*+ index*/}
                        >
                          Current Share
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="text"
                          id={"last_benpos_date-" /*+ index*/}
                          defaultValue={
                            user.last_benpos_date
                              ? moment(user.last_benpos_date).format(
                                  "DD-MM-YYYY"
                                )
                              : ""
                          }
                          required
                        />
                        <label
                          className="active"
                          for={"current_benpos_date-" /*+ index*/}
                        >
                          BENPOS Date
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="text"
                          id={"emp_sub_code" + "-" /*+ index*/}
                          value={user.emp_sub_code}
                          required
                        />
                        <label
                          className="active"
                          for={"emp_sub_code" + "-" /*+ index*/}
                        >
                          Emp sub code
                        </label>
                      </div>
                      <div className="input-field col s4 m4 l4">
                        <input
                          type="text"
                          id={"relation-"}
                          value={user.relation}
                          required
                        />
                        <label className="active" for={"relation-"}>
                          Relation
                        </label>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id={"folio-1"}
                            type="text"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[0] &&
                              user.Folios[0].folio
                            }
                          />
                          <label className="active" for={"folio-1"}>
                            FOLIO 1 <span>(Folio or DpId+ClientId)</span>
                          </label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                          <input
                            id={"current_share-1"}
                            type="number"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[0] &&
                              user.Folios[0].current_share
                            }
                          />
                          <label className="active" for={"current_shrare-1"}>
                            Number of Shares
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id={"folio-2"}
                            type="text"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[1] &&
                              user.Folios[1].folio
                            }
                          />
                          <label className="active" for={"folio-2"}>
                            FOLIO 2 <span>(Folio or DpId+ClientId)</span>
                          </label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                          <input
                            id={"current_share-2"}
                            type="number"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[1] &&
                              user.Folios[1].current_share
                            }
                          />
                          <label className="active" for={"current_share-2"}>
                            Number of Shares
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id={"folio-3"}
                            type="text"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[2] &&
                              user.Folios[2].folio
                            }
                          />
                          <label className="active" for={"folio-3"}>
                            FOLIO 3 <span>(Folio or DpId+ClientId)</span>
                          </label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                          <input
                            id={"current_share-3"}
                            type="number"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[2] &&
                              user.Folios[2].current_share
                            }
                          />
                          <label className="active" for={"current_share-3"}>
                            Number of Shares
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id={"folio-4"}
                            type="text"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[3] &&
                              user.Folios[3].folio
                            }
                          />
                          <label className="active" for={"folio-4"}>
                            FOLIO 4 <span>(Folio or DpId+ClientId)</span>
                          </label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                          <input
                            id={"current_share-4"}
                            type="number"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[3] &&
                              user.Folios[3].current_share
                            }
                          />
                          <label className="active" for={"current_share-4"}>
                            Number of Shares
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id={"folio-5"}
                            type="text"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[4] &&
                              user.Folios[4].folio
                            }
                          />
                          <label className="active" for={"folio-5"}>
                            FOLIO 5 <span>(Folio or DpId+ClientId)</span>
                          </label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                          <input
                            id={"current_share-5"}
                            type="number"
                            class="validate"
                            value={
                              user.Folios &&
                              user.Folios[4] &&
                              user.Folios[4].current_share
                            }
                          />
                          <label className="active" for={"current_share-5"}>
                            Number of Shares
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div class="input-field col s6 m6 l6">
                          <input
                            id="last_institute"
                            type="text"
                            class="validate"
                            disabled
                            value={user.last_institute}
                            required
                          />
                          <label className="active" for="last_institute">
                            Last Institute
                          </label>
                        </div>
                        <div class="input-field col s6 m6 l6">
                          <input
                            value={user.last_employer}
                            disabled
                            id="last_employer"
                            type="text"
                            class="validate"
                          />
                          <label className="active" for="last_employer">
                            Last Employer
                          </label>
                        </div>
                        <div class="input-field col s6 m6 l6">
                          <input
                            value={user.other_identifier_type}
                            disabled
                            id="last_employer"
                            type="text"
                            class="validate"
                          />
                          <label className="active" for="last_employer">
                            Other Identifier Type
                          </label>
                        </div>
                        <div class="input-field col s6 m6 l6">
                          <input
                            value={user.other_identifier_no}
                            disabled
                            id="last_employer"
                            type="text"
                            class="validate"
                          />
                          <label className="active" for="last_employer">
                            Other Identifier Number
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </fieldset>
          </form>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves btn-flat">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
