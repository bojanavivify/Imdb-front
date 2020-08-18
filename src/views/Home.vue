<template>
  <h1 align="center"> Imdb for Movies </h1><br>
  <div class="row">
  <div class="column" v-for="movie in movies" :key="movie">
    <div class="card">
      <h3>{{movie.title}}</h3>
      <p>{{movie.description}}</p>
      <img class="image" v-bind:src= "movie.image_url">
    </div>
  </div>
  
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Home',
  mounted () {
    this.getAllMovies();
  },
  data () {
    return {
      movies: null
    }
  },
  methods: {
    ...mapActions("movies", ["getMovies"]),
    async getAllMovies() {
      const data = await this.getMovies();
      this.movies = data;
      console.log(data);
    },
  },
}
</script>

<style >
  .column {
    float: left;
    width: 25%;
    padding: 0 10px;
  }

  /* Remove extra left and right margins, due to padding */
  .row {margin: 0 -5px;}

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
  }

  .image{
    width: 250px;
    height: 250px;
  }
</style>>
