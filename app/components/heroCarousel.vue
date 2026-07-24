<script setup>
import ButtonWithImgOverlay from "@/components/HeroBlock.vue"

defineProps({
  block: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-carousel
    :height="block.height || '70vh'"
    :interval="block.interval || 8000"
    :cycle="block.cycle ?? true"
    :show-arrows="block.showArrows || 'hover'"
    :hide-delimiter-background="block.hideDelimiters ?? true"
  >
    <v-carousel-item
      v-for="(slide, index) in block.slides"
      :key="index"
    >
      <ButtonWithImgOverlay :block="slide" />
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
:deep(.v-carousel) {
  width: 100vw;
}

.v-carousel {
  box-shadow: 0 4px 6px rgba(0, 0, 0, .2);
}
</style>