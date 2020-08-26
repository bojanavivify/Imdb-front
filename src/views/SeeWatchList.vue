<template >
  <h1>{{title}}</h1><br/>
  <h4>Movies:</h4>
  <div class="co" v-for="item in items" :key="item">
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
</template>

<script lang="js">
  import { mapActions } from "vuex";

  export default  {
    name: 'SeeWatchList',
    props: ['id'],
    mounted () {
      this.findItems();
      this.getWatchListDetails();
    },
    data () {
      return {
        items: [],
        title: null,
      }
    },
    methods: {
      ...mapActions("watchList", ["getItems", "getWatchList", "changeItem"]),
      async findItems(){
        const data = await this.getItems(this.id);
        this.items = data;
      },
      trucateText(value) {
      const length = 180;
      return value.length <= length
        ? value
        : value.substring(0, length) + "...";
      },
      async getWatchListDetails(){
        const data = await this.getWatchList(this.id);
        this.title = data.title;
      },
      async updateItem(status,id){
        const fData ={"item_id": id, "status":status};
        const data = await this.changeItem(fData);
        this.findItems();
      },
    },
    computed: {

    }
}


</script>

<style>
.co{
  margin-bottom:20px;
  border: 1px solid black;
  width: 80%;
  margin-left: 20px;
}
</style>
