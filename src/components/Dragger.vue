<template lang="html">
  <div :class="className">
    <h1 :class="titleClassName">{{ text }}</h1>
    <img
      :class="imageClassName"
      src="../assets/map.jpg"
      :alt="imageText"
      draggable="false">
  </div>
</template>



<script>
import $ from 'jquery';
import pep from 'jquery.pep';

var boundaryCalculator = function(map, viewport, title) {
  const top = viewport.height() - map.height() + title.height();
  const left = viewport.width() - map.width();

  return [top, 0, 0, left];
};

var onCreate = function() {
  console.log('Dragger has been created!');
  $(document).ready(() => {
    const $title = $('.' + this.titleClassName);
    const $map = $('.' + this.imageClassName);
    const $viewport = $(window);

    $map.on('load', () => {
      const constrainTo = boundaryCalculator($map, $viewport, $title);
      $map.pep({constrainTo}); // same as {constrainTo: constrainTo} in es5
    })
  });
};


export default {
  data: function() {
    return {
      className: 'dragger',
      titleClassName: 'dragger__title',
      imageClassName: 'dragger__image',
      text: 'Hello from Dragger.vue',
      imageText: 'map of ancient Moscow'
    }
  },
  created: onCreate
}
</script>



<style lang="css">
  .dragger {
    color: indianred;
    min-height: 100%;
  }
</style>
