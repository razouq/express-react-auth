import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Route path="/login">
        <Login />
      </Route>
    </Router>
  );
};

export default App;
