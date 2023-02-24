import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import AddModal from "../layout/AddModal";
import TopNav from "../layout/TopNav";
import RelativeModal from "../layout/RelativeModal";

export class UserList extends Component {
  state = {
    relatives:[],
    user: [
      {
        id: 1,
        name: "Mr. Prakash",
        pan: "556ASDVB8",
        broker: "Ashis Bakshi",
        email: "p.a@abc.com",
        phone: 123456787,
        dipository: "avcbsd",
        tanum: "27YYUIY8970",
        relation:"father"
      },
      {
        id: 2,
        name: "Mr. Anand",
        pan: "556ASDVB8",
        broker: "Ashis Bakshi",
        email: "a.b@abc.com",
        phone: 123456787,
        dipository: "avcbsd",
        tanum: "27YYUIY8970",
        relation:"father"
      },
      {
        id: 3,
        name: "Mr. Bikash",
        pan: "556ASDVB8",
        broker: "Ashis Bakshi",
        email: "b.s@abc.com",
        phone: 123456787,
        dipository: "avcbsd",
        tanum: "27YYUIY8970",
        relation:"father"
      },
    ],
  };
  componentDidMount = () => {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {
      preventScrolling: false,
    });
  };
  render() {
    return (
      <div>
        <RelativeModal state={this.props.state} addRelative={()=>{}}/>
        <ul class="collapsible container">
          {this.state.user.map((user) => (
            <li>
              <div class="collapsible-header">
                <i class="material-icons">face</i>
                <div className="row">
                <span className="col s6 m6 l6">{user.name}</span>
                <span className="col s6 m6 l6">{user.email}</span>
                </div>
              </div>
              <div class="collapsible-body">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Relation:{" " + user.relation}</span>
                  <span>Phone:{" " + user.phone}</span>
                  <span>PAN:{" " + user.pan}</span>
                </div>
                <br />
                {/* <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Broker:{" " + user.broker}</span>
                  <span>Dipository:{" " + user.dipository}</span>
                  <span>Trading Account Number:{" " + user.tanum}</span>
                </div> */}
                <div style={{paddingTop: 15}}>
                    <button
                      className="btn right modal-trigger"
                      data-target="relative-modal"
                      onClick={this.props.editUser}
                    >
                      Edit Info
                    </button>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
