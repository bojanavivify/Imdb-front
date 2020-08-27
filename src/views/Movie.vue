<template>
  <section class="movie">
    <div class="container">
      <h1>{{title}}</h1>
      <p>Page view: {{page_view}}</p>
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
      <div v-show="onWatchList">
        <div v-show="messageWatchList == 'to watch'">
          <img src="@/assets/past.png" />
          {{messageWatchList}}
        </div>
        <div v-show="messageWatchList == 'watched'">
          <img src="@/assets/tick.png" />
          {{messageWatchList}}
        </div>
      </div>
      <p>{{description}}</p>
      <img :src="image_url" />
      <br />
      <div style="margin-top:20px;">
        <div v-show="onWatchList">
          <button class="btn btn-success" @click="deleteItem()">
            Alreday added to watch list
            <img style="margin-left:10px;" src="@/assets/tick.png" />
          </button>
        </div>
        <div v-show="!onWatchList">
          <button class="btn btn-success" @click="addItem()">
            <img style="margin-right:10px;" src="@/assets/plus.png" />
            Add to watch list
          </button>
        </div>
      </div><br/><br/>
      <h4>Related movies:</h4>
      <div class="main-related">
        <div class="related" v-for="title in relatedMovies" :key="title">
          <button class="btn btn-info" @click="getOneMovieRelated(title)">{{title}}</button>
        </div>
      </div>
    </div>
    <br />
    <div class="comment">
      <h3>Comments:</h3>
      <br />
      <div>
        <textarea rows="6" cols="70" v-model="new_text"></textarea>
        <button
          class="btn btn-dark btn-lg btn-block"
          style="width:50%;margin-left:25%;"
          @click="createComment()"
        >Leave a comment</button>
      </div>
      <br />
      <div v-for="comment in comments" :key="comment">
        <div class="single">
          <p>
            <i style="margin-right:50px;">{{comment.name}} {{comment.created_at}}</i>
            <a @click="deleteComment(comment.id)">
              <i class="fa fa-trash" v-if="comment.user_id == user_id"></i>
            </a>
          </p>
          <p>
            <b>{{comment.text}}</b>
          </p>
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
import { mapActions, mapGetters } from "vuex";

  export default  {
    name: 'Movie',
    props: [],
    mounted () {
      this.getMovie();
    },
    data () {
      return {
        title: this.$route.params.title,
        description: null,
        image_url: null,
        genre_id: null,
        movie_id: null,
        user_id: null,
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
        new_text: '',
        onWatchList: null,
        messageWatchList: null,
        item_id:null,
        default_id: null,
        page_view: null,
      }
    },
    methods: {
      ...mapActions("genre", ["getGenre"]),
      ...mapActions("votes", ["getMovieVotes", "getUVote",
       "createVote", "updateVote", "deleteVote"]),
      ...mapActions("comment", ["getMovieComments", "getNextPage", 
      "deleteSpecComment", "createNewComment"]),
      ...mapActions("watchList", ["getDefault","checkMovieWatchList",
       "deleteItemWatchList", "addItemWatchList"]),
      ...mapActions("movies",["incrementMovieView", "findRelatedMovies",
      "findOneMovie"]),
      ...mapActions("auth",["getUserData"]),
      ...mapActions("image",["getImageMovie"]),
      async getMovie(){
        const data = await this.findOneMovie(this.title);
        this.description = data.description;
        this.genre_id = data.genre_id;
        this.movie_id = data.id;
        this.findMovieImage(data.image_movies_id);
        this.getUser();
      },

      async findMovieImage(id){
        const data = await this.getImageMovie(id);
        console.log(data)
        this.image_url = data.name;
      },

      async getUser(){
        const data = await this.getUserData();
        this.user_id = data.id;
        this.foundGenre();
        this.getVotes();
        this.getUserVote();
        this.getAllComments();
        this.checkWatchList();
        this.getDefaultWatchList();
        this.incrementView();
        this.getRelatedMovies();
      },

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
        this.getData(data.data, data.next_page_url);
        this.page++;
      },

      getData(data, next_page_url) {
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

      async checkWatchList(){
        const fData = {'user': this.user_id, 'movie': this.movie_id};
        const data = await this.checkMovieWatchList(fData);
        this.onWatchList = data.result;
        this.messageWatchList = data.status;
        this.item_id = data.id;
      },

      async deleteItem(){
        await this.deleteItemWatchList(this.item_id);
        this.onWatchList = false;
      },

      async addItem(){
        const fData ={"movies_id": this.movie_id, "watch_lists_id": this.default_id};
        await this.addItemWatchList(fData);
        this.checkWatchList();
      },

      async getDefaultWatchList(){
        const data = await this.getDefault(this.user_id);
        this.default_id = data.id;
      },

      async incrementView(){
        const fData ={"movie_id": this.movie_id};
        const data = await this.incrementMovieView(fData);
        this.page_view = data.page_view;
      },

      async getRelatedMovies(){
        await this.findRelatedMovies(this.movie_id);
      },

      async getOneMovieRelated(title){
        const data = await this.findOneMovie(title);
        this.$router.push("/movie/"+ data.title);
      },
    },
    computed: {
      ...mapGetters('movies',['relatedMovies'])

    },
    watch: {
      comments() {
      this.pages = [];
      this.setPages();
      },
    },
    beforeRouteUpdate(to) {
      this.title = to.params.title
      this.getMovie();
      window.scrollTo(0,0);
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

.movie{
  margin-top:30px;
}

.paga {
  padding-left: 600px;
  margin: 20px auto;
}

.comment {
  border-style: solid;
  border-color: #42b983;
  width: 50%;
  margin-left: 25%;
  margin-top: 200px;
}
.single {
  border: 1px solid black;
}
.related{
  float: left;
  padding-right: 30px;
  padding-top:20px;
}

.main-related{
  width:90%;
  margin-top:20px;
  padding-left:200px;
}
</style>
