import axios from "axios";

export default {
  namespaced: true,

  state: {
  },

  getters: {
  },

  mutations: {
   
  },

  actions: {
    getGenre({commit}, id) {
        console.log(commit);
        const headers = { Authorization: 'Bearer ' + localStorage.getItem("authToken") };
        return axios
            .get(process.env.VUE_APP_API_URL + "genre/" +id, { headers })
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
          .get(process.env.VUE_APP_API_URL + "genre", { headers })
          .then(function (response) {
              return response.data;
          })
          .catch((error) => {
              console.log(error)
          });
    },
    
  }
};
