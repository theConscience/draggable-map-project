import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import { updateCoordinates, setMapLoaded } from './actions';  // import * as actions from './actions';
import mutations from './mutations';


Vue.use(Vuex);

const KITAY_GOROD = {
  top: -1300,
  left: -854
}

const state = {
  mapName: 'Moscow',
  coordinates: KITAY_GOROD,
  mapLoaded: false,
}

export default new Vuex.Store({
  state: state,
  getters: {  //getters
    mapName: state => {
      return state.mapName;
    },

    coordinates: state => {
      return state.coordinates;
    },

    mapLoaded: state => {
      return state.mapLoaded;
    }
  },
  actions: {  //actions
    // updateCoordinates: function(context) {
    //   return updateCoordinates(context);
    // }  // or shorter syntax:
    updateCoordinates: updateCoordinates,
    setMapLoaded
  },
  mutations: mutations
});
