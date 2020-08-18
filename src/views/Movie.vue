<template>

  <section class="movie">
    <h1>{{title}}</h1>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'Movie',
    props: ['title', 'description', 'image_url'],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style>

</style>
