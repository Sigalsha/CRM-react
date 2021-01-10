import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { badges } from "../../utils/consts";
import Badges from "./badges/Badges";
import "../../styles/analytics/analytics.css";
import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import { clientsHeaders } from "../../utils/consts";
import {
  faUsers,
  faEnvelope,
  faUserPlus,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let data = call.getClients();
      this.setState({
        loading: false,
        clients: data,
        /*         owners: utils.reduceDuplications(
          utils.getClientProperty(clientsHeaders["owner"], data)
        ),
        currentClient: "", */
      });
    }, 1000);
  }

  getBadges = () => {
    return [
      {
        id: 1,
        name: "newClients",
        icon: faUsers,
        header: "New Clients",
        description: "new clients joined this month",
      },
      {
        id: 2,
        name: "emailsSent",
        icon: faEnvelope,
        header: "Emails Sent",
        description: "",
      },
      {
        id: 3,
        name: "targetClients",
        icon: faUserPlus,
        header: "Target Clients",
        description: "clients without acquisition",
      },
      {
        id: 4,
        name: "hottestCountry",
        icon: faGlobeAmericas,
        header: "Hottest Country",
        description: "",
      },
    ];
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="loader-position">
          <Loader type="Puff" color="#00BFFF" height={150} width={150} />
        </div>
      );
    }

    return (
      <div id="analytics-container">
        <Badges badges={this.getBadges()} />
      </div>
    );
  }
}

export default Analytics;
