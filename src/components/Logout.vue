<template>
  <h1>Logout...</h1>
</template>

<script lang="js">
import { mapActions } from "vuex";

export default  {
  name: 'Logout',
  props: [],
  mounted () {
    this.logout();
  },
  
  data () {
      return {}
    },
  methods: {
    ...mapActions("auth", ["sendLogoutRequest"]),
    logout(){
      this.sendLogoutRequest().then(() => {
      alert("Successfully logout!");
      this.$router.go(0);
      this.$router.push({ name: "Login" });
     });
    }
  },
  computed: {}
}

</script>

<style >
</style>
