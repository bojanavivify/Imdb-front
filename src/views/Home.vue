<template>
  <h1 align="center">Imdb for Movies</h1>
  <br/>
  Search: <input type="text" v-model="search"/>
  <br><br><br>
  <div class="row">
    <div class="column" v-for="movie in movies" :key="movie">
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
            v-if="page != 1" @click="getNewPage('-')">Previous</button>
          </li>
          <li class="page-item">
            <button
              type="button"
              v-for="pageNumber in pages.slice(page-1, page+5)"
              :key="pageNumber"
              class="page-link"
              @click="getNewPage(pageNumber)"
            >{{pageNumber}}</button>
          </li>
          <li class="page-item">
            <button type="button" @click="getNewPage('+')" 
            v-if="page < pages.length" class="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import _ from 'lodash';

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
      count_movies: null,
      next_url: null,
      previous_url: null,
      search: '',
    };
  },
  methods: {
    ...mapActions("movies", ["getMovies", "searchForMovies", "getNextPage"]),
    async getAllMovies() {
      const data = await this.getMovies();
      this.movies = data.data;
      this.count_movies = data.total;
      this.next_url = data.next_page_url;
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
      let numberOfPages = Math.ceil(this.count_movies / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    async getNewPage(symbol){
      if(symbol == '+'){
        const data = await this.getNextPage(this.next_url);
        this.getData(data.data,data.next_page_url,data.prev_page_url);
        this.page++;
      }else if(symbol == '-'){
        const data = await this.getNextPage(this.previous_url);
        this.getData(data.data,data.next_page_url,data.prev_page_url);
        this.page--;
      }else{
        const url = this.next_url.substring(0, this.next_url.length-1) + symbol;
        const data = await this.getNextPage(url);
        this.getData(data.data,data.next_page_url,data.prev_page_url);
        const n = symbol - this.page;
        this.page = this.page + n;
      }
      window.scrollTo(0, 0);
    },
    getData(data,next_page_url,prev_page_url){
      this.movies =data;
      this.next_url = next_page_url;
      this.previous_url = prev_page_url;
    },
    searchMovies: _.debounce(function (e) {
    this.findSearchMovies();
    }, 750),
    async findSearchMovies(){
      const data = await this.searchForMovies(this.search);
      this.movies = data.data;
      this.count_movies = data.total;
      this.next_url = data.next_page_url;
      this.setPages();
    },
  },
  computed: {
  },
  watch: {
    movies() {
      this.pages=[];
      this.setPages();
    },
    search : function(value) {
      this.search = value;
      this.searchMovies();
      console.log(this.search);
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
  margin: 0 5px;
  padding-left: 30px;
  width: 99.5%;
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
