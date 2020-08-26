/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
const qs = require('querystring');

export default {
    namespaced: true,
    state: {
        moviesData: null,
        relatedMovies: null,
        popularMovies: null
    },
    getters: {
        movies: state => state.moviesData,
        relatedMovies: state => state.relatedMovies,
        popularMovies: state => state.popularMovies
    },
    mutations: {
        setMoviesData(state, movies) {
            state.moviesData = movies;
        },

        setRelatedMovies(state,relatedMovies){
            state.relatedMovies = relatedMovies;
        },

        setPopularMovies(state,popularMovies){
            state.popularMovies = popularMovies;
        },
    },
    actions: {
        getMovies({commit}) {
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_MOVIE_URL, { headers })
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
                .get(process.env.VUE_APP_MOVIE_SEARCH_URL + search, { headers })
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
                .get( process.env.VUE_APP_MOVIE_FILTER_URL + filter, { headers })
                .then(function (response) {
                    commit("setMoviesData", response.data);
                    return response.data;
                })
                .catch(() => {
                    console.log("error")
                });
        },

        incrementMovieView({ commit }, data) {
            const headers = {
              'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
              'Content-Type': 'application/x-www-form-urlencoded'
            };
      
            console.log(commit)
            return axios
              .patch(process.env.VUE_APP_MOVIE_INCREMENT_URL, qs.stringify(data), { headers })
              .then(response => {
                return response.data;
              },
                (error) => {
                  return error.response.data.message;
                })
          },

          findRelatedMovies({commit},id){
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_MOVIE_RELATED_URL + id, { headers })
                .then(function (response) {
                    commit("setRelatedMovies", response.data);
                })
                .catch(() => {
                    console.log("error")
                });
          },

          findOneMovie({commit},movie){
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_MOVIE_URL + "/" + movie, { headers })
                .then(function (response) {
                    return response.data;
                })
                .catch(() => {
                    console.log("error")
                });
          },

          findPopularMovies({commit}){
            const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
            return axios
                .get(process.env.VUE_APP_MOVIE_POPULAR_URL, { headers })
                .then(function (response) {
                    commit("setPopularMovies", response.data);
                })
                .catch(() => {
                    console.log("error")
                });
          },

          createMovie({ commit }, data) {
            const headers = {
              'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
              'Content-Type': 'application/x-www-form-urlencoded'
            };
      
            return axios
              .post(process.env.VUE_APP_MOVIE_URL, qs.stringify(data), { headers })
              .then(response => {
                return response.data;
              },
                (error) => {
                  return error.response.data.message;
                })
          },
    }
};
