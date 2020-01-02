<template>
  <div>
    <h1>Shirts and jumpers</h1>
    <div>
      <div v-if="sortedActive">
        You have sorted filer active: <b>{{sortedValue}}</b>
      </div>
      <button @click="cancelSort()" style="float:right;height:3rem;background-color:yellow;">Clear Sorting</button>
      <br />
      <!-- {{Sorted_list_computed}} -->
      <span v-for="o in colours" v-bind:key="o" style="padding-left:20px;">
        <button @click="SortColours(o)">{{o}}</button>
      </span>
    </div>
    <hr>
    <div>
      Current array length: {{shirts.length}}
    </div>
    <main :class="$style.cards">
      <div v-for="o in shirts" v-bind:key="o.id">
          <img v-bind:src="o.image">
          <div :class="$style.meta">
              <span :class="$style.info">
                {{o.name}}, {{o.type}}
              </span>
              <span :class="$style.addToCart">
                {{o.price}}:-
              </span>
          </div>
          <div :class="$style.meta">
              <span :class="$style.info">
                Dont know
              </span>
              <span :class="$style.addToCart" v-if="o.inCart">
                <button @click="RemoveFromCart(o)">{{o.inCart}}</button>
                <span :class="$style.yellowDot"></span>
              </span>
              <span :class="$style.addToCart" v-if="!o.inCart">
                <button @click="AddToCart(o)">Add</button>
              </span>
          </div>
      </div>
    </main>
  

  
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  MAIN__ITEM_ADD,
  MAIN__ITEM_ADD_ASYNC,
  MAIN__ITEM_DELELE,
} from '../store/const/main';

export default {
  metaInfo: {
    title: 'Main page',
  },
  props:{
    
  },
  data() {
    return {
      title: 'Default title',
      sortedList: [],
      sortedActive: false,
      sortedValue: '',
    };
  },
  mounted: () => {
  },
  computed: {
    // ...mapGetters({
    //   AllShirtsCollection: state => state.main.mapGetters.SHIRTS,
    // }),
    ...mapState({
      items:  state => state.main.items,
      shirts: state => state.main.SHIRTS,
      cart: state => state.main.CART,
      colours: state => state.main.COLOURS,
    }),
    Sorted_list_computed(){
      // return this.shirts;
      return this.sortedList;
    },
  },
  
  created: function() {

  },

  serverPrefetch() {
    console.log('Run only on server');
  },

  methods: {


    /**
     * Add shirt to cart through vuex state.
     */
    AddToCart(shirt){
      this.$store.dispatch("ACTION_ITEM_CART", shirt);
    },


    RemoveFromCart(shirt){
      return this.$store.commit("REMOVE_ITEM_CART", shirt );
    },


    onChangeTitle(e) {
      this.$data.title = e.target.value;
    },


    onRemoveItem(e) {
      const id = +e.target.getAttribute('data-id');
      return this.$store.commit(MAIN__ITEM_DELELE, { id });
    },

    //Set default value to the current shirt array again
    cancelSort(){
      this.sortedActive = false;
      this.$store.commit("MAIN__DEFAULT_SHIRT_ARRAY", {self: this});
    },
  
    //Sort the colour of the shirt array from source
    SortColours(color){
      this.sortedActive = true;
      this.sortedValue = color;
      this.$store.dispatch("SORT_ALL_SHIRTS", color);
    },

  },
};
</script>

<style module>
  .item {
    padding: 3px 0;
  }

  .controls {
    margin-top: 12px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    max-height: 100vh;
  }
  .cards img {
    border: 3px solid grey;
    box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.3); 
    width: 200px;
  }
  .cards div {
    background-color: red;
    padding: 1rem;
  }
  .cards div .meta{
    background-color: yellow;
    display: flex;
  }

  .cards div .info{
    flex-basis: 100%;
    background-color: blue;
    padding: .4rem;
  }
  .cards div .addToCart{
    background-color: green;
    padding: .4rem;
  }

  .yellowDot{
    background-color:yellow;
    border: 1px solid black;
    position:absolute;
    height:10px;
    width:10px
  }
</style>
