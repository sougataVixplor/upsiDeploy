import React from "react";
import { getDateString } from "../../utils/helper";

export default function UpsiConversationLogModal({ state, props }) {
  if (props.getConversationLoading)
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  return (
    <div id="UpsiConversationLogModal" className="modal conversation-modal">
      <div className="row modal-content">
        <div className="row modal-title center" style={{ paddingTop: 15 }}>
          <span>UPSI Conversation Log</span>
        </div>
        <div className="row">
          {props.conversation?.length > 0 ? (
            <table className="responsive-table highlight">
              <thead>
                <tr>
                  <td>From : </td>
                  <td>To : </td>
                  <td>Timestamp</td>
                </tr>
              </thead>
              <tbody>
                {props.conversation?.map((d, i) => (
                  <tr key={i}>
                    <td>{d.Sender?.name + " (" + d.Sender?.pan + ")"}</td>
                    <td>{d.Receiver?.name + " (" + d.Receiver?.pan + ")"}</td>
                    <td>{getDateString(new Date(d?.createdAt), true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>No Conversations</span>
          )}
        </div>
      </div>
      <div className="modal-footer" style={{ textAlign: "center" }}></div>
    </div>
  );
}
