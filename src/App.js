import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Navbar from './components/general/navbar.js'
import Landing from './components/general/landing.js'
import Clients from './components/clients/clients.js'
import Actions from './components/actions/actions.js'
// import ClientInput from './components/actions/clientInput.js'
// import AddClient from './components/actions/addClient.js'
// import Update from './components/actions/update.js'
import Badges from './components/analytics/badges/badges.js'
// import Emails from './components/analytics/badges/emails.js'
// import NewClients from './components/analytics/badges/newClients.js'
// import OutstandingClients from './components/analytics/badges/outstandingClients.js'
import Charts from './components/analytics/charts/charts.js'
// import ClientAcquisition from './components/analytics/charts/clientAcquisition.js'
// import SalesByCountry from './components/analytics/charts/salesByCountry.js'
// import SalesSinceDate from './components/analytics/charts/salesSinceDate.js'
// import TopEmployees from './components/analytics/charts/topEmployees.js'
import Loader from 'react-loader-spinner'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    setTimeout(() => this.setState({ loading: false }), 1000);

  }
  // componentDidMount = async ()=> {
  //   const state = await JSON.parse(localStorage.getItem('state'))
  //   if (state) {
  //     this.setState({
  //       movies: state.movies,
  //       users: state.users,
  //       currentUser: state.currentUser,
  //       search: state.search
  //     })
  //   } 
  // }

  // async componentDidMount() {
  //   setTimeout(() => {
  //     let data = require('./data.json')
  //     this.setState({
  //       costumers: data
  //     })
  //     console.log("state is updated with data")
  //   }, 1000)
  // }


  // extractFirstName = () => {
  //   const costumers = [...this.state.costumers]
  //   const costumersNames = costumers.filter(costumer => {
  //     return costumer.name;
  //   })
  //   costumersNames.forEach(name => {
  //     name.split(" ")
  //   });
  //   console.log(costumersNames)
  // }


  render() {
    const loading = this.state.loading
    if (loading){
      return <Loader type="Puff" color="#00BFFF" height={150} width={150} />
    }
    return (
      <Router>
        <div className="App">
          <div className="general">
            <Navbar />
          </div>
          <div>
            <Route path="/" exact component={Landing} />
            <Route path="/clients" exact component={Clients} />
            <Route path="/actions" exact component={Actions}/>
    
            {/* <Route path="/analytics" exact component={Analytics}/> */} 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
