<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay({ mobileBreakpoint: 960 })

const props = defineProps({
  text: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  layout: {
    type: String,
    default: 'right' // 'left', 'right', 'top', 'bottom', 'stacked', 'overlay'
  },
  variant: {
    type: String,
    default: 'card' // 'card' or 'minimal'
  },
  theme: {
    type: String,
    default: 'default'
  }
})

// computed classes (this is the CMS control layer)
const layoutClass = computed(() => {
  switch (props.layout) {
    case 'left':
      return 'layout-left'
    case 'right':
      return 'layout-right'
    case 'top':
      return 'layout-top'
    case 'bottom':
      return 'layout-bottom'
    case 'stacked':
      return 'layout-stacked'
    case 'overlay':
    case 'overlayed': // backwards compatibility
      return 'layout-overlay'
    default:
      return 'layout-right'
  }
})

const variantClass = computed(() =>
  `variant-${props.variant}`
)

const themeClass = computed(() => 
  `theme-${props.theme}`
)
</script>

<template>
  <div class="section" :class="variantClass">
    <div
      class="wrapper"
      :class="[layoutClass, { mobile }]"
    >

      <!-- TEXT -->
      <div
        class="text-box"
        :class="[
          mobile ? 'p-text-size-s' : 'p-text-size-l',
          themeClass
        ]"
>
        <slot>
          {{ text }}
        </slot>
      </div>

      <!-- IMAGE -->
      <div class="image-box">
        <v-img
          :src="imageUrl"
          cover
          eager
          class="image"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.section {
  max-width: 1600px;
  margin: 0 auto 30px auto;
}

/* TEXT SIZES */
.p-text-size-l {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: .9px;
}

.p-text-size-s {
  font-size: .9rem;
  letter-spacing: .9px;
  line-height: 1.3;
}

/* =========================
   LAYOUTS
   ========================= */

.wrapper {
  display: flex;
  align-items: stretch;
  position: relative;
}

/* LEFT / RIGHT */

.layout-right {
  flex-direction: row;
}

.layout-left {
  flex-direction: row-reverse;
}

/* TOP / BOTTOM */

.layout-top,
.layout-bottom {
  flex-direction: column;
}

.layout-bottom {
  flex-direction: column-reverse;
}

/* STACKED */

.layout-stacked {
  flex-direction: column;
  gap: 20px;
}

.layout-stacked .image-box,
.layout-stacked .text-box,
.layout-top .image-box,
.layout-top .text-box,
.layout-bottom .image-box,
.layout-bottom .text-box {
  width: 100%;
  flex: none;
}

/* OVERLAY */

.layout-overlay {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 14px;
}

.layout-overlay .image-box {
  position: relative;
  width: 100%;
}

.layout-overlay .image {
  display: block;
  width: 100%;
  height: 635px;
  object-fit: cover;
}

.layout-overlay .text-box {
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;
  background: rgba(0, 0, 0, 0.45);
  color: white;
}

/* Default sizing */

.image-box,
.text-box {
  flex: 1;
}

.image {
  width: 100%;
  height: 100%;
  max-height: 635px;
}

/* Border radius adjustments */

/* Right */
.variant-card .layout-right .image {
  border-radius: 0 14px 14px 0;
}

.variant-card .layout-right .text-box {
  border-radius: 14px 0 0 14px;
}

/* Left */
.variant-card .layout-left .image {
  border-radius: 14px 0 0 14px;
}

.variant-card .layout-left .text-box {
  border-radius: 0 14px 14px 0;
}

/* Vertical layouts */

.variant-card .layout-top .image,
.variant-card .layout-stacked .image {
  border-radius: 14px 14px 0 0;
}

.variant-card .layout-top .text-box,
.variant-card .layout-stacked .text-box {
  border-radius: 0 0 14px 14px;
}

.variant-card .layout-bottom .text-box {
  border-radius: 14px 14px 0 0;
}

.variant-card .layout-bottom .image {
  border-radius: 0 0 14px 14px;
}

/* Overlay */

.variant-card .layout-overlay .image {
  border-radius: 0px; /*14px*/
}

.variant-card .layout-overlay .text-box {
  border-radius: 0px; /*14px*/
}

/* BASE ELEMENTS */
.image-box,
.text-box {
  flex: 1;
}

.image {
  width: 100%;
  height: 100%;
  max-height: 635px;
}

/* =========================
   VARIANTS (CMS CONTROL)
   ========================= */

/* CARD */
.variant-card .image {
  border-radius: 0 14px 14px 0;
}

.variant-card .text-box {
  /* background: rgba(40, 40, 40, 0.7); */ /* TODO: add this to a theme*/
  /* color: white; */
  padding: 32px 10px;
  border-radius: 12px 0 0 12px;
}

/* MINIMAL */
.variant-minimal .text-box {
  background: transparent;
  color: inherit;
  padding: 20px;
}

.variant-minimal .image {
  border-radius: 0;
}

/* =========================
   VARIANTS (CMS CONTROL)
   ========================= */

.theme-default {
  background: rgba(40, 40, 40, 0.7);
  color: white;
}

.theme-wood-accent {
  background: rgba(104, 63, 22, 0.6);
  color: #f5f0e6;
}

.theme-dark {
  background: #1a1a1a;
  color: white;
}

.theme-light {
  background: white;
  color: black;
}

/* MOBILE */
@media (max-width: 960px) {

  .wrapper:not(.layout-overlay) {
    flex-direction: column !important;
  }

  /* Normal layouts */
  .wrapper:not(.layout-overlay) .image-box {
    width: 100%;
    height: 250px;
  }

  /* Overlay layout */
  .layout-overlay {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .layout-overlay .image-box {
    width: 100%;
    height: 350px;
  }

  .layout-overlay .image {
    width: 100%;
    height: 100%;
    max-height: none;
  }

  .layout-overlay .text-box {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;
    overflow: auto;

    border-radius: inherit;
  }
}
</style>