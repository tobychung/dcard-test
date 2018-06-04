import React, { Component } from "react";
import { compose } from "redux";
import { Switch, Route, Redirect } from "react-router";
import { connect } from "react-redux";
import IndexPage from "./containers/IndexPage";

class App extends Component {

  render = () => {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={IndexPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({
  
});

export default compose(
  connect(mapStateToProps),
)(App);
