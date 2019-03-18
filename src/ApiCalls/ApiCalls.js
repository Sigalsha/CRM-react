// import axios from 'axios';
import '../data.json'


class apiCalls {
    constructor() {
        this.clients_data = require('../data.json');
    }

    getClients = () => {
        let data = this.clients_data;
        console.log("data sent from Api " + data.length)
        return data;
    }


    // getUser = (userName) => {
    //     let data = this.users_data
    //     console.log(data)

    //     let user = this.findUserByUserName(data, userName)
    //     console.log("user found in ApiCalls: " + user)

    //     return user;
    // }

    // findUserByUserName = (data, userName) => {
    //     for (let u in data) {
    //         if (data[u].userName === userName) {
    //             return data[u]
    //         }
    //     }
    // }

    // getMoviesFromApi = async (pageNumber) => {
    //     let page;
    //     if (pageNumber) {
    //         page = pageNumber;
    //     } else {
    //         page = 1;
    //     }
    //     const url = this.getUrlByPage(page)
    //     const res = await axios.get(url)
    //     const results = res.data.results
    //     console.log(results)
    //     return results;
    // }

    // getUrlByPage = (page) => {
    //     return `${this.api.url_start}${this.api.popular}${this.api.key}${this.api.language}${this.api.page}${page}`;
    // }


    // getMovieById = async (movieID) => {
    //     const url = `${this.api.url_start}${movieID}?${this.api.key}${this.api.language}`
    //     console.log(url)
    //     const res = await axios.get(url)
    //     const data = res.data
    //     console.log(data)
    //     return data;
    // }

    // searchMovie = async (searchItem, page) => {
    //     const url = `${this.api.url_start_search}${this.api.key}${this.api.language}${this.api.query}${searchItem}${this.api.page}${page}${this.api.no_adult}`
    //     console.log(url)
    //     const res = await axios.get(url)
    //     const results = res.data.results
    //     console.log(results)
    //     return results;
    // }

}

const call = new apiCalls();
export default call;