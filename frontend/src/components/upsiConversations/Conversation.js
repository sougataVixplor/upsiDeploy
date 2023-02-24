import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { setQuery } from "../../store/action/CommonAction";
import {
  createConversation,
  getConversations,
} from "../../store/action/HodAction";
import { encryptData, getParenthesis } from "../../utils/helper";
import ConversationCard from "./ConversationCard";

class Conversation extends Component {
  state = {};

  componentDidMount = () => {
    if (this.props.query?.type === "upsi_conversation") {
      this.props.SetQuery(null);
    }

    if (this.props.upsiDetail.type === "receive") {
      this.props.GetConversation(
        {
          sender_id: getParenthesis(this.props.upsiDetail.shared_by),
          receiver_id: this.props.userData.userDetails.pan,
          upsi_id: this.props.upsiDetail.id,
        },
        this.props.user.accessToken
      );
    } else {
      this.props.GetConversation(
        {
          sender_id: this.props.userData.userDetails.pan,
          receiver_id: getParenthesis(this.props.upsiDetail.sentTo),
          upsi_id: this.props.upsiDetail.id,
        },
        this.props.user.accessToken
      );
    }
  };

  componentDidUpdate = () => {
    if (this.state.submitFlag && this.props.createConversationSuccess) {
      this.setState({ submitFlag: false, information: null });
      swal("Success", this.props.createConversationMsg, "success");
      if (this.props.upsiDetail.type === "receive") {
        this.props.GetConversation(
          {
            sender_id: getParenthesis(this.props.upsiDetail.shared_by),
            receiver_id: this.props.userData.userDetails.pan,
            upsi_id: this.props.upsiDetail.id,
          },
          this.props.user.accessToken
        );
      } else {
        this.props.GetConversation(
          {
            sender_id: this.props.userData.userDetails.pan,
            receiver_id: getParenthesis(this.props.upsiDetail.sentTo),
            upsi_id: this.props.upsiDetail.id,
          },
          this.props.user.accessToken
        );
      }
    }
    if (this.state.submitFlag && this.props.createConversationError) {
      this.setState({ submitFlag: false });
      swal("Oops!", this.props.createConversationMsg, "error");
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeFile = (e) => {
    if (e.target?.files[0]?.size > 35e6) {
      swal("Alert", "File size more than 30 MB is not supported", "info");
      document.getElementById(e.target.id).value = null;
    } else {
      this.setState({
        [e.target.id]: e.target.files[0],
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    var sender_id = this.props.userData.userDetails.pan;
    var receiver_id = null;
    if (this.props.upsiDetail.type === "receive") {
      receiver_id = getParenthesis(this.props.upsiDetail.shared_by);
    } else {
      receiver_id = getParenthesis(this.props.upsiDetail.sentTo);
    }
    this.props.CreateConversation(
      null,
      this.state.file,
      {
        information: encryptData(this.state.information),
        upsi_id: encryptData(String(this.props.upsiDetail.id)),
        sender_id: encryptData(sender_id),
        receiver_id: encryptData(receiver_id),
      },
      this.props.user.accessToken
    );
    this.setState({ submitFlag: true });
  };

  render() {
    console.log("state", this.state);
    console.log("props", this.props);
    if (
      this.props.getConversationLoading ||
      this.props.createConversationLoading
    ) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
    return (
      <div>
        <div className="row container">
          <div
            className="row item-header"
            style={{ width: "100%", marginLeft: 20 }}
          >
            <b>UPSI Conversation</b>
          </div>
          <div className="row">
            <div
              className="col s12 left left-align"
              style={{ marginLeft: "5%" }}
            >
              <label style={{ fontSize: "14px" }}>
                Subject : {this.props.upsiDetail.subject}
              </label>
            </div>
            <div
              className="col s12 left left-align"
              style={{ marginLeft: "5%" }}
            >
              <label style={{ fontSize: "14px" }}>
                Conversation With : &nbsp;
                {this.props.upsiDetail.type === "receive"
                  ? this.props.upsiDetail.shared_by.split("(")[0]
                  : this.props.upsiDetail.sentTo.split("(")[0]}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center center-align">
              <div
                className="tableView "
                style={{ overflowX: "scroll", height: "70vh" }}
              >
                {this.props.conversation
                  ?.sort(
                    (a, b) => new Date(a.createdAt) > new Date(b.createdAt)
                  )
                  ?.map((d, i) => (
                    <ConversationCard
                      label={d.Sender?.name + "(" + d.sender_id + ")"}
                      body={d.information}
                      time={d.createdAt}
                      key={i}
                    />
                  ))}
                <div
                  className="col s12"
                  style={{ marginLeft: "5%", paddingTop: "1%" }}
                >
                  <form id="conversation-form" onSubmit={this.onSubmit}>
                    <textarea
                      id="information"
                      value={this.state.information}
                      onChange={this.onChange}
                      placeholder="Type..."
                      style={{
                        resize: "none",
                        height: "135px",
                        marginLeft: "-10%",
                        width: "92%",
                      }}
                    />
                  </form>
                </div>
                <br />
                <div className="row">
                  <div className="col s6" style={{ marginLeft: "5%" }}>
                    <input
                      id="file"
                      accept=".*"
                      type="file"
                      className="left"
                      onChange={this.onChangeFile}
                    />
                  </div>
                  <div
                    className="col s6 right right-align"
                    style={{ marginRight: "5%", marginTop: "-3%" }}
                  >
                    <button
                      className="btn btn-button"
                      type="submit"
                      form="conversation-form"
                    >
                      Send
                    </button>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
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

    getConversationLoading: state.Hod.getConversationLoading,
    getConversationSuccess: state.Hod.getConversationSuccess,
    getConversationError: state.Hod.getConversationError,
    conversation: state.Hod.conversation,
    getConversationMsg: state.Hod.getConversationMsg,

    createConversationLoading: state.Hod.createConversationLoading,
    createConversationSuccess: state.Hod.createConversationSuccess,
    createConversationError: state.Hod.createConversationError,
    createConversationId: state.Hod.createConversationId,
    createConversationMsg: state.Hod.createConversationMsg,

    query: state.common.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetConversation: (query, token) => {
      dispatch(getConversations(query, token));
    },
    CreateConversation: (query, file, body, token) => {
      dispatch(createConversation(query, file, body, token));
    },
    SetQuery: (query) => {
      dispatch(setQuery(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
