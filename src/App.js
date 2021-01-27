import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./App.css";
import Navbar from "./components/general/Navbar.js";
import Landing from "./components/general/Landing.js";
import Clients from "./components/clients/Clients.js";
import Actions from "./components/actions/Actions.js";
import Analytics from "./components/analytics/Analytics";
import { COLORS } from "./utils/consts";
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
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
    const { loading } = this.state;

    if (loading) {
      return (
        <div id="general-loader">
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
      <Router>
        <div className="App">
          <div className="general">
            <Navbar />
          </div>
          <div>
            <Route path="/" exact component={Landing} />
            <Route path="/clients" exact component={Clients} />
            <Route path="/actions" exact component={Actions} />
            <Route path="/analytics" exact component={Analytics} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
