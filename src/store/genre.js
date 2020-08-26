/* eslint-disable no-undef */
import axios from "axios";

export default {
  namespaced: true,

  actions: {
    getGenre({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_GENRE_URL + "/" +id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    getAllGenre({commit}) {
      console.log(commit);
      const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
      return axios
          .get(process.env.VUE_APP_GENRE_URL , { headers })
          .then(function (response) {
              return response.data;
          })
          .catch((error) => {
              console.log(error)
          });
    },
    
  }
};
