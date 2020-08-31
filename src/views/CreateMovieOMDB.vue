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

        <button
          style="margin-bottom:20px;"
          class="btn btn-success btn-block"
          @click="create"
          :disabled="title.length<1" 
        >Create</button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { mapActions} from "vuex";

  export default  {
    name: 'CreateMovieOMDB',
    props: [],
    mounted () {

    },
    data () {
      return {
        title: '',

      }
    },
    methods: {
      ...mapActions('movies',["createMovieOMDB"]),
      async create(){
        const fData = {"title": this.title};
        await this.createMovieOMDB(fData);
        this.$router.push("/movie/" + this.title);

      },

    },
    computed: {

    }
}


</script>

<style>
</style>
