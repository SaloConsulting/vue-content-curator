<template>
  <div>
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav  from './client/components/Nav.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    Nav,
  },
  computed: {

  },
  mounted(){
    console.log('Mounted app.vue');
    this.$store.dispatch("GET_ALL_COLOURS", { self: this });
    this.$store.dispatch("GET_ALL_SHIRTS", { self: this });
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
</style>

<style>
  body {
    font-family: Arial, sans-serif;
  }
</style>
