import axios from "axios";

export default {
  namespaced: true,
  actions: {
    getMovieVotes({ commit }, id) {
      console.log(commit);
      const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
      return axios
        .get(process.env.VUE_APP_API_URL + "votes/movies/" + id, { headers })
        .then(function (response) {
          return response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    getUVote({ commit }, data) {
      console.log(commit);
      const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
      return axios
        .get(process.env.VUE_APP_API_URL + "user/votes/" + 
        data["movie_id"] + "/" + data["user_id"], { headers })
        .then(function (response) {
          return response.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },

    createVote({ commit }, data) {
      const qs = require('querystring')
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      console.log(commit)
      return axios
        .post(process.env.VUE_APP_API_URL + "votes", qs.stringify(data), { headers })
        .then(response => {
          return response.data;
        },
          (error) => {
            return error.response.data.message;
          })
    },

    updateVote({ commit }, data) {
      const qs = require('querystring')
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      console.log(commit)
      return axios
        .patch(process.env.VUE_APP_API_URL + "votes/" + data["id"], qs.stringify(data["data"]), { headers })
        .then(response => {
          return response.data;
        },
          (error) => {
            return error.response.data.message;
          })
    },

    deleteVote({ commit }, id) {
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
      };

      console.log(commit)
      return axios
        .delete(process.env.VUE_APP_API_URL + "votes/" + id, { headers })
        .then(response => {
          return response.data;
        },
          (error) => {
            return error.response.data.message;
          })
    },
  }
};
