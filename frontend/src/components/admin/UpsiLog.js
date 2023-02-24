import React from "react";
import moment from "moment";
import TableView from "../layout/TableView";
import { getDateString } from "../../utils/helper";

export const UpsiLog = ({
  upsiList,
  handelChange,
  handleSearch,
  handleUploadDate,
  handleSearchWithDate,
  onDownloadUPSI,
  state,
  userDetails,
  onOpenConversation,
}) => {
  var field1 = state.startDate.split("-").reverse().join("-");
  var field = state.endDate.split("-").reverse().join("-");
  return (
    <div>
      <div className="row container">
        <div
          className="row item-header"
          style={{ width: "100%", marginLeft: 20 }}
        >
          <b>UPSI Log</b>
        </div>
        <div className="col s5 m5 l5">
          <label>Previous Date </label>
          <input
            id="start_date"
            type="date"
            defaultValue={field1}
            onChange={handleUploadDate}
          />
        </div>
        <div className="col s5 m5 l5">
          <label>Current Date</label>
          <input
            id="end_date"
            type="date"
            defaultValue={field}
            onChange={handleUploadDate}
          />
        </div>
        <div className="col s2 m2 l2 right">
          <button
            className="btn btn-button"
            style={{ "margin-top": 30 }}
            onClick={handleSearchWithDate}
          >
            <i
              className="material-icons right"
              style={{ "margin-top": 1, "margin-right": 12 }}
            >
              search
            </i>
          </button>
        </div>
        <div className="row">
          <div
            className="col s9 m9 l9 input-field search-box"
            style={{ marginTop: "-6px", marginLeft: "13px" }}
          >
            <input
              className="serach-input"
              id="query"
              type="text"
              onChange={handelChange}
              placeholder="Search your word"
            />
          </div>
          <div className="col s1 m1 l1">
            <i
              className="material-icons right"
              style={{ "margin-top": 8, "margin-right": 51 }}
            >
              search
            </i>
          </div>
        </div>
        <div className="col s11 m11 l11">
          <span
            className="left"
            style={{
              marginTop: 21,
              marginBottom: -18,
              fontWeight: 600,
            }}
          >
            Total Data:{" "}
            {upsiList &&
              handleSearch(upsiList, state.query, [
                "createdAt",
                "shared_by",
                "shared_with",
                "subject",
                "information",
              ]).length}
          </span>
        </div>
        <div className="col s1 m1 l1">
          <button
            className="btn-floating btn-button"
            onClick={onDownloadUPSI}
            title="Download Benpose Comparison Report"
          >
            <i class="material-icons" style={{ color: "black" }}>
              download
            </i>
          </button>
        </div>
      </div>
      <div className="clientRequest container">
        {upsiList && upsiList.length > 0 ? (
          <div className="tableView responsive-table-div">
            <table class="responsive-table highlight">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Timestamp </th>
                  <th>Sender(PAN)</th>
                  <th>Receiver(PAN)</th>
                  <th>
                    Information
                    <br />
                    Shared
                  </th>
                  {userDetails?.is_compliance ? (
                    <th>
                      Conversations <br />& Time
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {handleSearch(upsiList, state.query, [
                  "createdAt",
                  "shared_by",
                  "shared_with",
                  "subject",
                  "information",
                ])
                  .sort((a, b) =>
                    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
                  )
                  ?.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{getDateString(new Date(d.createdAt), true)}</td>
                      <td>{d.shared_by}</td>
                      <td>
                        {userDetails?.is_compliance ||
                        d.shared_by.includes(userDetails?.pan)
                          ? d.shared_with
                          : userDetails?.name + "(" + userDetails?.pan + ")"}
                      </td>
                      <td>{d.subject}</td>
                      {userDetails?.is_compliance ? (
                        <td>
                          <a
                            className="btn-floating center btn-small"
                            data-target="UpsiConversationLogModal"
                            id={d.id}
                            onClick={(e) => {
                              onOpenConversation(e, d);
                            }}
                          >
                            <i class="material-icons">sms</i>
                          </a>
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span style={{ fontWeight: 600, fontSize: 20 }}>No Data Found</span>
        )}
      </div>
    </div>
  );
};
