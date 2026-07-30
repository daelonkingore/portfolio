<script setup>
    import { useDisplay } from 'vuetify';
    import HeroCarousel  from '@/components/heroCarousel.vue';
    import ImageWithText  from '@/components/imageWithText.vue';
    
    import exampleImg from '@/assets/wood-slabs/slabs_on_mill.jpg'
    
    const { mobile } = useDisplay({ mobileBreakpoint: 960 });

const pageData = {
  title: "Daelon Kingore",
  subtitle: "Secondary Title",

  sections: [
    {
      type: "imageWithText",
      text: "Example Text",
      imageUrl: "",
      layout: "right",
      variant: "card"
    },
    {
      type: "imageWithText",
      text: "Example Text",
      imageUrl: "",
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
  <h1 :class="mobile ? 'pt-6 main-header-small' : 'main-header'" class="header-color main-header-spacing mt-0 rounded rounded-box">
    {{ pageData.title }}
  </h1>

  <h2 :class="mobile ? 'h2-subheading mb-6' : 'loud-header-h2'" class="header-color">
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

    .rounded-box {
      border-radius: 12px;
      width: 70%;
      margin: 0 auto;
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