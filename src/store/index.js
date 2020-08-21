import { createStore } from 'vuex'
import auth from "./auth";
import movies from "./movies";
import genre from "./genre";
import votes from "./votes";
import comment from "./comment";


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
    genre,
    votes,
    comment
  }
})
