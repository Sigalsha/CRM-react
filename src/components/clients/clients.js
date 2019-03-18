import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Search from './search.js'
import ColumnsHeader from './columnsHeader.js'
import ClientData from './clientData.js'
import '../../styles/clients/clients.css'
import Loader from 'react-loader-spinner'
import call from '../../ApiCalls/ApiCalls'



class Clients extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
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


    componentDidMount() {
        setTimeout(() => {
            let data = call.getClients();
            this.setState({
                loading: false,
                clients: data
            })
        }, 1000)
    }


    submitInputChange = (newObject) => {
        let {id, name, country} = newObject;
        const clients = [...this.state.clients];
        let index = this.findClientIndex(clients, id);
        let client = clients[index];
        client.name = name;
        client.country = country;
        this.setState({
            clients: clients
        })
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
       
    }

    findClientIndex = (clients ,id) => {
        for (let i in clients) {
          if (clients[i]._id === id){
            return i;
          } 
        }
        return false;
    }

    render() {
        const { loading,clients } = this.state;
        if (loading) {
            return <Loader type="Puff" color="#00BFFF" height={150} width={150} />
        }
        return (
            <div id="clients-container">
                <div className="clients-child"><Search /></div>
                <div className="clients-child"><ColumnsHeader /></div>
                <div className="clients-child"><RowContainer submitInputChange={this.submitInputChange} clients={clients} /></div>
            </div>

        )
    }
}

const RowContainer = ({ clients, submitInputChange }) => {
    return (
        <div>
            {clients.map(c => {
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
                )
            })}
        </div>
    )
}

export default Clients;