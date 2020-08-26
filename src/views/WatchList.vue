<template >
  <section class="watch-list">
    <div class="parent-container d-flex">
      <div class="container">
        <div class="row">
          <div style="margin-bottom:20px;" class="col-xs-6" v-for="item in items" :key="item">
            <div class="right-picture">
              <img class="image-small" v-bind:src="item.image_url" />
            </div>
            <div class="left-text">
              <h2>{{item.title}}</h2>
              <p>{{trucateText(item.description)}}</p>
              <button
                @click="updateItem('watched',item.id)"
                class="btn btn-success"
                v-show="item.status == 'to watch'"
              >
                <img src="@/assets/past.png" />
                To watch
              </button>
              <button
                @click="updateItem('to watch',item.id)"
                class="btn btn-success"
                v-show="item.status == 'watched'"
              >
                <img src="@/assets/tick.png" />
                Watched
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col" style="padding-left:250px;">
            <button @click="createWatchList()" class="btn btn-warning">+ Create watch list</button>
          </div>

          <div
            class="col-lg"
            style="padding-left:250px; padding-top:30px;"
            v-show="watchLists.length != 0"
          >
            <div class="card" v-for="item in watchLists" :key="item">
              <div class="a" @click="openWatchList(item)">
                <h4>
                  <b>{{item.title}}</b>
                </h4>
                <p>{{item.description}}</p>
              </div>
              <a @click="removeWatchList(item.id)"><i style="margin-left:70px;" class="fa fa-trash" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { mapActions } from "vuex";

  export default  {
    name: 'WatchList',
    props: [],
    mounted () {
      this.getUser();
    },
    data () {
      return {
        user_id: null,
        items: null,
        watchLists: [],
      }
    },
    methods: {
      ...mapActions("auth", ["getUserData"]),
      ...mapActions("watchList", ["getDefaultItems","changeItem", 
      "findAllWatchLists", "deleteWatchList"]),
      async getUser() {
        const data = await this.getUserData();
        this.user_id = data.id;
        this.getDefaultList();
        this.getWatchLists();
      },

      async getWatchLists(){
        const data = await this.findAllWatchLists(this.user_id);
        this.watchLists = data;
      },

      async getDefaultList() {
        const data = await this.getDefaultItems(this.user_id);
        this.items = data;
      },
      trucateText(value) {
      const length = 80;
      return value.length <= length
        ? value
        : value.substring(0, length) + "...";
      },

      async updateItem(status,id){
        const fData ={"item_id": id, "status":status};
        await this.changeItem(fData);
        this.getDefaultList();
      },
      async openWatchList(item){
        this.$router.push({
          path: '/watchList/' + item.id
        });
      },
      createWatchList(){
        this.$router.push({
          path: '/createWatchList'
        });
      },
      async removeWatchList(id){
        await this.deleteWatchList(id);
        this.getWatchLists();
      },

    },
    computed: {

    }
}


</script>

<style>
.left-text {
  display: table-cell;
  vertical-align: middle;
}

.right-picture {
  display: table-cell;
}

.image-small {
  width: 150px;
  height: 150px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  margin-top:20px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.a {
  padding: 2px 16px;
  cursor: pointer;
}
</style>
