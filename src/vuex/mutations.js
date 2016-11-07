export default {
  COORDINATE_CHANGE(state, payload) {

    const jsonString = JSON.stringify(payload);
    const uriComponent = window.encodeURIComponent(jsonString);
    history.pushState({}, '', `#${uriComponent}`);

    state.coordinates = payload;
  },

  MAP_LOADED(state) {
    state.mapLoaded = true;
  }
};
