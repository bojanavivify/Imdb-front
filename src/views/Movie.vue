<template>
  <section class="movie">
    <div class="container">
      <h1>{{title}}</h1>
      <div class="container">
        <p id="success"></p>
        <a @click="changePost('like')">
          <i @click="likePost" class="fa fa-thumbs-up" aria-hidden="true"></i>
          ({{ totallike }})
        </a>
        <a @click="changePost('dislike')" style="padding-left:20px;">
          <i class="fa fa-thumbs-down" aria-hidden="true"></i>
          ({{ totalDislike }})
        </a>
        <p v-show="visible">You {{message}} this movie!</p>
      </div>
      <br />
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
    <div class="comment">
      <h3>Comments:</h3><br/>
      <div>
        <textarea rows="6" cols="70" v-model="new_text"></textarea>
        <button class="btn btn-dark btn-lg btn-block" 
                style="width:50%;margin-left:25%;"
                @click="createComment()">Leave a comment</button>
      </div>
      <br/>
      <div v-for="comment in comments" :key="comment">
        <div class="single">
          <p><i style="margin-right:50px;">{{comment.name}} {{comment.created_at}}</i>  
            <a @click="deleteComment(comment.id)"><i class="fa fa-trash" 
            v-if="comment.user_id == user_id"></i></a>
          </p>
          <p><b>{{comment.text}}</b></p>
        </div>
      </div>
    </div>
    <div class="paga">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button
              type="button"
              @click="nextPage()"
              v-if="page < pages.length"
              class="page-link"
            >Show more</button>
          </li>
        </ul>
      </nav>
    </div>
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
      this.getAllComments();
    },
    data () {
      return {
        name_genre: null,
        totallike:'0',
        totalDislike: '0',
        message: '',
        visible: false,
        userVote: [],
        comments: [],
        page: 1,
        perPage: 10,
        pages: [],
        count_comments: null,
        next_url: null,
        // previous_url: null,
        new_text: '',
      }
    },
    methods: {
      ...mapActions("genre", ["getGenre"]),
      ...mapActions("votes", ["getMovieVotes", "getUVote", "createVote", "updateVote", "deleteVote"]),
      ...mapActions("comment", ["getMovieComments", "getNextPage", "deleteSpecComment", "createNewComment"]),
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
            this.deleteVotes(message);
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
        if(message == 'like'){
          this.totalDislike--;
        }else{
          this.totallike--;
        }
        this.getUserVote();
      },
      async deleteVotes(message){
        if(message == 'like'){
          this.totallike--;
        }else{
          this.totalDislike--;
        }
        await this.deleteVote(this.userVote[0].id);
        this.visible = false;
        this.userVote = [];

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
      async getAllComments(){
        const data = await this.getMovieComments(this.movie_id);
        this.comments = data.data;
        this.count_comments = data.total;
        this.next_url = data.next_page_url;

      },
      setPages() {
      let numberOfPages = Math.ceil(this.count_comments / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
      async nextPage() {
        const data = await this.getNextPage(this.next_url);
        this.getData(data.data, data.next_page_url, data.prev_page_url);
        this.page++;
      },
      getData(data, next_page_url, prev_page_url) {
        this.comments = [].concat.apply(this.comments, data);
        this.next_url = next_page_url;
      },
      async deleteComment(id){
        await this.deleteSpecComment(id);
        this.getAllComments();    
      },
      async createComment(){
        if(this.new_text!= ''){
          const fData ={"text": this.new_text, "user_id":this.user_id,"movies_id":this.movie_id};
          await this.createNewComment(fData);
          this.getAllComments();
          this.new_text = '';  
        }    
      },
    },
    computed: {

    },
    watch: {
      comments() {
      this.pages = [];
      this.setPages();
    },
    },
}


</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.paga {
  padding-left: 600px;
  margin: 20px auto;
}

.comment{
  border-style: solid;
  border-color: #42b983;
  width:50%;
  margin-left:25%;
}
.single{
  border: 1px solid black;
}

</style>
