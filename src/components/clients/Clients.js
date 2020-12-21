import React, { Component } from "react";
import Search from "./Search.js";
import ColumnsHeader from "./ColumnsHeader.js";
import ClientData from "./ClientData.js";
import "../../styles/clients/clients.css";
import Loader from "react-loader-spinner";
import call from "../../ApiCalls/ApiCalls";
import ClientsFilter from "./ClientsFilter";
import { clientsHeaders } from "./clientsHeaders";
import ClientsPagination from "./ClientsPagination";

const itemsPerPage = 20;

class Clients extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      searchInput: "",
      searchedClients: [],
      clients: [],
      selectedPage: 0,
      pageLimit: 20,
      selectValue: "Name",
      displayClients: [],
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
    const clients = [...this.state.clients];
    let index = this.findClientIndex(clients, id);
    let client = clients[index];
    client.name = name;
    client.country = country;
    this.setState({
      clients: clients,
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

  findClientIndex = (clients, id) => {
    for (let i in clients) {
      if (clients[i]._id === id) {
        return i;
      }
    }
    return false;
  };

  searchClients = (e) => {
    const { clients, searchInput } = this.state;

    this.setState({ searchInput: e.target.value.toLowerCase() });
    console.log(searchInput);
    let newClientsList = searchInput.length
      ? clients.filter((client) => client.name.includes(searchInput))
      : [];
    if (newClientsList.length) {
      this.setState({
        searchedClients: newClientsList,
      });
    }
  };

  updateDisplayByPage = (pageDirection, pageNum) => {
    const { pageLimit, clients } = this.state;
    let itemsAmount = itemsPerPage * pageDirection;
    let newDisplay = 0;
    if (pageLimit + itemsAmount >= clients.length) {
      newDisplay = clients.length;
    } else if (pageLimit + itemsAmount <= 20) {
      newDisplay = 20;
    } else if (pageNum && pageNum !== 0) {
      newDisplay = pageNum * 20;
    } else {
      newDisplay = pageLimit + itemsAmount;
    }
    console.log("newDisplay: ", newDisplay);

    this.setState({ pageLimit: newDisplay }, this.updateClientsDisplay);
  };

  updateClientsDisplay = () => {
    let currentFilter = this.state.selectValue;
    let filterValue = this.state.searchInput.toLowerCase();
    let currentClients =
      this.state.clients &&
      this.state.clients.slice(this.state.pageLimit - 20, this.state.pageLimit);

    if (!filterValue) {
      return this.setState({ displayClients: currentClients });
    }

    let displayClients = currentClients.filter((c) => {
      if (currentFilter === "Sold") {
        return this.handleBoolFilter(c, currentFilter, filterValue);
      }
      return (c[clientsHeaders[currentFilter]] || "")
        .toLowerCase()
        .includes(filterValue);
    });
    this.setState({ displayClients });
  };

  updateSearchInput = (e) =>
    this.setState({ searchInput: e.target.value }, this.updateClientsDisplay);
  updateFilterSelect = (e) =>
    this.setState({ selectValue: e.target.value }, this.updateClientsDisplay);

  render() {
    const {
      loading,
      clients,
      searchInput,
      searchedClients,
      pageLimit,
      selectValue,
      pageCount,
    } = this.state;
    if (loading) {
      return <Loader type="Puff" color="#00BFFF" height={150} width={150} />;
    }
    return (
      <div id="clients-container">
        <div className="clients-child">
          <ClientsFilter clients={clients} />
          {/*         <Search
            searchClients={this.searchClients}
            searchInput={searchInput}
          /> */}
        </div>
        <div className="clients-child">
          <ClientsPagination
            updateDisplayByPage={this.updateDisplayByPage}
            pageLimit={pageLimit}
            searchInput={searchInput}
            selectValue={selectValue}
            updateSearchInput={this.updateSearchInput}
            updateFilterSelect={this.updateFilterSelect}
            pageCount={Math.ceil(this.state.clients.length / itemsPerPage)}
          />
        </div>
        <div className="clients-child">
          <ColumnsHeader />
        </div>
        <div className="clients-child">
          <RowContainer
            submitInputChange={this.submitInputChange}
            clients={this.state.displayClients}
            searchedClients={searchedClients}
          />
        </div>
      </div>
    );
  }
}

const RowContainer = ({ clients, submitInputChange, searchedClients }) => {
  let clientsToDisplay = searchedClients.length ? searchedClients : clients;
  return (
    <div>
      {clientsToDisplay.map((c) => {
        return (
          <ClientData
            id={c._id}
            key={c._id}
            name={c.name}
            country={c.country}
            firstContact={c.firstContact}
            emailType={c.emailType}
            sold={c.sold}
            owner={c.owner}
            submitInputChange={submitInputChange}
          />
        );
      })}
    </div>
  );
};

export default Clients;

/*

  handlePageClick = ({ selected: selected }) => {
    console.log(selected);

    this.setState({ selectedPage: selected + 1 });
    console.log(this.state.selectedPage);
  };


*/
