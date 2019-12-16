<template>
  <div>
    <h1>{{header_title}}</h1>
    <div>
    </div>
  </div>
</template>

<script>
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
        var obj = [];
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){   
              var myJSON = JSON.parse(xmlhttp.responseText);
              console.log(myJSON);
              console.log(myJSON.data.Shirts);
            }
        }
        //xmlhttp.open("GET", 'https://salomonsson.it/SALOCONSULTING/API/api_most_popular_tags.php', true);
        xmlhttp.open("GET", 'http://www.salomonsson.it/SALOCONSULTING/API/f-e/mock-shirts.php', true);
        xmlhttp.send();

    },
  },
};
</script>
