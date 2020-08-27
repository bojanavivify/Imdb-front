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
          <label>Genre</label>
          <br />
          <select id="categories" v-model="genre_id">
            <option v-for="genre in genres" :key="genre" :value="genre.id">{{ genre.name }}</option>
          </select>
          <br />
          <br />
        </div>
        <br />
        <div class="row">
          <div class="col-md-3" v-if="image">
            <img :src="image" class="img-responsive" height="70" width="90" />
          </div>
          <div class="col-md-6">
            <input type="file" v-on:change="onImageChange" class="form-control" />
          </div>
        </div><br/><br/>
        <button
          style="margin-bottom:20px;"
          class="btn btn-success btn-block"
          @click="create"
          :disabled="title.length<1 || description.length<1 || genre_id == null || image== ''" 
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
        image: ''
      }
    },
    methods: {
      ...mapActions("genre", ["getAllGenre"]),
      ...mapActions('movies',["createMovie"]),
      ...mapActions('image',["uploadImageMovie"]),
      async getAllGenres() {
        const data = await this.getAllGenre();
        this.genres = data;
      },

      async create(){
        const fData = {"title": this.title, "description":this.description,"genre_id":this.genre_id};
        const data = await this.createMovie(fData);
        this.uploadImage(data.id, data.title);
      },
      onImageChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async uploadImage(movie_id, title){
        const data = {"image": this.image, "movie_id":movie_id};
        await this.uploadImageMovie(data);
        this.$router.push("/movie/" + title);
        
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
