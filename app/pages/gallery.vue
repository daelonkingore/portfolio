<script setup>
import Gallery from '@/components/GalleryGrid.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay({ mobileBreakpoint: 960 })

const page = {
  title: 'MAIN HEADING',

  description: `
    Below are the examples of the kind of wood I have to offer.
    Visit My Marketplace Listings for the most updated stock.
    Contact me/us for more information.
  `,

  marketplaceUrl: 'https://www.facebook.com/marketplace',
  contactUrl: '/contact',

  gallery: {
    gridCols: 4,
    mobileCols: 2,
    imageHeight: '300px',
    contain: false
  }
}
</script>

<template>
  <!-- ===== Heading ===== -->
  <h1
    :class="mobile ? 'pt-6 main-header-small' : 'main-header'"
    class="header-color main-header-spacing"
  >
    {{ page.title }}
  </h1>

  <!-- ===== Description Block ===== -->
  <v-container>
    <v-card flat color="transparent">
      <v-card-text
        class="p-container p-text"
        :class="mobile ? 'p-text-size-sm' : 'p-text-size-lg'"
      >
        <p>
          Below are the examples of the kind of wood I have to offer.
        </p>

        <p>
          <a
            :href="page.marketplaceUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Visit My Marketplace Listings</b>
          </a>
          for the most updated stock.
        </p>

        <p>
          <router-link :to="page.contactUrl">
            Contact me/us
          </router-link>
          for more information.
        </p>
      </v-card-text>
    </v-card>
  </v-container>

  <!-- ===== Gallery ===== -->
  <Gallery
    :grid-cols="page.gallery.gridCols"
    :mobile-cols="page.gallery.mobileCols"
    :image-height="page.gallery.imageHeight"
    :contain="page.gallery.contain"
  />
</template>