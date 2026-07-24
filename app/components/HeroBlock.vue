<script setup>
defineProps({
  block: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-img
    :src="block.imageUrl"
    cover
    class="hero-img"
    eager
  >
    <!-- Optional overlay -->
    <div
      v-if="block.overlay !== false"
      class="overlay-bg"
      :style="{
        background: block.overlayColor || 'rgba(0,0,0,0.55)'
      }"
    ></div>

    <div
      class="overlay-content"
      :class="block.align || 'center'"
    >
      <div class="text-wrapper">
        
        <h1 class="hero-title">
          {{ block.title }}
        </h1>

        <p class="hero-subtitle">
          {{ block.subtitle }}
        </p>

        <v-btn
          v-if="block.button"
          :to="block.button.to"
          router
          size="x-large"
          rounded="xl"
          class="services-btn"
        >
          {{ block.button.text }}
        </v-btn>

      </div>
    </div>
  </v-img>
</template>

<style scoped>
.overlay-bg {
  position: absolute;
  inset: 0;
}

/* alignment options */
.overlay-content {
  position: absolute;
  inset: 0;
  display: flex;
  padding: 24px;
}

.overlay-content.center {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.overlay-content.left {
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}

.overlay-content.right {
  align-items: center;
  justify-content: flex-end;
  text-align: right;
}

.text-wrapper {
  max-width: 800px;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 32px;
  line-height: 1.6;
}

.services-btn {
  background-color: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(6px);
  color: white;
  font-size: 1.25rem;
}
</style>