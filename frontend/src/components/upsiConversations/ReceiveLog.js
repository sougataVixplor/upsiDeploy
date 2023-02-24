import React, { Component } from "react";
import { connect } from "react-redux";
import { getUpsi } from "../../store/action/HodAction";
import {
  getDateString,
  getEndDate,
  getStartDate,
  handleSearch,
} from "../../utils/helper";
import Conversation from "./Conversation";
import M from "materialize-css";
import { toogleConversationFlag } from "../../store/action/CommonAction";

class ReceiveLog extends Component {
  state = {
    start_date: getStartDate(),
    end_date: getEndDate(),
  };

  componentDidMount = () => {
    this.props.GetUpsi(
      this.state.start_date,
      this.state.end_date,
      this.props.user.accessToken
    );
    this.setState({ mountFlag: true });
  };

  componentDidUpdate = () => {
    if (
      this.state.mountFlag &&
      this.props.upsiFetchSuccess &&
      this.props.query?.type === "upsi_conversation" &&
      this.props.query?.category === "receive"
    ) {
      this.setState({
        mountFlag: false,
        upsiDetail: {
          ...this.props.upsiList.find((f) => f.id == this.props.query?.upsi_id),
          type: "receive",
        },
      });
      this.props.ToogleConversationFlag(true);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onConversation = (e, d) => {
    this.setState({ upsiDetail: { ...d, type: "receive" } });
    this.props.ToogleConversationFlag(true);
  };

  render() {
    console.log("state", this.state);
    console.log("props", this.props);

    const data = handleSearch(this.props.upsiList, this.state.query, [
      "createdAt",
      "shared_by",
      "subject",
    ])?.filter((f) =>
      f.shared_with?.includes(this.props.userData?.userDetails?.pan)
    );

    if (this.props.upsiFetchLoading) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
    if (this.state.upsiDetail && this.props.toogleConversationFlag) {
      return <Conversation upsiDetail={this.state.upsiDetail} />;
    }
    return (
      <div>
        <div className="row container">
          <div
            className="row item-header"
            style={{ width: "100%", marginLeft: 20 }}
          >
            <b>UPSI Receive Log</b>
          </div>
          <div className="col s5 m5 l5">
            <label>Previous Date </label>
            <input
              id="start_date"
              value={this.state.start_date}
              type="date"
              onChange={this.onChange}
            />
          </div>
          <div className="col s5 m5 l5">
            <label>Current Date</label>
            <input
              id="end_date"
              value={this.state.end_date}
              type="date"
              onChange={this.onChange}
            />
          </div>
          <div className="col s2 m2 l2 right">
            <button
              className="btn btn-button"
              style={{ "margin-top": 30 }}
              onClick={null}
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
                onChange={this.onChange}
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
              Total Data: {data?.length}
            </span>
          </div>
        </div>
        <div className="clientRequest container">
          {data && (
            <div className="tableView" style={{ overflowX: "scroll" }}>
              {data.length > 0 ? (
                <table className="responsive-table highlight">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Timestamp</th>
                      <th>Shared By</th>
                      <th>Conversations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{d.subject}</td>
                        <td>
                          {d.createdAt
                            ? getDateString(new Date(d.createdAt), true)
                            : null}
                        </td>
                        <td>{d.shared_by}</td>
                        <td>
                          <a
                            className="btn-floating center btn-small"
                            id={d.id}
                            onClick={(e) => this.onConversation(e, d)}
                          >
                            <i class="material-icons">sms</i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <span style={{ fontWeight: 600, fontSize: 20 }}>
                  No Data Found
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    userData: state.auth.data,

    upsiList: state.Hod.upsiList.data,
    upsiFetchSuccess: state.Hod.upsiFetchSuccess,
    upsiFetchError: state.Hod.upsiFetchError,
    upsiFetchLoading: state.Hod.upsiFetchLoading,

    query: state.common.query,

    toogleConversationFlag: state.common.toogleConversationFlag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetUpsi: (start_date, end_date, token) => {
      dispatch(getUpsi(start_date, end_date, token));
    },
    ToogleConversationFlag: (flag) => {
      dispatch(toogleConversationFlag(flag));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveLog);
