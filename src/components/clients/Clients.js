import React, { Component } from "react";
import Loader from "react-loader-spinner";
import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import { COLORS } from "../../utils/consts";
import "../../styles/clients/clients.css";
import ColumnsHeader from "./ColumnsHeader";
import ClientsFilter from "./ClientsFilter";
import ClientsPagination from "./ClientsPagination";
import ClientRow from "./ClientRow";
import EditClientPopUp from "./EditClientPopUp";

const itemsPerPage = 20;

class Clients extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showPopup: false,
      clientToEdit: {},
      clients: [],
      pageCount: 0,
      pageLimit: 20,
      selectValue: "",
      clientsToDisplay: [],
      currentClients: [],
      currentFilters: {},
    };
  }

  // getClients = async ()  => {
  //     return axios.get('http://localhost:8100/clients')
  // }

  // async componentDidMount() {
  //     const response = await this.getClients()
  //     console.log(response)
  //     this.setState({
  //         loading: false,
  //         clients: response.data})
  // }

  async componentDidMount() {
    setTimeout(() => {
      let data = call.getClients();
      localStorage.removeItem("currentFilters");
      this.setState(
        {
          loading: false,
          clients: data,
        },
        this.updateClientsDisplay
      );
    }, 1000);
  }

  submitInputChange = (newObject) => {
    let { id, name, country } = newObject;
    const clients = [...this.state.currentClients];
    let index = utils.findClientIndexById(clients, id);
    let client = clients[index];
    client.name = name;
    client.country = country;
    this.setState({
      currentClients: clients,
      showPopup: !this.state.showPopup,
      clientToEdit: {
        id: null,
        name: "",
        sureName: "",
        country: "",
      },
    });
    /*put req. to the server, updating the client
            axios.put('http://localhost:8100/clients', {
                id: newObject.id,
                name: name,
                country: country
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
          */
  };

  toggleEditClient = (client = null) => {
    const { showPopup } = this.state;
    this.setState({
      showPopup: !showPopup,
      clientToEdit: client && {
        id: client.id,
        name: client.firstName,
        sureName: client.sureName,
        country: client.country,
      },
    });
  };

  updateDisplayByPage = (pageDirection, pageNum) => {
    const { pageLimit, clientsToDisplay, pageCount } = this.state;

    let currentPageDisplay = [];
    let currentPageLimit = pageLimit;
    let pageIndex = pageNum * itemsPerPage;

    // if specific page =>
    if (pageDirection === -1) {
      if (pageNum === 1) {
        currentPageDisplay = clientsToDisplay.slice(0, itemsPerPage);
        currentPageLimit = 20;
      } else {
        currentPageDisplay = this.updateCurrentPageDisplay(
          clientsToDisplay,
          itemsPerPage,
          pageIndex
        );
        currentPageLimit = currentPageLimit - itemsPerPage;
      }
    } else {
      if (pageNum >= pageCount) {
        currentPageLimit = pageCount * itemsPerPage;
      } else {
        currentPageLimit = currentPageLimit + itemsPerPage;
      }
      currentPageDisplay = this.updateCurrentPageDisplay(
        clientsToDisplay,
        itemsPerPage,
        pageIndex
      );
    }

    this.setState({
      currentClients: currentPageDisplay,
      pageLimit: pageIndex,
      isPageReset: false,
    });
  };

  updateCurrentPageDisplay = (clientsToDisplay, itemsPerPage, pageIndex) => {
    return clientsToDisplay.slice(pageIndex - itemsPerPage, pageIndex);
  };

  updateClientsDisplay = () => {
    const { clients, currentFilters } = this.state;

    let filtered = [];

    if (Object.entries(currentFilters).length === 0) {
      return this.setState({
        clientsToDisplay: [...clients],
        pageCount: this.updatePageCount([...clients]),
        currentClients: [...clients].slice(0, itemsPerPage),
      });
    } else {
      filtered = this.filterByProperty();
    }

    this.setState({
      clientsToDisplay: filtered,
      pageCount: this.updatePageCount(filtered),
      currentClients: filtered.slice(0, itemsPerPage),
      isPageReset: true,
      pageLimit: 20,
    });
  };

  updateSelectedFilter = (e) => {
    const { currentFilters } = this.state;
    const { value, name } = e.target;
    let filters = {};

    if (name && value) {
      if (value === "All") {
        filters[name] = "";
      } else if (name === "sold") {
        if (value === "Sold") {
          filters[name] = true;
        } else {
          filters[name] = false;
        }
      } else if (name === "emailType" && value === "No Type") {
        filters[name] = null;
      } else {
        filters[name] = value;
      }
    }

    this.setState(
      {
        currentFilters: { ...currentFilters, ...filters },
      },
      this.updateClientsDisplay
    );
  };

  filterByProperty = () => {
    const { clients, currentFilters } = this.state;
    let filteredClients = [...clients];

    for (let key in currentFilters) {
      if (currentFilters[key] !== "") {
        filteredClients = filteredClients.filter(
          (client) => client[key] === currentFilters[key]
        );
      }
    }
    return filteredClients;
  };

  updatePageCount = (clients) => {
    if (Math.ceil(clients.length / itemsPerPage) <= 1) {
      return 1;
    } else {
      return Math.ceil(clients.length / itemsPerPage);
    }
  };

  render() {
    const {
      loading,
      clients,
      pageLimit,
      selectValue,
      pageCount,
      currentClients,
      isPageReset,
      showPopup,
      clientToEdit,
    } = this.state;

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
      <div id="clients-container">
        <div className="clients-child">
          <ClientsFilter
            clients={clients}
            selectValue={selectValue}
            updateSelectedFilter={this.updateSelectedFilter}
          />
        </div>
        <div className="clients-child">
          <ClientsPagination
            updateDisplayByPage={this.updateDisplayByPage}
            pageLimit={pageLimit}
            pageCount={pageCount}
            isPageReset={isPageReset}
            clients={currentClients}
          />
        </div>
        <div className="clients-child">
          <table>
            <ColumnsHeader />
            <ClientRow
              submitInputChange={this.submitInputChange}
              clients={currentClients}
              toggleEditClient={this.toggleEditClient}
            />
          </table>
          {showPopup && (
            <EditClientPopUp
              clientToEdit={clientToEdit}
              toggleEditClient={this.toggleEditClient}
              submitInputChange={this.submitInputChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Clients;
