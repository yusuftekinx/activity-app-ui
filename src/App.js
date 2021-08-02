import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Entry from "./Components/Entry/Entry.jsx";
import Home from "./Components/Home/Home";

function App() {
  let getToken = () => {
    return localStorage.getItem("token");
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          {getToken() === null ? (
            <div>
              <Route exact path="/" component={Entry}></Route>
              <Route exact path="/login" component={Entry}></Route>
              <Route exact path="/home">
                <Redirect to="/login" />
              </Route>
            </div>
          ) : (
            <div>
              <Route exact path="/home" component = {Home}>
              </Route>
              <Route exact path="/" component = {Home}>
              </Route>
              <Route exact path="/login">
                <Redirect to = "/home" />
              </Route>
            </div>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
