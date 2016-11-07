export const updateCoordinates = (context, payload) => {
  const pep = payload.pep;
  const top = parseInt(pep.$el.css('top')) + pep.cssY;
  const left = parseInt(pep.$el.css('left')) + pep.cssX;

  context.commit('COORDINATE_CHANGE', {top, left});
};

export const setMapLoaded = ({commit}) => {
  commit('MAP_LOADED');
};
