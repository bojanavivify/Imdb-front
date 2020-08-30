import { createStore } from 'vuex'
import auth from "./auth";
import movies from "./movies";
import genre from "./genre";
import votes from "./votes";
import comment from "./comment";
import watchList from "./watchList";
import image from "./image";


export default createStore({
  modules: {
    auth,
    movies,
    genre,
    votes,
    comment,
    watchList,
    image,
  }
})
