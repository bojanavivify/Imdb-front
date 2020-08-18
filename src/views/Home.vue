<template>
  <h1 align="center">Imdb for Movies</h1>
  <br />
  <div class="row">
    <div class="column" v-for="movie in showMovies" :key="movie">
      <div class="card" style="cursor:pointer;" @click="getMovie(movie)">
        <h3>{{movie.title}}</h3>
        <p>{{trucateText(movie.description)}}</p>
        <img class="image" v-bind:src="movie.image_url" />
      </div>
    </div>
    <br />
    <div class="nav">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" 
            v-if="page != 1" @click="page--">Previous</button>
          </li>
          <li class="page-item">
            <button
              type="button"
              v-for="pageNumber in pages.slice(page-1, page+5)"
              :key="pageNumber"
              class="page-link"
              @click="page = pageNumber"
            >{{pageNumber}}</button>
          </li>
          <li class="page-item">
            <button type="button" @click="page++" 
            v-if="page < pages.length" class="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  created() {
    this.getAllMovies();
  },
  data() {
    return {
      movies: [],
      page: 1,
      perPage: 12,
      pages: [],
    };
  },
  methods: {
    ...mapActions("movies", ["getMovies"]),
    async getAllMovies() {
      const data = await this.getMovies();
      this.movies = data;
      console.log(data);
    },
    trucateText(value) {
      const length = 230;
      return value.length <= length
        ? value
        : value.substring(0, length) + "...";
    },
    getMovie(oneMovie) {
      const path = "/movie/" + oneMovie.title;
      console.log(oneMovie.description);
      this.$router.push({
        path: path,
        params: {
          title: oneMovie.title,
          description: oneMovie.description,
          image_url: oneMovie.image_url,
          genre_id: oneMovie.genre_id,
        },
      });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.movies.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate() {
      console.log("Uslo u paginate");
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return this.movies.slice(from, to);
    },
  },
  computed: {
    showMovies() {
      window.scrollTo(0, 0);
      return this.paginate();
    },
  },
  watch: {
    movies() {
      this.setPages();
    },
  },
};
</script>

<style >
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
  padding-bottom: 10px;
}

/* Remove extra left and right margins, due to padding */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
  transition: transform 0.2s;
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(
    1.5
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.image {
  width: 250px;
  height: 250px;
}

button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #42b983;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}

.nav {
  padding-left: 100px;
  margin: 20px auto;
}
</style>>
