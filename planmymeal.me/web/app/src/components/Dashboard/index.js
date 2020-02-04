import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/">Dashboard</Link>
      </div>
    );
  }
}
