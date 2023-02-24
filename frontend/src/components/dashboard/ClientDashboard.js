import React, { Component } from "react";
import { LeftBar } from "../layout/LeftBar";
import M from "materialize-css";
import { UserList } from "../client/UserList";
import { connect } from "react-redux";
import TopNav from "../layout/TopNav";
import { Redirect } from "react-router";
import UserInfo from "../client/UserInfo";
import { clientRequest } from "../../store/action/ClientAction";

class ClientDashboard extends Component {
  state = {
    addUser: false,
    chooseFlag: "",
  };
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {
      preventScrolling: false,
    });
  };
  editUser = (e) => {
    this.setState({ addUser: false });
  };
  handleChoose = (e) => {
    this.setState({ chooseFlag: e.target.id });
  };
  handleChange = (e) => {
    console.log("sdjkfb", e.target.id);
    this.setState({ [e.target.id]: e.target.value });
  };
  handleRequest = (e) => {
    console.log("state", this.state);
  };
  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div className="row">
        <TopNav />
        <UserInfo />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    common: state.common.leftBarItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ClientRequest: (body) => {
      dispatch(clientRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
