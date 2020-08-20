<template>
  <section class="movie">
    <div class="container">
      <h1>{{title}}</h1>
      <div class="container">
        <p id="success"></p>
        <a @click="changePost('like')"><i @click="likePost" class="fa fa-thumbs-up" aria-hidden="true"></i> ({{ totallike }}) </a>
        <a  @click="changePost('dislike')" style="padding-left:20px;"><i class="fa fa-thumbs-down" aria-hidden="true"></i> ({{ totalDislike }})</a>
        <p v-show="visible"> You {{message}} this movie!</p>
      </div>
      <br>
      <p>
        <b>
          <i>Genre:</i>
        </b>
        {{name_genre}}
      </p>
      <p>{{description}}</p>
      <img v-bind:src="image_url" />
    </div>
    <br />
  </section>
</template>

<script lang="js">
import { mapActions } from "vuex";

  export default  {
    name: 'Movie',
    props: ['title', 'description', 'image_url', 'genre_id', 'movie_id','user_id'],
    mounted () {
      this.foundGenre();
      this.getVotes();
      this.getUserVote();
    },
    data () {
      return {
        name_genre: null,
        totallike:'0',
        totalDislike: '0',
        message: '',
        visible: false,
        userVote: [],
      }
    },
    methods: {
      ...mapActions("genre", ["getGenre"]),
      ...mapActions("votes", ["getMovieVotes", "getUVote", "createVote", "updateVote"]),
      async foundGenre(){
        const data = await this.getGenre(this.genre_id);
        this.name_genre = data.name;
      },
      async getVotes(){
        const data = await this.getMovieVotes(this.movie_id);
        this.totallike = data.likes.length;
        this.totalDislike = data.dislikes.length;
      },
      async getUserVote(){
        const sentData ={"movie_id": this.movie_id, "user_id": this.user_id};
        const data = await this.getUVote(sentData);
        this.userVote = data;
        if(this.userVote.length == 1 && this.userVote[0].vote !='none'){
          this.visible = true;
          this.message = data[0].vote;
        }

      },
      changePost(message){
        if(this.userVote.length == 0){
          this.newVote(message);
        }else{
          if(this.userVote[0].vote != message){
            this.updateVotes(this.userVote[0].vote,message);
          }else if(this.userVote[0].vote == message){
            this.deleteVote(message);
          }
        }
      },
      async newVote(message){
        const fData = {vote: message, 
            movies_id:this.movie_id, user_id: this.user_id}
        await this.createVote(fData);
        this.visible = true;
        this.setDataLikeDislike(message);
        this.getUserVote();
      },
      async updateVotes(vote,message){
        const fData ={"vote": message};
        const all = {"id": this.userVote[0].id, "data": fData};
        await this.updateVote(all);
        this.setDataLikeDislike(message);
        if(message == 'like' && vote!='none'){
          this.totalDislike--;
        }else if (message == 'dislike' && vote!='none'){
          this.totallike--;
        }
        this.getUserVote();
      },
      async deleteVote(message){
        if(message == 'like'){
          this.totallike--;
        }else{
          this.totalDislike--;
        }
        message = 'none';
        const fData ={"vote": message};
        const all = {"id": this.userVote[0].id, "data": fData};
        await this.updateVote(all);
        this.getUserVote();
        this.visible = false;

      },
      setDataLikeDislike(message){
        this.visible = true;
        this.message = message;
        if(message == 'like'){
          this.totallike++;
        }else{
          this.totalDislike++;
        }
      },

    },
    computed: {

    }
}


</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
