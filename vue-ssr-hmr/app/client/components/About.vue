<template>
  <div>
    <h1>{{header_title}}</h1>
    <div>
      tutorial is made here: <br />
      https://medium.com/js-dojo/how-i-made-it-easy-to-develop-on-vue-js-with-server-side-rendering-fdeebdd7e8d8
    </div>
    <div>
      It is boilerplate of VueJS application. It includes:
      <ul>
        <li>Server-side rendering (SSR)</li>
        <li>Single page application</li>
        <li>Vuex state management</li>
        <li>CSS modules</li>
        <li>Hot reloading, including server-side</li>
        <li>Code-splitting</li>
        <li>Easy and customizable build for local development and production</li>
        <li>Code quality</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'About page',
  },
  data() {
    return {
      header_title: 'About!!! page', 
    };
  },
  components: {
  },
  computed: {
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
  },
};
</script>
