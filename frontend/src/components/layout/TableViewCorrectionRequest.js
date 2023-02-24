import React, { Component } from "react";
import { connect } from "react-redux";
import { TableView } from "./TableView";

export class TableViewCorrectionRequest extends Component {
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
            {this.props.data.map((row, row_index) =>
              row.status == "Update" ? (
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
                    <td>
                      {this.props.actions.map((a) =>
                        a.key.map((e) => (
                          <span>
                            {e.name === "correction" ? (
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
                            ) : null}
                          </span>
                        ))
                      )}
                    </td>
                  ) : null}
                </tr>
              ) : null
            )}
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
  };
};

export default connect(mapStateToProps)(TableViewCorrectionRequest);
