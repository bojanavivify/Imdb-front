/* eslint-disable no-undef */
import axios from "axios";

export default {
  namespaced: true,

  actions: {
    uploadImageMovie({commit}, data) {
        console.log(commit);
        const headers = { 
            'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
            'enctype' :"multipart/form-data", };
        return axios
            .post(process.env.VUE_APP_IMAGE_URL, data, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message)
            });
    },

    getImageMovie({commit}, id) {
        console.log(commit);
        const headers = { 
            Authorization: 'Bearer ' + localStorage.getItem("authToken")};
        return axios
            .get(process.env.VUE_APP_IMAGE_URL + '/' + id, { headers })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message)
            });
    },
    
  }
};
