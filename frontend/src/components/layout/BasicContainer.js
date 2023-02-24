import React, { Component } from "react";
import { connect } from "react-redux";

class BasicContainer extends Component {
  render() {
    if (
      this.props.uploadBulkEmployeeLoading ||
      this.props.emailPanRequestLoading ||
      this.props.resestPassLoading
    ) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    uploadBulkEmployeeLoading: state.Hod.uploadBulkEmployeeLoading,
    emailPanRequestLoading: state.Hod.emailPanRequestLoading,
    resestPassLoading: state.Hod.resestPassLoading,
    releseKmpLoading: state.Hod.releseKmpLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicContainer);
