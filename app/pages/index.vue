<script setup>
    import { useDisplay } from 'vuetify';
    import HeroCarousel  from '@/components/HeroCarousel.vue';
    import ImageWithText  from '@/components/ImageWithText.vue';
    
    import exampleImg from '@/assets/wood-slabs/slabs_on_mill.jpg'
    
    const { mobile } = useDisplay({ mobileBreakpoint: 960 });

const heroBlock = {
  type: "carousel",

  height: "70vh",
  interval: 8000,

  slides: [
    {
      type: "hero",
      imageUrl: exampleImg,
      title: "Custom Milling Done Right",
      subtitle: "We turn raw logs into beautiful lumber",
      button: {
        text: "View Services",
        to: "/services"
      }
    },
    {
      type: "hero",
      imageUrl: exampleImg,
      title: "Contact Me",
      subtitle: "Reach out for quotes and info",
      button: {
        text: "Contact",
        to: "/contact"
      }
    }
  ]
}


const pageData = {
  title: "TITLE",
  subtitle: "Secondary Title",

  sections: [
    {
      type: "imageWithText",
      text: "Example Text",
      imageUrl: exampleImg,
      layout: "right",
      variant: "card"
    },
    {
      type: "imageWithText",
      text: "Example Text",
      imageUrl: exampleImg,
      layout: "left",
      variant: "minimal"
    }
  ]
}


const resolveComponent = (type) => {
  const map = {
    imageWithText: ImageWithText,
    carousel: HeroCarousel,
  }
  return map[type]
}
</script>

<template>
  <h1 :class="mobile ? 'pt-6 main-header-small' : 'main-header'" class="header-color main-header-spacing mt-0">
    {{ pageData.title }}
  </h1>

  <component
    :is="resolveComponent(heroBlock.type)"
    :block="heroBlock"
  />

  <h2 :class="mobile ? 'h2-subheading mb-6' : 'loud-header-h2'">
    {{ pageData.subtitle }}
  </h2>

  <v-container fluid class="mt-4 mb-4">
    <component
      v-for="(section, index) in pageData.sections"
      :key="index"
      :is="resolveComponent(section.type)"
      v-bind="section"
    />
  </v-container>
</template>

<style scoped>
    .header-color {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        margin-bottom: 0px;
    }

    .v-container {
        margin-bottom: 5px;
        padding-top: 0px;
    }

    /* MOBILE */
    @media (max-width: 960px) {
        .main-header-small {
            letter-spacing: 3px;
            font-size: 1.5rem;
            font-weight: 600;
        }
    }
</style>