import React, { Component } from "react";
import Search from "./Search.js";
import ColumnsHeader from "./ColumnsHeader.js";
import ClientData from "./ClientData.js";
import "../../styles/clients/clients.css";
import Loader from "react-loader-spinner";
import call from "../../ApiCalls/ApiCalls";
import ClientsFilter from "./ClientsFilter";
import ClientsPagination from "./ClientsPagination";
import utils from "../../utils/utils";
import { COLORS } from "../../utils/consts";
import ClientRow from "./ClientRow.js";
import EditClientPopUp from "./EditClientPopUp";

const itemsPerPage = 20;

class Clients extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showPopup: false,
      clientToEdit: {},
      searchInput: "",
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
    // TODO - check why client isn't get updated after setState of updated clients !!!
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

    /*
      if specific page => 
    */
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
    const {
      selectValue,
      searchInput,
      clients,
      pageLimit,
      currentFilters,
      clientsToDisplay,
    } = this.state;

    // let currentFilter = selectValue;
    // let filterValue = searchInput.toLowerCase();
    // let currentClients = clients && clients.slice(pageLimit - 20, pageLimit);
    let filtered = [];

    // const searchResults = this.searchBySearchInput(searchInput.toLowerCase());

    // console.log("this.state.currentFilters: ", currentFilters);

    if (Object.entries(currentFilters).length === 0) {
      return this.setState({
        clientsToDisplay: [...clients],
        pageCount: this.updatePageCount([...clients]),
        currentClients: [...clients].slice(0, itemsPerPage),
      });
    } else {
      filtered = this.filterByProperty();
      // console.log("filtered: ", filtered);
    }

    /*       if (!filterValue && !currentFilter && Object.entries(currentFilters).length === 0) {
        return this.setState({ clientsToDisplay: currentClients });
      } */

    this.setState({
      clientsToDisplay: filtered,
      pageCount: this.updatePageCount(filtered),
      currentClients: filtered.slice(0, itemsPerPage),
      isPageReset: true,
      pageLimit: 20,
    });
  };

  updateSearchInput = (e) =>
    this.setState({ searchInput: e.target.value }, this.updateClientsDisplay);

  updateSelectedFilter = (e) => {
    const { currentFilters } = this.state;
    const { value, name } = e.target;
    let filters = {};
    /*   if (localStorage.getItem("currentFilters") !== null) {
      filters = JSON.parse(localStorage.getItem("currentFilters"));
    } */

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

      // localStorage.setItem("currentFilters", JSON.stringify(filters));
    }

    this.setState(
      /*      {
        selectValue: name,
        searchInput: value,
        currentFilters: { ...currentFilters, ...filters },
      }, */
      {
        currentFilters: { ...currentFilters, ...filters },
      },
      this.updateClientsDisplay
    );
  };

  /*   searchBySearchInput = (searchInput) => {
    const { clients } = this.state;
    return clients.filter((client) =>
      client[clientsHeaders["name"]].includes(searchInput)
    );
  }; */

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
      clientsToDisplay,
      pageCount,
      currentClients,
      isPageReset,
      showPopup,
      clientToEdit,
    } = this.state;

    console.log("currentClients: ", currentClients);
    // console.log("pageCount: ", pageCount);
    console.log("clientToEdit: ", clientToEdit);

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
          {/* <Search
            updateSearchInput={this.updateSearchInput}
            searchInput={searchInput}
          /> */}
        </div>
        <div className="clients-child">
          <ClientsPagination
            updateDisplayByPage={this.updateDisplayByPage}
            pageLimit={pageLimit}
            pageCount={pageCount}
            isPageReset={isPageReset}
            /*    pageCount={
              pageCount > 0 ? pageCount : this.updatePageCount(clientsToDisplay)
            } */ clients={
              currentClients
            }
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

/*   let itemsAmount = itemsPerPage * pageDirection;
    let newDisplay = 0;
    if (pageLimit + itemsAmount >= clientsToDisplay.length) {
      newDisplay = clientsToDisplay.length;
    } else if (pageLimit + itemsAmount <= 20) {
      newDisplay = 20;
    } else if (pageNum && pageNum !== 0) {
      newDisplay = pageNum * 20;
    } else {
      newDisplay = pageLimit + itemsAmount;
    }
    console.log("newDisplay/ pageLimit: ", newDisplay);

    this.setState({ pageLimit: newDisplay }, this.updateClientsDisplay) */
