import React, { Component } from "react";
import Loader from "react-loader-spinner";
import call from "../../ApiCalls/ApiCalls";
import utils from "../../utils/utils";
import { CLIENTS_HEADERS, COLORS } from "../../utils/consts";
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

  // getClientsDetails = async ()  => {
  //     return axios.get('http://localhost:8100/clients')
  // }

  // componentDidMount = async () => {
  //     const response = await this.getClientsDetails()
  //     console.log(response)
  //     this.setState({
  //         loading: false,
  //         clients: response.data})
  // }

  componentDidMount() {
    setTimeout(() => {
      let data = call.getClients();
      this.setState({
        loading: false,
        clients: data,
        owners: utils.reduceDuplications(
          utils.getClientProperty(CLIENTS_HEADERS["owner"], data)
        ),
        currentClient: "",
      });
    }, 1000);
  }

  getCurrentClient = (event) => {
    let clientName = event.target.value;
    const clients = [...this.state.clients];
    let client = clients.filter((c) => clientName === c.name);

    if (client[0]) {
      this.setState({ currentClient: client });
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

  updateClient = (newDetail) => {
    const { currentClient } = this.state;
    // let client = currentClient;
    // this.sendUpdatedClient(client, newDetail)
  };

  // const mapped = clients.map((c, i) => { return { i: i, client: c } })
  // console.log(mapped)
  // const filtered = mapped.filter(c => c.client.name === client.name)
  // console.log(filtered)
  // let index = filtered[0].i
  // // filtered[0].client
  // // let index = utils.findClientIndex(clients, client)
  // client.owner = newOwner
  // clients[index].client = client
  // this.setState({
  //     clients: clients
  // })

  addNewClient = (newClient) => {
    // post req.to the server, adding new client:

    // axios.post('http://localhost:8100/actions/:client', {
    //     name: newClient.name,
    //     country: newClient.country,
    //     owner: newClient.owner
    // })
    //     .then((res) => {
    //         console.log(res);
    //         setState({
    //             clients: clients
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //should get the client from the server with an Id, than update it in the state?
    //Or get all the clients including the new client

    const clients = [...this.state.clients];
    clients.push(newClient);
    this.setState(
      {
        clients: clients,
      },
      () => alert(`${clients[clients.length - 1].name} has been added`)
    );
  };

  render() {
    const { loading, clients, owners, emailType } = this.state;
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
          <ActionHeader text={"update"} />
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
            emailType={emailType}
            updateClient={this.updateClient}
          />
        </div>
        <div id="section" />
        <div className="actions-child">
          <ActionHeader text={"add client"} />
        </div>
        <div className="actions-child">
          <AddClient addNewClient={this.addNewClient} />
        </div>
      </div>
    );
  }
}

const ActionHeader = ({ text }) => {
  return <h1 className="actions-header">{text}</h1>;
};

export default Actions;
