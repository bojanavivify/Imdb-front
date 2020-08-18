import { createStore } from 'vuex'
import auth from "./auth";
import movies from "./movies";
import genre from "./genre";


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    movies,
    genre
  }
})
