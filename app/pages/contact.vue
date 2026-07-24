<script setup>
import EmailForm from '@/components/EmailForm.vue'
import ImageWithText from '@/components/ImageWithText.vue'
import ContactSection from '~/sections/ContactSection.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay({ mobileBreakpoint: 960 })

const pageData = {
  heading: "MAIN HEADING",
  subheading: "CONTACT INFO AND MORE",
  aboutHeading: "ABOUT ME/US",

  contact: {
    intro: "Send me/us a text or email.",
    facebookLink: "https://www.facebook.com",
    phone: "(555)555-5555",
    email: "example@gmail.com",
    marketplace: {
      marketplaceLink: "https://www.facebook.com/marketplace",
      marketplaceText: "Visit My Marketplace Listings"
    },
    location: "I am based in Place, so if you live there, I'm your guy!",
    serviceAreas: "I mainly operate in places",
    youtubeLink: "https://www.youtube.com",
    callToActionText: "Check out my"
  },

  about: {
    text: "Client paragraph",
    image: new URL('@/assets/wood-slabs/bug_cube.jpg', import.meta.url).href,
    imageLeft: "right",
    variant: "card"
  },

  galleryImages: [
    new URL('@/assets/wood-slabs/bug_cube.jpg', import.meta.url).href,
    new URL('@/assets/wood-slabs/bug_cube.jpg', import.meta.url).href,
    new URL('@/assets/wood-slabs/bug_cube.jpg', import.meta.url).href,
  ]
}
</script>

<template>
  <!-- MAIN HEADER -->
  <h1 :class="mobile ? 'pt-6 main-header-small' : 'main-header'" class="header-color main-header-spacing">
    {{ pageData.heading }}
  </h1>

  <!-- EMAIL FORM -->
  <div class="email-form">
    <EmailForm />
  </div>

  <!-- CONTACT HEADER -->
  <h2 :class="mobile ? 'h2-subheading mb-9' : 'loud-header-h2 mb-10'">
    {{ pageData.subheading }}
  </h2>

  <!-- CONTACT CARD -->
  <ContactSection
    :contacts="pageData.contact"
  />

  <!-- ABOUT -->
  <h3 :class="mobile ? 'h3-subheading mb-4' : 'loud-header-h3 mb-7'">
    {{ pageData.aboutHeading }}
  </h3>

  <v-container fluid>
    <ImageWithText
        class="pt-7 img-height"
        :imageUrl="pageData.about.image"
        layout="overlay"
    >
        <div class="text-content">
        {{ pageData.about.text }}
        </div>
    </ImageWithText>
  </v-container>

  <!-- IMAGE ROW -->
  <v-row class="contacts-pics-row">
    <v-col
      v-for="(img, index) in pageData.galleryImages"
      :key="index"
      cols="12"
      md="4"
      class="d-flex justify-center"
      v-show="mobile ? index === 1 : true"
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
</template>

<style scoped>
.contacts-pics-row {
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  max-width: 90%;
  margin: 0 auto;
}
</style>