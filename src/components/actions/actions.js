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


    componentDidMount() {
        setTimeout(() => {
            let data = require('../../data.json')
            this.setState({
                loading: false,
                clients: data,
                owners: this.reduceDuplications(this.getOwners(data))
            })
        }, 1000)
    }

    getOwners = (data) => {
        const owners = data.map(c => {
            return c.owner
        })
        owners.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        })
        return owners
    }

    reduceDuplications = (arrArg) => {
        return arrArg.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        })
    }

    // getClientsDetails = (clients, newArr, key) => {
    //     let newArr = clients.map(client => {
    //         return client.key
    //     })
    // }
 
    getCurrentClient = (event) => {
        console.log(event.target.value)
        let clientName = event.target.value
        const clients = [...this.state.clients]
        let client = clients.filter(c => clientName === c.name)
        console.log(client)
        if (client[0]) {
            this.setState({currentClient: client})
        }
    }

    changeOwner = (newOwner) => {
        let client = this.state.currentClient
        const clients = [...this.state.clients]
        let index = this.findClientIndex(clients, client)
        client.owner = newOwner
        clients[index].client = client
        this.setState({
            clients: clients
        })
    }


    findClientIndex = (clients, client) => {
        for (let i in clients) {
            if (clients[i].client === client){
                return i
            }
        }
    }
  

    render() {
        const {loading, clients, owners, emailType} = this.state
        if (loading) {
            return <div className="loader-position"><Loader type="Puff" color="#00BFFF" height={150} width={150} /></div>
        }
        return (
            <div id="actions-container">
                <div className="actions-child"><ActionHeader text={"update"} /></div>
                <div className="actions-child"><ClientInput clients={clients} getCurrentClient={this.getCurrentClient}/></div>
                <div className="actions-child"><UpdateClient owners={owners} emailType={emailType} changeOwner={this.changeOwner}  /></div>
                <div className="actions-child"><ActionHeader text={"add client"} /></div>
                <div className="actions-child"><AddClient /></div>
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