import React, { Component } from "react";
import Loader from "react-loader-spinner";
import {
  faUsers,
  faEnvelope,
  faUserPlus,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";
import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import "../../styles/analytics/analytics.css";
import Badges from "./badges/Badges";
import TopEmployees from "./charts/TopEmployees";
import SalesByMonth from "./charts/SalesByMonth";
import ClientAcquisition from "./charts/ClientAcquisition";

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
        result: clients.filter((c) => utils.isFrom2018(c.firstContact, true))
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
        result: utils.getSales(clients, false).length,
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

  getSalesByYear = () => {
    const { clients } = this.state;
    return utils
      .getSales(clients, true)
      .filter((c) => utils.isFrom2018(c.firstContact, false));
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
        <div className="charts-wrapper">
          <TopEmployees
            owners={utils.countSalesByKey(
              utils.getSalesByProperty("owner", clients)
            )}
          />
          <SalesByMonth sales={this.getSalesByYear()} />
          <ClientAcquisition
            sales={utils.getSales(clients, true)}
            salesOf2018={this.getSalesByYear()}
          />
        </div>
      </div>
    );
  }
}

export default Analytics;
