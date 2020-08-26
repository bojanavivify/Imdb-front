<template>
  <section class="create-movie">
    <h1>Create Movie</h1>
    <div class="card-c">
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
        <div class="form-group">
          <label>Genre</label><br/>
          <select id="categories" v-model="genre_id">
            <option v-for="genre in genres" :key="genre" :value="genre.id">{{ genre.name }}</option>
          </select><br/><br/>
        </div>
        
        <button
          style="margin-bottom:20px;"
          class="btn btn-dark btn-lg btn-block"
          @click="create"
          :disabled="title.length<1 || description.length<1 || genre_id == null"
        >Create</button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import { mapActions} from "vuex";

  export default  {
    name: 'CreateMovie',
    props: [],
    mounted () {
      this.getAllGenres();

    },
    data () {
      return {
        title: '',
        description: '',
        genre_id: null,
        genres: null,
      }
    },
    methods: {
      ...mapActions("genre", ["getAllGenre"]),
      ...mapActions('movies',["createMovie"]),
      async getAllGenres() {
        const data = await this.getAllGenre();
        this.genres = data;
      },

      async create(){
        const fData = {"title": this.title, "description":this.description,"genre_id":this.genre_id};
        const data = await this.createMovie(fData);
        this.$router.push("/movie/" + data.title);
      },

    },
    computed: {

    }
}


</script>

<style >
.create-movie {
  margin-top: 30px;
}
</style>
