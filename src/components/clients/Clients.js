import React, { Component } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
// import call from "../../ApiCalls/ApiCalls";
// import utils from "../../utils/utils";
import { URL, COLORS } from "../../utils/consts";
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

  async componentDidMount() {
    this.getClientsFromServer();
    /* setTimeout(() => {
      let data = call.getClients();
      // localStorage.removeItem("currentFilters");
      this.setState(
        {
          loading: false,
          clients: data,
        },
        this.updateClientsDisplay
      );
    }, 1000); */
  }

  async getClientsFromServer() {
    axios
      .get(URL)
      .then((res) => {
        console.log("res from clients backend: ", res.data.data);
        if (res.data.data.length) {
          const { data } = res.data;
          this.setState(
            { loading: false, clients: data },
            this.updateClientsDisplay
          );
        }
      })
      .catch((err) => {
        console.log("err from clients backend: ", err);
      });
  }

  submitInputChange = (updatedClient) => {
    const { clientToEdit, showPopup } = this.state;

    axios
      .put(`${URL}${clientToEdit.id}`, updatedClient)
      .then((res) => {
        console.log("res from update client (put) backend ", res);
      })
      .catch((err) =>
        console.log("err from update client (put) backend ", err)
      );

    this.setState(
      {
        showPopup: !showPopup,
        clientToEdit: {
          id: null,
          name: "",
          country: "",
          owner: "",
          sold: false,
          emailType: null,
        },
      },
      this.getClientsFromServer
    );
  };

  toggleEditClient = (client = null) => {
    const { showPopup } = this.state;
    this.setState({
      showPopup: !showPopup,
      clientToEdit: client && {
        id: client.id ? client.id : "",
        name: client.name ? client.name : "",
        country: client.country ? client.country : "",
        owner: client.owner ? client.owner : "",
        emailType: client.emailType ? client.emailType : null,
        sold: client.sold ? client.sold : false,
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
    console.log("clientToEdit", clientToEdit);

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
