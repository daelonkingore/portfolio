<script setup>
import EmailForm from '@/components/emailForm.vue'
import ImageWithText from '@/components/imageWithText.vue'
import ContactSection from '~/sections/ContactSection.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay({ mobileBreakpoint: 960 })

const pageData = {
  heading: "Skills and Experience",
  subheading: "Contact Info",
  aboutHeading: "About Me",

  contact: {
    intro: "Send me an email if you want a personalized website, and to see what I'm up to, check out my",
    githubLink: "https://github.com/daelonkingore",
    email: "daelonkingore@gmail.com"
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

  <!-- ABOUT -->
  <h3 :class="mobile ? 'h3-subheading mb-4' : 'loud-header-h3 mb-7'" class="header-color">
    {{ pageData.aboutHeading }}
  </h3>

  <v-container fluid>
    <ImageWithText
        class="pt-7 img-height"
        imageUrl=""
        layout="overlay"
    >
        <div class="text-content">
        {{ pageData.about.text }}
        </div>
    </ImageWithText>
  </v-container>

  <!-- CONTACT CARD -->
  <ContactSection
    :contacts="pageData.contact"
  />

  <!-- CONTACT HEADER -->
  <h2 :class="mobile ? 'h2-subheading mb-9' : 'loud-header-h2 mb-10'" class="header-color">
    {{ pageData.subheading }}
  </h2>

  <!-- EMAIL FORM -->
  <div class="email-form">
    <EmailForm />
  </div>
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