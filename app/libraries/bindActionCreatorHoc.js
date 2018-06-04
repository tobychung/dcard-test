import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Result from "../actions/Result";


// ================================================== //
export default function bindActionCreatorHoc(WrappedComponent) {
  class Wrapper extends React.Component {
    render = () => (<WrappedComponent {...this.props} />);
  }

  const mapDispatchToProps = dispatch => ({
    resultAction: bindActionCreators(Result, dispatch),
  });
  return connect(null, mapDispatchToProps)(Wrapper);
}
