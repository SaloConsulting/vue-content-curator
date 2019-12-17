<template>
  <div>
  <h1>{{header_title}}</h1>
  <div>
    <div v-for="o in cart" v-bind:key="o.id" :class="$style.gallery">
      <a target="_blank" href="img_5terre.jpg">
        <img v-bind:src="o.image" width="600" height="400">
      </a>
      <div :class="$style.desc">
        {{o.name}} <button @click="RemoveFromCart(o)">Remove from Cart</button>
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
      header_title: 'CART!!! page', 
    };
  },
  computed: {
    ...mapState({
      cart: state => state.main.CART,
    }),
  },
  mounted: () => {
    console.log('Mounted');
  },
  serverPrefetch() {
    console.log('Run only on server');
  },

  created: function() {
      console.log('hej created');
      this.metaInfo();
  },
  
  methods: {
    metaInfo() {
      console.log('you are a mother fucker');
    },
    RemoveFromCart(shirt){
      return this.$store.commit("REMOVE_ITEM_CART", shirt );
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