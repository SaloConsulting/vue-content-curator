<template>
  <div>
  <h1>{{header_title}}</h1>
  <div style="padding:4rem;border:1px solid black;display: flow-root;" class="container">
    <div>
      Cart has <b>{{cart.length}}</b> and total price is <b>{{totalPriceCart}}:-</b>
    </div>
    <div v-for="o in cart" v-bind:key="o.id" :class="$style.gallery">
      <a target="_blank" href="img_5terre.jpg">
        <img v-bind:src="o.image" width="600" height="400">
      </a>
      <div :class="$style.desc">
        {{o.name}} {{o.type}}, {{o.price}}:-
        <br /><button @click="RemoveFromCart(o)">Remove from Cart</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'CART page',
  },
  data() {
    return {
      header_title: 'Overview of cart',
      totalPriceCart: 0,
    };
  },
  props:{
  },
  computed: {
    ...mapState({
      cart: state => state.main.CART,
    }),
  },
  mounted: () => {
  },
  serverPrefetch() {
    console.log('Run only on server');
  },

  created: function() {
      this.TotalPrice();
  },
  
  methods: {
    TotalPrice() {
      var localCartArray = Array();
      localCartArray = this.$store.state.main.CART;
      var total = 0;
      for (var key in localCartArray) {
        // skip loop if the property is from prototype
        if (!localCartArray.hasOwnProperty(key)) continue;
          total += parseInt(localCartArray[key].price, 10);
      }
      this.totalPriceCart = total;
    },
    RemoveFromCart(shirt){
      //Update the global state cart
      this.$store.commit("REMOVE_ITEM_CART", shirt );
      this.TotalPrice();
    },
  },
};
</script>

<style module>
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}

</style>