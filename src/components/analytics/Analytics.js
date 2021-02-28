import React, { Component } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import {
  faUsers,
  faEnvelope,
  faUserPlus,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";
import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import { URL, COLORS } from "../../utils/consts";
import "../../styles/analytics/analytics.css";
import TopEmployees from "./charts/TopEmployees";
import SalesByMonth from "./charts/SalesByMonth";
import ClientAcquisition from "./charts/ClientAcquisition";
import SalesByCategory from "./charts/SalesByCategory";
import Badges from "./Badges";
class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => {
        console.log("res from clients backend: ", res.data.data);
        if (res.data.data.length) {
          const { data } = res.data;
          this.setState({ loading: false, clients: data });
        }
      })
      .catch((err) => {
        console.log("err from clients backend: ", err);
      });

    /*     setTimeout(() => {
      let data = call.getClients();
      this.setState({
        loading: false,
        clients: data,
      });
    }, 1000); */
  }

  getBadges = () => {
    const { clients } = this.state;
    return [
      {
        id: 1,
        name: "longTimeClients",
        icon: faUsers,
        header: "Long-time Clients",
        description: "Clients who joined before 2018",
        result: clients.filter((c) => utils.isFrom2018(c.firstContact, true))
          .length,
      },
      {
        id: 2,
        name: "emailsSent",
        icon: faEnvelope,
        header: "Emails Sent",
        description: "Number of emails sent in total",
        result: clients.filter((c) => c.emailType !== null).length,
      },
      {
        id: 3,
        name: "targetClients",
        icon: faUserPlus,
        header: "Target Clients",
        description: "Clients without acquisition",
        result: utils.getSales(clients, false).length,
      },
      {
        id: 4,
        name: "hottestCountry",
        icon: faGlobeAmericas,
        header: "Hottest Country",
        description: "Country with highest sales",
        result: utils.getTopSalesByKey(
          utils.getSalesByProperty("country", clients)
        ),
      },
    ];
  };

  getSalesOf2018 = () => {
    const { clients } = this.state;
    return utils
      .getSales(clients, true)
      .filter((c) => utils.isFrom2018(c.firstContact, false));
  };

  getSalesByYear = () => {
    const { clients } = this.state;
    return utils.getSales(clients, true).map((c) => c.firstContact.slice(0, 4));
  };

  getSalesByClientsCategory(clientsByCategory) {
    const data = [];
    for (const [key, value] of Object.entries(clientsByCategory)) {
      data.push({
        name: key,
        sales: value,
      });
    }
    return data;
  }

  render() {
    const { loading, clients } = this.state;

    if (loading) {
      return (
        <div id="loader-position">
          <Loader
            type="Puff"
            color={COLORS["yellow"]}
            height={200}
            width={200}
          />
        </div>
      );
    }

    return (
      <div id="analytics-container">
        <Badges badges={this.getBadges()} />
        <div className="charts-container">
          <TopEmployees
            owners={utils.countSalesByKey(
              utils.getSalesByProperty("owner", clients)
            )}
            getOwners={this.getSalesByClientsCategory}
          />
          <SalesByMonth sales={this.getSalesOf2018()} />
          <SalesByCategory
            clients={clients}
            owners={utils.countSalesByKey(
              utils.getSalesByProperty("owner", clients)
            )}
            getSalesByCategory={this.getSalesByClientsCategory}
            countries={utils.countSalesByKey(
              utils.getSalesByProperty("country", clients)
            )}
            emailTypes={utils.countSalesByKey(
              utils.getSalesByProperty("emailType", clients)
            )}
            years={utils.countSalesByKey(this.getSalesByYear())}
          />
          <ClientAcquisition
            sales={utils.getSales(clients, true)}
            salesOf2018={this.getSalesOf2018()}
            years={utils.countSalesByKey(this.getSalesByYear())}
            getSalesByCategory={this.getSalesByClientsCategory}
          />
        </div>
      </div>
    );
  }
}

export default Analytics;
