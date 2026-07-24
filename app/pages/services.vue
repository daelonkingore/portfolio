<script setup>
import ImageWithText from '@/components/ImageWithText.vue'
import { useDisplay } from 'vuetify'
import PricingSection from '@/sections/PricingSection.vue'
import FaqSection from '@/sections/FaqSection.vue'
import Accordion from '~/components/Accordion.vue'
import EmbededVideo from '~/components/EmbedVideo.vue'

const { mobile } = useDisplay({ mobileBreakpoint: 960 })

const pageData = {
  heading: "MAIN HEADING",

  topImages: [
    new URL('@/assets/working/milling1.jpg', import.meta.url).href,
    new URL('@/assets/working/milling1.jpg', import.meta.url).href,
    new URL('@/assets/working/milling1.jpg', import.meta.url).href,
  ],

  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum augue neque, rutrum in luctus nec, consequat sit amet nisi. Duis vel odio eget nibh viverra commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean porttitor, metus nec mollis varius, lectus tellus viverra enim, quis posuere enim ipsum molestie urna. Proin malesuada turpis ante, at fringilla magna iaculis at. In dignissim congue diam nec tempor. Vestibulum tincidunt quam justo, quis volutpat enim elementum ac.",

  servicesHeading: "SERVICES",

  pricing: {
    image: new URL('@/assets/working/milling1.jpg', import.meta.url).href,
    layout: "right",

    pricing: {
      header: "Example Pricing",
      sub: "Based on log width",

      rows: [
        { label: '25" or less', price: '$75' },
        { label: '25" - 45"', price: '$100' },
        { label: '45" or more', price: '$125' }
      ],

      note: "2 hour minimum.\n$30 stationary saw blade replacement\n$100 blade replacement (chainsaw)",

      dimensions: {
        title: "Example Dimensions",
        sub: "Max log width",
        items: [
          'Stationary mill: up to 36" wide', 
          'Portable saws: up to 51" wide'
        ]
      },

      contact: {
        phone: "(555)555-5555",
        email: "example@gmail.com"
      }
    }
  },

  faq: {
    image: new URL('@/assets/working/milling1.jpg', import.meta.url).href,
    layout: "left",

    faqSetion: {
      title: "Frequently Asked Questions",
        image: new URL('@/assets/working/milling1.jpg', import.meta.url).href,
        faqs: [
          {
            q: "Lorem ipsum dolor sit amet, consectetur adipiscing el?",
            a: "Donec auctor, dolor id laoreet molestie, risus ligula vestibulum nisl, nec tincidunt mauris orci in erat. Curabitur vel orci venenatis, bibendum libero et, pharetra metus. "
          },
          {
            q: "Vestibulum bibendum nibh non elit consequat, cursus lobortis nibh dapibus.?",
            a: "Praesent blandit quam a ipsum faucibus semper. Donec luctus nisi id finibus pharetra. Suspendisse diam sem."
          }
      ]
    }
  },

  travelLimits: 
    {
      title: "Travel Limits/Additional Info",
      image: new URL('@/assets/working/milling1.jpg', import.meta.url).href,
      layout: "right",
      content: "Example text."
    }
  }
</script>

<template>
  <!-- HEADER -->
  <h1 :class="mobile ? 'pt-6 main-header-small' : 'main-header'" class="header-color main-header-spacing mb-8">
    {{ pageData.heading }}
  </h1>

  <v-container width="50%">
    <Accordion 
      title="Test",
      text="Test text"
    />
  </v-container>

  <EmbededVideo 
    url="https://www.youtube.com/embed/dQw4w9WgXcQ"
  />

  <!-- TOP IMAGES -->
  <v-row class="services-pics-row">
    <v-col
      v-for="(img, i) in pageData.topImages"
      :key="i"
      cols="12"
      md="4"
      class="d-flex justify-center"
      v-show="mobile ? i === 1 : true"
    >
      <v-img
        cover
        rounded
        class="working-img"
        :src="img"
        eager
      />
    </v-col>
  </v-row>

  <!-- SUMMARY -->
  <div class="p-container">
    <p :class="mobile ? 'p-text-size-sm' : 'p-text-size-lg'" class="p-text">
      {{ pageData.summary }}
    </p>
  </div>

  <!-- SERVICES HEADER -->
  <h2 :class="mobile ? 'h2-subheading mb-4' : 'loud-header-h2 mb-7'">
    {{ pageData.servicesHeading }}
  </h2>

  <!-- DYNAMIC SECTIONS -->
  <v-container :class="mobile ? 'v-text-small' : 'easy-to-see'">

    <ImageWithText :imageUrl="pageData.pricing.image">
      <PricingSection
        :pricing="pageData.pricing.pricing"
      />
    </ImageWithText>

    <ImageWithText 
      :imageUrl="pageData.faq.image"
      :layout="pageData.faq.layout"
    >
      <FaqSection 
        :faq="pageData.faq.faqSetion"
      />
    </ImageWithText>

    <ImageWithText
      :imageUrl="pageData.travelLimits.image"
      :layout="pageData.travelLimits.layout"
    >
      <span class="textbox-title">{{ pageData.travelLimits.title }}</span>
      <hr>
        <v-container class="p-text-size p-text-line-height">
          {{ pageData.travelLimits.content }}
        </v-container>
    </ImageWithText>

  </v-container>
</template>

<style scoped>

.p-text {
    max-width: 1000px;
}

.pricing-border {
    border: black 1px solid;
}

.services-img {
  border-radius: 15px;
  overflow: hidden;
  max-width: 600px;
}

.v-container {
    max-width: 1400px;
}

.services-pics-row {
    padding-right: 20px;
    padding-left: 20px;
}

.working-img {
    max-height: 400px;
}
</style>