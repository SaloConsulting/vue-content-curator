<template>
  <div style="padding-top:30px;">
    <div>
      <!-- {{cart}} -->
    </div>
      <div :class="$style.linksImage">
        <router-link to="/cart">
        <img src="https://cdn.onlinewebfonts.com/svg/img_290616.png"/>
        <span>{{cart.length}}</span>
        </router-link> 
      </div>
    <div :class="$style.links">
      <router-link to="/" :class="$style.link">Main</router-link>
      <router-link to="/about" :class="$style.link">About</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'Main page',
  },
  data() {
    return {
      title: 'Default title',
    };
  },
  computed: {
    ...mapState({
      cart: state => state.main.CART,
    }),
  },
  mounted: () => {
    console.log('Mounted - Nav.vue');
  },

  serverPrefetch() {
    console.log('Run only on server');
  },

  methods: {

  },
};
</script>
<style module>
.link {
  border: 1px solid rgba(65, 86, 255, 0.79);
  padding: 8px;
  color: #394fcc;
  text-decoration: none;
}

.links {
  margin: 16px 0 56px;
}
.linksImage{
    /* background-color: red; */
    float: right;
    padding: 1rem;
}
.linksImage img{
    height: 3.3rem;
}
.linksImage:hover{
    background-color: whitesmoke;
    border-radius: 10%;
}
.linksImage span{
    position: absolute;
    top: 38px;
    right: 16px;
    background-color: yellow;
    font-size: 1.2rem;
    font-weight: bold;
    border: 2px solid black;
    border-radius: 50%;
    padding: 10px;
    width: 20px;
    text-align: center;
}
</style>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 30px;
  }
</style>
