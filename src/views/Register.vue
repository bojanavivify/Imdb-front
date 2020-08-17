<template>
  <div class="vue-tempalte">
    <h3>Register</h3>
    <div class="col-sm-3 col-centered">
      <div class="form-group">
        <label>Name</label>
        <input type="email" class="form-control form-control-lg" v-model="name" />
        <div class="form__error" v-if="name == '' ">*This field is required.</div>
      </div>

      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
        <div class="form__error" v-if="email == '' ">*This field is required.</div>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password" />
        <div class="form__error" v-if="password == '' ">*This field is required.</div>
      </div>

      <div class="form-group">
        <label>Repeat Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password_confirmation" />
        <div class="form__error" v-if="password_confirmation == '' ">*This field is required.</div>
      </div>

      <button
        class="btn btn-dark btn-lg btn-block"
        @click="signIn"
        :disabled="email.length<1 || password<1 || name.length<1 ||
       password_confirmation<1"
      >Regiser</button>
    </div>
    <Error v-show="isModalVisible" @close="closeModal" :msg="error" />
  </div>
</template>

<script lang="js">
  import { mapActions } from "vuex";
  import Error from '../components/Error.vue';

  export default  {
    name: 'Register',
    components:{
      Error
    },
    props: [],
    mounted () {},
    data () {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isModalVisible: false,
        error: null
      }
    },
    validations: {},
    methods: {
      ...mapActions("auth", ["sendRegisterRequest"]),
      async signIn(){
        var formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('password_confirmation', this.password_confirmation);
        const data = await this.sendRegisterRequest(formData);
        console.log(data);
        if (data == 0){
          this.$router.push({ name: "Login" });
        }else{
          this.error = data.toString();
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
