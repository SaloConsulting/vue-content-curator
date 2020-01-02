<template>
  <div>
    <h1>Shirts and jumpers</h1>
    <div>
      <div v-if="sortedActive">
        You have sorted filer active: <b>{{sortedValue}}</b>
      </div>
      <button @click="cancelSort()" style="float:right;height:3rem;background-color:cadetblue;">Clear Sorting</button>
      <br />
      <span v-for="o in colours" v-bind:key="o" style="padding-left:20px;">
        <button @click="SortColours(o)">{{o}}</button>
      </span>
    </div>
    <hr>
    <div style="font-style:bold;">
      Current array length: <span style="font-size:3rem;">{{shirts.length}}</span>
    </div>
    <main :class="$style.cards">
      <div v-for="o in shirts" v-bind:key="o.id" style="border: 1px solid lightgrey;margin:10px;">
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
                
              </span>
              <span :class="$style.addToCart" v-if="o.inCart">
                <button @click="RemoveFromCart(o)">
                  Remove
                </button>
                <span :class="$style.yellowDot"></span>
              </span>
              <span :class="$style.addToCart" v-if="!o.inCart">
                <button @click="AddToCart(o)">
                  Buy
                </button>
              </span>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    ...mapState({
      items:  state => state.main.items,
      shirts: state => state.main.SHIRTS,
      cart: state => state.main.CART,
      colours: state => state.main.COLOURS,
    }),
  },
  
  created: function() {

  },

  serverPrefetch() {
    console.log('Run only on server');
  },

  methods: {

    /**
     * Add shirt to cart through state.
     * @param: object
     */
    AddToCart(shirt){
      this.$store.dispatch("ACTION_ITEM_CART", shirt);
    },

    /**
     * Remove from cart
     * @param: object
     */
    RemoveFromCart(shirt){
      return this.$store.commit("REMOVE_ITEM_CART", shirt );
    },

    /**
     * Set default value to the current shirt array again
     * @param: 
     */
    cancelSort(){
      this.sortedActive = false;
      this.$store.commit("MAIN__DEFAULT_SHIRT_ARRAY", {self: this});
    },
  
    /**
     * Sort the colour of the shirt array from source
     * @param: 
     */
    SortColours(color){
      this.sortedActive = true;
      this.sortedValue = color;
      this.$store.dispatch("SORT_ALL_SHIRTS", color);
    },

  },
};
</script>

<style module>

  button{
    background-color: transparent;
    height: 50px;
    border: 1px solid
    lightgray;
    border-radius: 5px;
    padding: 10px;
  }
  button:hover{
    cursor: pointer;
    background-color: lightgrey;
  }

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
    /* background-color: red; */
    padding: 1rem;
  }
  .cards div .meta{
    /* background-color: yellow; */
    display: flex;
  }

  .cards div .info{
    flex-basis: 100%;
    /* background-color: blue; */
    padding: .4rem;
  }
  .cards div .addToCart{
    /* background-color: green; */
    padding: .4rem;
  }

  .yellowDot{
    background-color:yellow;
    border: 1px solid black;
    position:absolute;
    height:20px;
    width:20px;
    border-radius: 25px;
  }
</style>
