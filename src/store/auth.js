import axios from "axios";

export default {
  namespaced: true,

  state: {
    userData: null
  },

  getters: {
    user: state => state.userData
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
    sendLoginRequest({ commit }, formData) {
      return axios
        .post(process.env.VUE_APP_API_URL + "auth/login", formData)
        .then(response => {
          commit("setUserData", response.data.user);
          localStorage.setItem("authToken", response.data.access_token);
          return 0;
        },
          (error) => {
            console.log(error.response.data)
            return error.response.data.message;
          });
    },
    sendLogoutRequest({ commit }) {
      axios.get(process.env.VUE_APP_API_URL + "auth/logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("authToken");
      });
    },
    sendRegisterRequest({ commit }, data) {
      return axios
        .post(process.env.VUE_APP_API_URL + "auth/register", data)
        .then(response => {
          commit("setUserData", response.data.user);
          return 0;
        },
          (error) => {
            console.log(error.response.data.message)
            return error.response.data.message;

          })
    },
  }
};
