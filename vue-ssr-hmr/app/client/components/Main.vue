<template>
  <div>
    <h1>Shopping list</h1>
    <div>
      <span v-for="o in shirts" v-bind:key="o.id" style="padding-left:20px;">
        {{o.name}} <button @click="AddToCart(o)">Add To Cart</button>
      </span>
    </div>
    <div v-for="o in shirts" v-bind:key="o.id" :class="$style.item">
      {{o}}
      <span>{{ o.name }} (ID: {{o.id}})</span> <br />
      <span>{{ o.type }}</span> <br />
      <br /><br />
    </div>
<hr>
    
    <div v-for="item in items" v-bind:key="item.id" :class="$style.item">
      <span>{{ item.title }}</span>
      <span>
        <button @click="onRemoveItem" :data-id="item.id">Remove</button>
      </span>
    </div>

    <div :class="$style.controls">
      <input @value="title" @input="onChangeTitle" />
      <button @click="addItem">Add item</button>
      <button @click="addAsyncItem">Add item after one second</button>
    </div>
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
    };
  },
  created(){
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
    }),
  },
  serverPrefetch() {
    console.log('Run only on server');
  },

  methods: {
    addAsyncItem() {
      const item = {
        id: Math.floor(Math.random() * 100),
        title: this.$data.title,
      };

      this.$store.dispatch(MAIN__ITEM_ADD_ASYNC, { item });
    },
    addItem() {
      const item = {
        id: Math.floor(Math.random() * 100),
        title: this.$data.title,
      };

      return this.$store.commit(MAIN__ITEM_ADD, { item });
    },

    /**
     * Add shirt to cart through vuex state.
     */
    AddToCart(shirt){
      this.$store.dispatch("ACTION_ITEM_CART", shirt);
    },

    onChangeTitle(e) {
      this.$data.title = e.target.value;
    },
    onRemoveItem(e) {
      const id = +e.target.getAttribute('data-id');
      return this.$store.commit(MAIN__ITEM_DELELE, { id });
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
</style>
