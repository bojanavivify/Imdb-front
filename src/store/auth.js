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
            if (typeof (error.response.data.errors) !== 'undefined') {
              if(typeof(error.response.data.errors.email) !== 'undefined'){
                return error.response.data.errors.email[0];
              }else if(typeof(error.response.data.errors.password) !== 'undefined'){
                return error.response.data.errors.password[0];
              }
              return error.response.data.errors.email;
            } else if (typeof (error.response.data.error) !== 'undefined') {
              return error.response.data.error;
            }
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
            console.log(error.response.data.errors)
            console.log(error.response.data.errors.email)
            if (typeof (error.response.data.errors.email) !== 'undefined') {
              return error.response.data.errors.email;
            } else if (typeof (error.response.data.errors.password) !== 'undefined') {
              return error.response.data.errors.password;
            }
          })
    },
  }
};
