import axios from "axios";

export default {
    namespaced: true,
    state: {
        moviesData: null
    },
    getters: {
        movies: state => state.moviesData
    },
    mutations: {
        setMoviesData(state, movies) {
            state.moviesData = movies;
        }
    },
    actions: {
        getMovies({commit}) {
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_API_URL + "movies", { headers })
                .then(function (response) {
                    commit("setMoviesData", response.data);
                    return response.data;
                })
                .catch(() => {
                    console.log("error")
                });
        },

        searchForMovies({commit}, search) {
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_API_URL + "movies/search/" + search, { headers })
                .then(function (response) {
                    commit("setMoviesData", response.data);
                    return response.data;
                })
                .catch(() => {
                    console.log("error")
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

        filterMovies({commit}, filter) {
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get( process.env.VUE_APP_API_URL + "movies/filter/" + filter, { headers })
                .then(function (response) {
                    commit("setMoviesData", response.data);
                    return response.data;
                })
                .catch(() => {
                    console.log("error")
                });
        },

        incrementMovieView({ commit }, data) {
            const qs = require('querystring')
            const headers = {
              'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
              'Content-Type': 'application/x-www-form-urlencoded'
            };
      
            console.log(commit)
            return axios
              .patch(process.env.VUE_APP_API_URL + "movies/increment", qs.stringify(data), { headers })
              .then(response => {
                return response.data;
              },
                (error) => {
                  return error.response.data.message;
                })
          },
    }
};
