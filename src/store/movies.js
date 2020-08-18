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
            if(search === ''){
                search = 'null';
            }
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
    }
};
