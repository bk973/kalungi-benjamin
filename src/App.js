import React from "react";
import client from "./utils/apollo";
import {gql} from "@apollo/client";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './routes';

class App extends React.Component
{
  render()
  {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}
export default App;
