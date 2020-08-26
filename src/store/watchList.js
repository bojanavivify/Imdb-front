/* eslint-disable no-undef */
import axios from "axios";

export default {
  namespaced: true,
  actions: {
    getDefaultItems({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/items/default/" + id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    getDefault({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/default/" + id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    findAllWatchLists({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/all/" + id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.error(error)
            });
    },
    getItems({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/items/" +id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    checkMovieWatchList({commit}, data) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/check/" +data['user'] + "/" + data['movie'], { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },

    deleteItemWatchList({ commit }, id) {
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
        };

        console.log(commit)
        return axios
          .delete(process.env.VUE_APP_API_URL + "items/" + id, { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },

      addItemWatchList({ commit }, data) {
        const qs = require('querystring')
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        console.log(commit)
        return axios
          .post(process.env.VUE_APP_API_URL + "items", qs.stringify(data), { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },

      changeItem({ commit }, data) {
        const qs = require('querystring')
        const headers = {
          'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
          'Content-Type': 'application/x-www-form-urlencoded'
        };
  
        console.log(commit)
        return axios
          .patch(process.env.VUE_APP_API_URL + "items/change", qs.stringify(data), { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },
      createWatchList({ commit }, data) {
        const qs = require('querystring')
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        console.log(commit)
        return axios
          .post(process.env.VUE_APP_API_URL + "watchList", qs.stringify(data), { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
                console.log(error.message);
              return error.response.data.message;
            })
      },
      deleteWatchList({ commit }, id) {
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
        };

        console.log(commit)
        return axios
          .delete(process.env.VUE_APP_API_URL + "watchList/" + id, { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },

      getWatchList({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "watchList/" + id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
      
  }
};
