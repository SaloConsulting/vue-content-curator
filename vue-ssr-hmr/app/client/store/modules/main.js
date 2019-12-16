import {
  MAIN__ITEM_DELELE,
  MAIN__ITEM_ADD,
  MAIN__ITEM_ADD_ASYNC,
} from '../const/main';

export default {
  state: {
    SHIRTS: [],
    items: [
      {
        id: 1,
        title: 'Milk',
      },
      {
        id: 2,
        title: 'Strawberry',
      },
      {
        id: 3,
        title: 'Egg',
      },
    ],
  },
  // getters:{
  //   // Compute derived state based on the current state. More like computed property.
  //   AllShirtsCollection: state => {
  //       return state.SHIRTS;
  //   },
  //   AllShirtsCollectionLength: state => {
  //     return state.SHIRTS.length
  //   },
  // },
  mutations: {
    [MAIN__ITEM_DELELE](state, { id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    [MAIN__ITEM_ADD](state, { item }) {
      const items = [...state.items];
      items.push(item);

      state.items = items;
    },

    ['MAIN__SHIRTITEMS'](state, arrayItems ) {
      state.SHIRTS = arrayItems.data.Shirts;
    },

  },
  actions: {
    [MAIN__ITEM_ADD_ASYNC]({ commit }, { item }) {
      setTimeout(() => {
        commit(MAIN__ITEM_ADD, { item });
      }, 1000);
    },

    ['GET_ALL_SHIRTS']({ commit })  {
      console.log('från main.js vuex - GET_ALL_SHIRTS');

      var xmlhttp;
      // compatible with IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200){   
            var object = JSON.parse(xmlhttp.responseText);
            // console.log(myJSON.data.Shirts);;
            commit('MAIN__SHIRTITEMS', object );
          }
      }
      //xmlhttp.open("GET", 'https://salomonsson.it/SALOCONSULTING/API/api_most_popular_tags.php', true);
      xmlhttp.open("GET", 'http://www.salomonsson.it/SALOCONSULTING/API/f-e/mock-shirts.php', true);
      xmlhttp.send();
    },

  },
};
