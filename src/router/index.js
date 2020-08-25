import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Logout from '../components/Logout.vue'
import Movie from '../views/Movie.vue'
import WatchList from '../views/WatchList.vue'
import CreateWatchList from '../views/CreateWatchList.vue'
import SeeWatchList from '../views/SeeWatchList.vue'


const guest = (to, from, next) => {
  if (localStorage.getItem("authToken")== null) {
    return next();
  } else {
    return next("/");
  }
};
const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")!= null) {
    return next();
  } else {
    return next("/login");
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: auth,
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: guest,
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: guest,
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: auth,
    component: Logout
  },
  {
    path: '/watchlist',
    name: 'WatchList',
    beforeEnter: auth,
    component: WatchList
  },
  {
    path: '/movie/:title',
    name: 'Movie',
    beforeEnter: auth,
    component: Movie,
    props: true 
  },
  {
    path: '/watchList/:id',
    name: 'SeeWatchList',
    beforeEnter: auth,
    component: SeeWatchList,
    props: true 
  },
  {
    path: '/createWatchList',
    name: 'CreateWatchList',
    beforeEnter: auth,
    component: CreateWatchList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
