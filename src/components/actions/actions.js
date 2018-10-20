import React, { Component } from 'react';
import ClientInput from './clientInput';
import UpdateClient from './updateClient.js'
import AddClient from './addClient.js'
import Loader from 'react-loader-spinner'
import axios from 'axios';
import '../../styles/actions/actions.css'

class Actions extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            emailType: ["A", "B", "C", "D"],
            owners: [],
            currentClient: ""
        }
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
            let data = require('../../data.json')
            this.setState({
                loading: false,
                clients: data,
                owners: this.reduceDuplications(this.getOwners(data)),
                currentClient: "",
            })
        }, 1000)
    }

    getOwners = (data) => {
        const owners = data.map(c => {
            return c.owner
        })
        return owners
    }

    reduceDuplications = (arrArg) => {
        return arrArg.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        })
    }

    getCurrentClient = (event) => {
        console.log(event.target.value)
        let clientName = event.target.value
        const clients = [...this.state.clients]
        let client = clients.filter(c => clientName === c.name)
        console.log(client)
        if (client[0]) {
            this.setState({ currentClient: client })
        }
    }

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
        console.log(newDetail)
        let client = this.state.currentClient
        // this.sendUpdatedClient(client, newDetail)
    }

        // const mapped = clients.map((c, i) => { return { i: i, client: c } })
        // console.log(mapped)
        // const filtered = mapped.filter(c => c.client.name === client.name)
        // console.log(filtered)
        // let index = filtered[0].i
        // // filtered[0].client
        // // let index = this.findClientIndex(clients, client)
        // client.owner = newOwner
        // clients[index].client = client
        // this.setState({
        //     clients: clients
        // })



findClientIndex = (clients, client) => {
    for (let i in clients) {
        if (clients[i].client === client) {
            return i
        }
    }
}

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

    console.log(newClient)
    const clients = [...this.state.clients]
    clients.push(newClient)
    this.setState({
        clients: clients
    }, () => alert(`${clients[clients.length - 1].name} has been added`))
}

render() {
    const { loading, clients, owners, emailType } = this.state
    if (loading) {
        return <div className="loader-position"><Loader type="Puff" color="#00BFFF" height={150} width={150} /></div>
    }
    return (
        <div id="actions-container">
            <div className="actions-child"><ActionHeader text={"update"} /></div>
            <div className="actions-child"><ClientInput clients={clients} getCurrentClient={this.getCurrentClient} /></div>
            <div className="actions-child"><UpdateClient owners={owners} emailType={emailType} updateClient={this.updateClient} /></div>
            <div id="section"></div>
            <div className="actions-child"><ActionHeader text={"add client"} /></div>
            <div className="actions-child"><AddClient addNewClient={this.addNewClient} /></div>
        </div>

    )
}
}


const ActionHeader = ({ text }) => {
    return (
        <h1 className="actions-header">{text}</h1>
    )
}

export default Actions;