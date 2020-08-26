<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register" v-show="login">Register</router-link>
      <router-link to="/watchlist" v-show="logout">Watch list</router-link>|
      <router-link to="/logout" v-show="logout">Logout</router-link>
      <router-link to="/login" v-show="login">Login</router-link>    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  props: [],
  mounted() {
    if (localStorage.getItem("authToken")) {
        this.logout = true;
      }else{
        this.login = true;
      }
  },
  data() {
    return {
      login: false,
      logout: false,
      password: null,
    };
  },
  methods: {},
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
