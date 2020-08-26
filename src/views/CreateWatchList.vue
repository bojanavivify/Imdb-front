<template>
  <div>
    <h1>Create new watch list</h1>
    <div v-show="first" class="card-c">
      <div class="a">
        <div style="padding-top:20px;" class="form-group">
          <label>Title</label>
          <input type="text" class="form-control form-control-lg" v-model="title" />
          <div class="form__error" v-if="title == ''">*This field is required.</div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control form-control-lg" v-model="description" />
          <div class="form__error" v-if="description == ''">*This field is required.</div>
        </div>

        <input style="margin-bottom:20px;" type="checkbox" v-model="checkbox" />
 Public
        <button
          style="margin-bottom:20px;"
          class="btn btn-dark btn-lg btn-block"
          @click="create"
          :disabled="title.length<1 || description<1"
        >Create</button>
      </div>
    </div>
    <div v-show="!first" class="card-c">
      <div class="a">
        <button style="margin-top:20px;" @click="done" class="btn btn-success">Done</button>
        <p>Title: {{created_title}}</p>
        <p>Description: {{created_desc}}</p>
        <div v-show="items!=null">
          <p>Movies:</p>
          <div @click="removeItem(i.id)" class="movie" v-for="i in items" :key="i">
            <h3>{{i.title}}</h3>
            <p>{{trucateText(i.description)}}</p>
            <img class="image-a" v-bind:src="i.image_url" />
          </div>
        </div>
        <p>Add movies:</p>
        <input class="menu" type="text" v-model="search" />
        <div
          @click="addMovieWatchList(movie.id)"
          class="movies"
          v-for="movie in movies"
          :key="movie"
        >
          <h3>{{movie.title}}</h3>
          <p>{{trucateText(movie.description)}}</p>
          <img class="image-a" v-bind:src="movie.image_url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import { mapActions } from "vuex";

  export default  {
    name: 'CreateWatchList',
    props: [],
    mounted () {
      this.getUser();
    },
    data () {
      return {
        title: '',
        description: '',
        user_id: null,
        checkbox: false,
        created_id: null,
        created_title: null,
        created_desc: null,
        first: true,
        search: null,
        movies: [],
        items: null,
      }
    },
    methods: {
      ...mapActions("auth", ["getUserData"]),
      ...mapActions("watchList", ["createWatchList", "addItemWatchList",
       "getItems", "deleteItemWatchList"]),
      ...mapActions("movies", ["searchForMovies"]),
      async getUser() {
        const data = await this.getUserData();
        this.user_id = data.id;
      },
      async create(){
        this.checkbox = this.checkbox == true? 1:0;
        const fData ={"title": this.title, "description":this.description, 
        "user_id":this.user_id, "public":this.checkbox};
        const data = await this.createWatchList(fData);
        this.created_id = data.id;
        this.created_title = data.title;
        this.created_desc = data.description;
        this.first = false;
      },
      async searchMovies() {
        if(this.search != ''){
          const data = await this.searchForMovies(this.search);
          this.movies = data.data;
        }else{
          this.movies =[];
        }
      },
      trucateText(value) {
        const length = 60;
        return value.length <= length
          ? value
          : value.substring(0, length) + "...";
      },
      async addMovieWatchList(id){
        const fData ={"movies_id": id, "watch_lists_id": this.created_id};
        await this.addItemWatchList(fData);
        this.getWatchListItems();
      },

      async getWatchListItems(){
        const data = await this.getItems(this.created_id);
        this.items = data;
      },

      done(){
        this.$router.push({
          path: '/watchlist'
        });
      },
      async removeItem(id){
        await this.deleteItemWatchList(id);
        this.getWatchListItems();
      },
    },
    computed: {

    },
    watch: {
      search: function (value) {
        this.search = value;
        this.searchMovies();
      },
  },
}


</script>

<style>
.card-c {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 60%;
  margin-top: 20px;
  margin-left: 280px;
  cursor: pointer;
}

.card-c:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.a {
  padding: 2px 16px;
}
.image-a {
  width: 50px;
  height: 50px;
}

.movies {
  border: 3px solid black;
  cursor: pointer;
  margin-top: 20px;
}
</style>
