import React from "react";
import { getDateString } from "../../utils/helper";

export default function ConversationCard(props) {
  return (
    <div
      className="col s12 center center-align z-depth-2"
      // key={props.key}
      style={{
        border: "solid rgb(213 213 213) 1px",
        borderRadius: "5px",
        width: "90%",
        marginLeft: "5%",
      }}
    >
      <div className="row">
        <div className="col s6 left left-align">
          <label style={{ fontSize: "15px", fontWeight: "500" }}>
            {props.label + " : "}
          </label>
        </div>
        <div className="col s6 right right-align">
          <label style={{ fontSize: "15px", fontWeight: "500" }}>
            {getDateString(new Date(props.time), true)}
          </label>
        </div>
        <div className="col s12 left left-align">{props.body}</div>
      </div>
    </div>
  );
}
