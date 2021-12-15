import React, { Component } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
// import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import {
  URL,
  CLIENTS_HEADERS,
  COLORS,
  ACTION_HEADERS,
} from "../../utils/consts";
import "../../styles/actions/actions.css";
import ClientInput from "./ClientInput";
import UpdateClient from "./UpdateClient.js";
import AddClient from "./AddClient.js";
class Actions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      emailType: ["A", "B", "C", "D"],
      owners: [],
      currentClient: "",
    };
  }

  componentDidMount() {
    this.getClientsFromServer();
    /*  setTimeout(() => {
      let data = call.getClients();
      this.setState({
        loading: false,
        clients: data,
        owners: utils.reduceDuplications(
          utils.getClientProperty(CLIENTS_HEADERS["owner"], data)
        ),
        currentClient: "",
      });
    }, 1000); */
  }

  getClientsFromServer() {
    axios
      .get(URL)
      .then((res) => {
        console.log("res from clients backend: ", res.data.data);
        if (res.data.data.length) {
          const { data } = res.data;
          this.setState({
            loading: false,
            clients: data,
            owners: utils.reduceDuplications(
              utils.getClientProperty(CLIENTS_HEADERS["owner"], data)
            ),
            currentClient: "",
          });
        }
      })
      .catch((err) => {
        console.log("err from clients backend: ", err);
      });
  }

  getCurrentClient = (event) => {
    const { clients, currentClient } = this.state;
    const { value } = event.target;

    let chosenClient = clients.filter((c) => value === c.name);

    if (chosenClient.length && chosenClient[0] !== currentClient) {
      this.setState({ currentClient: chosenClient[0] });
    } else if (value === "") {
      this.setState({ currentClient: value });
    }
  };

  // sendUpdatedClient = async (client, key) => {
  //     axios.put('http://localhost:8100/actions/update', {
  //         _id: client._id,
  //         owner: owner,
  //         emailType: emailType,
  //         sold: sold
  //     })
  //         .then((res) => {
  //             console.log(res)
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         })
  // }

  updateClient = (updatedClientData) => {
    const { currentClient } = this.state;

    const updatedClient = {
      emailType: updatedClientData.emailType
        ? updatedClientData.emailType
        : currentClient.emailType,
      sold: updatedClientData.sold
        ? updatedClientData.sold
        : currentClient.sold,
      owner: updatedClientData.owner
        ? updatedClientData.owner
        : currentClient.owner,
    };

    axios
      .put(`${URL}${currentClient._id}`, {
        ...currentClient,
        ...updatedClient,
      })
      .then((res) => {
        console.log("res from update client (put) backend ", res);
      })
      .catch((err) =>
        console.log("err from update client (put) backend ", err)
      );

    this.setState({ currentClient: "" }, this.getClientsFromServer);

    // this.sendUpdatedClient(client, updatedClient)
  };

  addNewClient = (newClient) => {
    const { clients } = this.state;
    // debugger;
    axios
      .post(`${URL}add`, newClient)
      .then((res) => {
        console.log("res from add new client (post) backend ", res);
      })
      .catch((err) => {
        console.log("err from add new client (post) backend ", err);
      });

    this.setState(
      {
        clients: [...clients, newClient],
      },
      this.getClientsFromServer
    );
    //should get the client from the server with an Id, then update it in the state?
    //Or get all the clients including the new client
  };

  render() {
    const { loading, clients, owners, emailType, currentClient } = this.state;

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
      <div id="actions-container">
        <div className="actions-child">
          <ActionHeader text={ACTION_HEADERS["main"]["update"]} />
        </div>
        <div className="actions-child">
          <ClientInput
            clients={clients}
            getCurrentClient={this.getCurrentClient}
          />
        </div>
        <div className="actions-child">
          <UpdateClient
            owners={owners}
            emailTypes={emailType}
            updateClient={this.updateClient}
            currentClient={currentClient}
          />
        </div>
        <div id="section" />
        <div className="actions-child">
          <ActionHeader text={ACTION_HEADERS["main"]["addClient"]} />
        </div>
        <div className="actions-child">
          <AddClient addNewClient={this.addNewClient} owners={owners} />
        </div>
      </div>
    );
  }
}

const ActionHeader = ({ text }) => <h1 className="actions-header">{text}</h1>;

export default Actions;
