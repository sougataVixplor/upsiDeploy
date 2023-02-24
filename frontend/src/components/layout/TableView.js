import React, { Component } from "react";
import { connect } from "react-redux";

export class TableView extends Component {
  render() {
    return (
      <div className="tableView" style={{ overflowX: "scroll" }}>
        <table class="responsive-table highlight">
          <thead>
            <tr>
              {this.props.headers.map((h, i) => (
                <th key={"ac-" + i}>{h.name}</th>
              ))}
              {this.props.actions
                ? this.props.actions.map((h) => <th>{h.name}</th>)
                : null}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((row, row_index) => (
              <tr key={"row-" + row_index}>
                {this.props.headers.map((h, col_index) => (
                  <td
                    key={"row-" + row_index + "-col-" + col_index}
                    id={row.id}
                    onClick={this.props.view}
                  >
                    {h.name == "Sl. No." ? h.key(row_index) : h.key(row)}
                  </td>
                ))}
                {this.props.actions ? (
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      "justify-content": "space-between",
                      //height: "23vh",
                      width: this.props.actionWidth,
                    }}
                  >
                    {this.props.actions.map((a) =>
                      a.key.map((e) => (
                        <span>
                          {e.name == "view" ? (
                            <a
                              className="btn-floating right btn-small  modal-trigger"
                              //data-position="left"
                              title="View"
                              data-target="view-cp-modal"
                              onClick={() => {
                                e.f(row.id);
                              }}
                              disabled={
                                row.is_active == true && row.status == "Active"
                                  ? false
                                  : true
                              }
                            >
                              <i
                                class="material-icons"
                                id={row.id}
                                //style={{ color: "black" }}
                              >
                                remove_red_eye
                              </i>
                            </a>
                          ) : e.name == "delete" ? (
                            <a
                              className="btn-floating right btn-small  modal-trigger"
                              id="Delete"
                              //data-position="left"
                              title="Delete"
                              data-target="delete-user-modal"
                              onClick={() => {
                                e.f(row.id);
                              }}
                              disabled={
                                row.is_active == true && row.status == "Active"
                                  ? false
                                  : true
                              }
                            >
                              <i
                                class="material-icons"
                                id={row.id}
                                //style={{ color: "black" }}
                              >
                                delete
                              </i>
                            </a>
                          ) : e.name == "reset_pass" ? (
                            <a
                              className="btn-floating right btn-small "
                              //data-position="left"
                              id={row.id}
                              title="Reset Password"
                              onClick={() => {
                                e.f(row.id);
                              }}
                              disabled={
                                row.is_active == true && row.status == "Active"
                                  ? false
                                  : true
                              }
                            >
                              <i
                                class="material-icons"
                                id={row.id}
                                //style={{ color: "black" }}
                              >
                                code
                              </i>
                            </a>
                          ) : e.name == "fillnext" &&
                            row.request_status == "Approved" &&
                            !this.props.user.is_compliance ? (
                            (new Date(
                              this.props.company.window_close_from
                            ).getTime() > new Date().getTime() ||
                              new Date().getTime() >
                                new Date(
                                  this.props.company.window_close_to
                                ).getTime()) && (
                              <a
                                className="btn-floating right btn-small modal-trigger"
                                data-target="after-transaction-modal"
                                title="Fill Transaction Details"
                                onClick={() => {
                                  e.f(row_index);
                                }}
                                style={{ "margin-top": "98%" }}
                              >
                                <i class="material-icons">chevron_right</i>
                              </a>
                            )
                          ) : e.name == "approve" &&
                            row.request_status == "Pending" ? (
                            <a
                              className="btn-floating btn-small right btn-button"
                              id={this.props.data[row_index].id}
                              title="Approved"
                              onClick={e.f}
                            >
                              <i
                                class="material-icons small"
                                id={this.props.data[row_index].id}
                                style={{ color: "white" }}
                              >
                                done_all
                              </i>
                            </a>
                          ) : e.name === "reject" &&
                            row.request_status == "Pending" ? (
                            <a
                              className="btn-floating btn-small right btn-button modal-trigger"
                              // //data-position="left"
                              // title="Reject"
                              data-target="RequestRejectReasonModal"
                              onClick={(event) => e.f(event, row)}
                              id={this.props.data[row_index].id}
                            >
                              <i
                                class="material-icons small"
                                id={this.props.data[row_index].id}
                                style={{ color: "white" }}
                              >
                                clear
                              </i>
                            </a>
                          ) : e.name === "download" &&
                            row.request_status == "Completed" ? (
                            <a
                              class="btn-floating btn-small waves-effect waves-light"
                              onClick={() => {
                                e.f(this.props.data[row_index].id);
                              }}
                            >
                              <i class="material-icons">
                                vertical_align_bottom
                              </i>
                            </a>
                          ) : e.name === "correction" ? (
                            <a
                              className="btn-floating right btn-small modal-trigger"
                              data-target="view-correction-request-modal"
                              title="Correction Modal"
                              id={row.id}
                              onClick={e.f}
                            >
                              <i class="material-icons" id={row.id}>
                                chevron_right
                              </i>
                            </a>
                          ) : e.name == "switch" ? (
                            <a
                              className="btn-floating right btn-small "
                              //data-position="right"
                              title={
                                row.canEdit ? "Disable Edit" : "Enable Edit"
                              }
                              id={row.id}
                              onClick={(event) => e.f(event, row)}
                            >
                              <i class="material-icons" id={row.id}>
                                {row.canEdit ? "clear" : "edit"}
                              </i>
                            </a>
                          ) : e.name == "upsiEnableswitch" ? (
                            <a
                              className="btn-floating right btn-small "
                              //data-position="right"
                              title={row.upsi ? "Disable UPSI" : "Enable UPSI"}
                              id={row.id}
                              onClick={(event) => e.f(event, row)}
                            >
                              <i class="material-icons" id={row.id}>
                                {row.upsi ? "clear" : "wysiwyg"}
                              </i>
                            </a>
                          ) : null}
                        </span>
                      ))
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("here", state);
  return {
    user: state.auth.user,
    company: state.common.getCompanyData,
  };
};

export default connect(mapStateToProps)(TableView);
