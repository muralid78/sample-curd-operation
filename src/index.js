import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/dashboard.scss";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/scss/main.css";
import "toastr/build/toastr.css";
import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
