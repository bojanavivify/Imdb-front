<template>

  <section class="movie">
    <div class="container">
      <h1>{{title}}</h1>
      <p><b><i>Gender:</i></b> {{name_genre}}</p>
      <p>{{description}}</p>
      <img v-bind:src="image_url" />
    </div>
    <br>
    
  </section>

</template>

<script lang="js">
import { mapActions } from "vuex";

  export default  {
    name: 'Movie',
    props: ['title', 'description', 'image_url', 'genre_id'],
    mounted () {
      this.foundGenre();
    },
    data () {
      return {
        name_genre: null
      }
    },
    methods: {
      ...mapActions("genre", ["getGenre"]),
      async foundGenre(){
        const data = await this.getGenre(this.genre_id);
        this.name_genre = data.name;
      }
    },
    computed: {

    }
}


</script>

<style>

</style>
