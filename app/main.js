import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import store from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "./styles/style.scss";

ReactDOM.render((
   <Provider store={store}>
      <div id="outer-container" style={{ height: "100%" }}>
        <Router>
          <div>
            <div id="page-wrap" className="global-bg">
              {/* <DocumentMeta {...basic.metaObj} /> */}
              <Route path="/" component={App} />
            </div>
          </div>
        </Router>
      </div>
  </Provider>
), document.getElementById("body"));