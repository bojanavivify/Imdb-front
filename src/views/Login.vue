<template>
  <div class="vue-tempalte">
    <h3>Sign In</h3>
    <div class="col-sm-3 col-centered">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email"  />
        <div class="form__error" v-if='email == ""'>
              *This field is required.
        </div>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password" />
        <div class="form__error" v-if='password == ""'>
              *This field is required.
        </div>
      </div>

      <button class="btn btn-dark btn-lg btn-block" @click="signIn" 
      :disabled="email.length<1 || password<1">Sign In</button>
    </div>
    <Error
      v-show="isModalVisible"
      @close="closeModal"
      :msg=error
    />
  </div>
</template>

<script lang="js">
  import { mapActions } from "vuex";
  import Error from '../components/Error.vue';

  export default  {
    name: 'Login',
    components:{
      Error
    },
    props: [],
    mounted () {},
    data () {
      return {
        email: '',
        password: '',
        isModalVisible: false,
        error: null
      }
    },
    methods: {
      ...mapActions("auth", ["sendLoginRequest"]),
      async signIn(){
        var formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);
        const data = await this.sendLoginRequest(formData);
        if (data == 0){
          this.$router.go(0);
          this.$router.push({ name: "Home" });
        }else{
          this.error = data;
          this.showModel();
        }
      },
      closeModal() {
        this.isModalVisible = false;
      },
      showModel(){
        this.isModalVisible = true;
      }
    },
    computed: {}
}
</script>
