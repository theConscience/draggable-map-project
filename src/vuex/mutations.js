export default {
  COORDINATE_CHANGE(state, payload) {
    state.coordinates = payload;
  },

  MAP_LOADED(state) {
    state.mapLoaded = true;
  }
};
