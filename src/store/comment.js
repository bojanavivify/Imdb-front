import axios from "axios";

export default {
  namespaced: true,

  actions: {
    getMovieComments({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "comments/movies/" +id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    getNextPage({commit}, url) {
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get( url, { headers })
            .then(function (response) {
                commit("setMoviesData", response.data);
                return response.data;
            })
            .catch(() => {
                console.log("error")
            });
    },

    deleteSpecComment({ commit }, id) {
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
        };

        console.log(commit)
        return axios
          .delete(process.env.VUE_APP_API_URL + "comments/" + id, { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },

      createNewComment({ commit }, data) {
        const qs = require('querystring')
        const headers = { 
            'Authorization' : 'Bearer ' + localStorage.getItem("authToken"),
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        console.log(commit)
        return axios
          .post(process.env.VUE_APP_API_URL + "comments", qs.stringify(data), { headers })
          .then(response => {
            return response.data;
          },
            (error) => {
              return error.response.data.message;
            })
      },
  }
};
