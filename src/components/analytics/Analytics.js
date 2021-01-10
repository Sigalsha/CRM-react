import React, { Component } from "react";
import Loader from "react-loader-spinner";
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
import TopEmployees from "./charts/TopEmployees";

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
    const { clients } = this.state;
    return [
      {
        id: 1,
        name: "longTimeClients",
        icon: faUsers,
        header: "Long-time Clients",
        description: "clients who joined before 2018",
        result: clients.filter((c) => utils.isFromBefore2018(c.firstContact))
          .length,
      },
      {
        id: 2,
        name: "emailsSent",
        icon: faEnvelope,
        header: "Emails Sent",
        description: "",
        result: clients.filter((c) => c.emailType !== null).length,
      },
      {
        id: 3,
        name: "targetClients",
        icon: faUserPlus,
        header: "Target Clients",
        description: "clients without acquisition",
        result: utils.getSales(clients).length,
      },
      {
        id: 4,
        name: "hottestCountry",
        icon: faGlobeAmericas,
        header: "Hottest Country",
        description: "",
        result: utils.getTopSalesByKey(
          utils.getSalesByProperty("country", clients)
        ),
      },
    ];
  };

  render() {
    const { loading, clients } = this.state;

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
        <TopEmployees
          owners={utils.countSalesByKey(
            utils.getSalesByProperty("owner", clients)
          )}
        />
      </div>
    );
  }
}

export default Analytics;
