<template lang="html">
  <div :class="className">
    <h1 :class="titleClassName">{{ text }}</h1>
    <img
      :class="[imageClassName, getMapLoaded ? imageLoadedClassName : '']"
      src="../assets/map.jpg"
      :alt="imageText"
      :data-map-name="getMapName"
      v-bind:data-coordinate-left="getCoordinates.left"
      :data-coordinate-top="getCoordinates.top"
      draggable="false">
  </div>
</template>



<script>
import store from '../vuex/store';
import { mapGetters } from 'vuex';

import $ from 'jquery';
import pep from 'jquery.pep';


const NO_TRANSITION_CLASS_NAME = 'no-transition';

const boundaryCalculator = function(map, viewport, title) {
  const top = viewport.height() - map.height() + title.height();
  const left = viewport.width() - map.width();

  return [top, 0, 0, left];
};

const rest = (ev, pep) => {
  store.dispatch('updateCoordinates', { pep });
};

const initiate = (ev, pep) => {
  if (!pep.$el.hasClass(NO_TRANSITION_CLASS_NAME))  pep.$el.addClass(NO_TRANSITION_CLASS_NAME);
};

const onCreate = function() {
  console.log('Dragger has been created!');
  $(document).ready(() => {
    const $title = $('.' + this.titleClassName);
    const $map = $('.' + this.imageClassName);
    const $viewport = $(window);

    $map.on('load', () => {
      const constrainTo = boundaryCalculator($map, $viewport, $title);
      $map.pep({ constrainTo: constrainTo, rest: rest, initiate })  // same as {constrainTo: constrainTo} in es5
      .css(store.state.coordinates);  // e.g. { top: 10, left 250 }

      store.dispatch('setMapLoaded');
    });
  });
};


export default {
  data: function() {
    return {
      className: 'dragger',
      titleClassName: 'dragger__title',
      imageClassName: 'dragger__image',
      imageLoadedClassName: 'dragger__image--loaded',
      text: 'Hello from Dragger.vue',
      imageText: 'map of ancient Moscow'
    }
  },
  created: onCreate,
  computed: {  //mapGetters([ 'coordinates' , 'mapName', 'mapLoaded'])
    getMapName: function() {
      // this.$store появляется после добавления store к нашему root Vue
      return this.$store.getters.mapName;
    },
    getCoordinates: function() {
      return this.$store.getters.coordinates;
    },
    getMapLoaded: function() {
      return this.$store.getters.mapLoaded;
    }
  }
};
</script>



<style lang="css">
  .dragger {
    color: indianred;
    min-height: 100%;
  }
  .dragger__image {
    cursor: move;
    opacity: 0;
    transition: opacity .4s ease-in;
    perspective: 1000px;
    backface-visibility: hidden;
  }
  .dragger__image.no-transition {
    transition: none;
  }
  .dragger__image--loaded {
    opacity: 1;
  }
</style>
