import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SiteConfig } from "../../config/siteConfig";

class DashboardComponent extends Component {
  title = SiteConfig.title;

  componentDidMount() {
    document.title = "Dashboard - " + this.title;
    console.log(this.props.location.source);
  }

  render() {
    return (
      <section className="section-100">
        <h1>Dashboard</h1>
      </section>
    );
  }
}

export default withRouter(DashboardComponent);
