
export default {
  state: {
    CART: [],
    SHIRTS_DEFAULT: [],
    SHIRTS: [],
    SHIRTS_SORTED: [],
    COLOURS: [],
  },

  /**
   * You never commit from any of your components / routes. It is done only from within an action, 
   * and only when you have some data to commit. Reason: commit is synchronous and may freeze your frontend till it is done.
   */
  mutations: {
    
    ['REMOVE_ITEM_CART'](state, obj ) {
      //Remove item from cart
      state.CART = state.CART.filter(item => item.id !== obj.id);
      //Set false to inCart the object in shirt list
      for (var key in state.SHIRTS) {
        if(state.SHIRTS[key].id == obj.id){
          state.SHIRTS[key].inCart = false;
        }
      }      
    },
    ['UPDATE_SHIRT_ITEM'](state, obj ) {
      for (var key in state.SHIRTS) {
        if(state.SHIRTS[key].id == obj.id){
          state.SHIRTS[key].inCart = true;
        }
      }
    },

    ['ADD_ITEM_CART'](state, obj ) {
      var OBJECT = {
        "cartID": Math.floor((Math.random() * 5000) + 1),
        "id": obj.id,
        "price": obj.price,
        "inCart": true,
        "description": obj.description,
        "name": obj.name,
        "type": obj.type,
        "size": obj.size,
        "image": obj.image
      };
      const items = [...state.CART];
      items.push(OBJECT);
      state.CART = items;
    },
    
    ['MAIN__SORTCOLOURS_NAMES'](state, arrayItems ) {
      var color = new Array();
      for (var key in arrayItems.Shirts) {
          // skip loop if the property is from prototype
          if (!arrayItems.Shirts.hasOwnProperty(key)) continue;
            //Check if name/colours already exsist
            color.push(arrayItems.Shirts[key].name);
        }
        var uniqueNames = [];
        $.each(color, function(i, el){
          if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        state.COLOURS = uniqueNames;
    },

    ['MAIN__SORTCOLOURS'](state, color ) {
        state.SHIRTS = [];
        for (var key in state.SHIRTS_DEFAULT) {
          if(state.SHIRTS_DEFAULT[key].name == color){
            //console.log(state.SHIRTS_DEFAULT[key].name);
            const items = [...state.SHIRTS];
            items.push(state.SHIRTS_DEFAULT[key]);
            state.SHIRTS  = items;
          }
        }
    },

    //Once sort has been done - make the shirt array default again
    ['MAIN__DEFAULT_SHIRT_ARRAY'](state) {
      state.SHIRTS = state.SHIRTS_DEFAULT;
    },
    
    ['MAIN__SHIRTITEMS'](state, arrayItems ) {
      state.SHIRTS = [];
      var k = 0;
      for (var key in arrayItems.Shirts) {
        // skip loop if the property is from prototype
        if (!arrayItems.Shirts.hasOwnProperty(key)) continue;
        setTimeout(() => {
          k++;
          Delay(k);
        }, key * 100);
      }
      //Make some delay to the rendering
      function Delay(key){
        //console.log('KEY: ' + key);
        const items = [...state.SHIRTS];
        items.push(arrayItems.Shirts[key]);
        state.SHIRTS_DEFAULT  = items;
        state.SHIRTS  = items;
      }
    },

  },


  /*
  * You always use $dispatch from your methods in routes / components. $dispatch sends a message to your vuex store to do some 
  * action. The action may be done anytime after the current tick, so that your frontend performance is not affected.
  */
  actions: {
    ['GET_ALL_SHIRTS']({ commit })  {
      var response = {
        "shirtInfo": "This is the shirt fake data.",
        "Shirts": {
             "1": { "id": 11, "price": 499, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill. Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant. Combine with Glen Plaid Blazer for a complete suit.",   "name": "Brun",  "type": "Cusual",       "size": "Larg",  "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_890_f_f_cusna_shirt_scandinavia_dbrown5473.jpg?auto=format&w=800"},
             "2": { "id": 12, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Grå",  "type": "Cusual", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_940_f_h_cusna_shirt_scandinavia_lgrey.jpg?auto=format&w=600"},
             "3": { "id": 13, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Gul",  "type": "Cusual",     "size": "Smal",  "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_160_f_f_cusna_shirt_scandinavia_yellow5485.jpg?auto=format&w=600"},
             "4": { "id": 14, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Mörkblå",  "type": "Cusual", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_583_f_f_cusna_shirt_scandinavia_navy5471.jpg?auto=format&w=600"},
             "5": { "id": 15, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Mörkblå",  "type": "Jumper", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7238081_590_f_h_kebenekaise_knit_scandinavia_dblue.jpg?auto=format&w=600"},
             "6": { "id": 16, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Vit",  "type": "Jumper", "size": "Smal",      "image": "https://voltfashion.imgix.net/globalassets/productimages/7238081_920_f_h_kebenekaise_knit_scandinavia_offwhite.jpg?auto=format&w=600"},
             "7": { "id": 17, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Grå",  "type": "Jumper", "size": "Mediu",     "image": "https://voltfashion.imgix.net/globalassets/productimages/7238091_590_f_h_kjerag_knit_scandinavia_dblue.jpg?auto=format&w=600"}
        }
      };
      commit('MAIN__SHIRTITEMS', response );
    },
    ["ACTION_ITEM_CART"]({ commit },  item ) {
      commit('ADD_ITEM_CART', item );
      commit('UPDATE_SHIRT_ITEM', item );
    },
    ['GET_ALL_COLOURS']({ commit })  {
      var response = {
        "shirtInfo": "This is the shirt fake data.",
        "Shirts": {
             "1": { "id": 11, "price": 499, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill. Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant. Combine with Glen Plaid Blazer for a complete suit.",   "name": "Brun",  "type": "Cusual",       "size": "Larg",  "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_890_f_f_cusna_shirt_scandinavia_dbrown5473.jpg?auto=format&w=800"},
             "2": { "id": 12, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Grå",  "type": "Cusual", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_940_f_h_cusna_shirt_scandinavia_lgrey.jpg?auto=format&w=600"},
             "3": { "id": 13, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Gul",  "type": "Cusual",     "size": "Smal",  "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_160_f_f_cusna_shirt_scandinavia_yellow5485.jpg?auto=format&w=600"},
             "4": { "id": 14, "price": 599, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Mörkblå",  "type": "Cusual", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7239410_583_f_f_cusna_shirt_scandinavia_navy5471.jpg?auto=format&w=600"},
             "5": { "id": 15, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Mörkblå",  "type": "Jumper", "size": "Mediu", "image": "https://voltfashion.imgix.net/globalassets/productimages/7238081_590_f_h_kebenekaise_knit_scandinavia_dblue.jpg?auto=format&w=600"},
             "6": { "id": 16, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Vit",  "type": "Jumper", "size": "Smal",      "image": "https://voltfashion.imgix.net/globalassets/productimages/7238081_920_f_h_kebenekaise_knit_scandinavia_offwhite.jpg?auto=format&w=600"},
             "7": { "id": 17, "price": 799, "inCart": false, "description": "Cusna skjorta från These Glory Days är tillverkad i ett mjukt bomullsmaterial med klassisk button-down krage och regular passform. Modellen är 187 cm och har på sig en storlek M. True to size. <br /> <br/> Rutig, halvfodrad kostymbyxa i ullmix från These Glory Days. Byxorna har två sidofickor och en mindre myntficka framtill.  Kostymbyxorna har dessutom två fickor bak och bälteshällor. T Glen Plaid Pants byxan kommer i en smal passform med nedvikt kant nedtill och slitkant.  Combine with Glen Plaid Blazer for a complete suit.", "name": "Grå",  "type": "Jumper", "size": "Mediu",     "image": "https://voltfashion.imgix.net/globalassets/productimages/7238091_590_f_h_kjerag_knit_scandinavia_dblue.jpg?auto=format&w=600"}
        }
      };
      commit('MAIN__SORTCOLOURS_NAMES', response );
    },

    ["SORT_ALL_SHIRTS"]({ commit },  color ) {
      commit('MAIN__SORTCOLOURS', color );
    },

  },
  
};

