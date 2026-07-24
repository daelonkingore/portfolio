<template width="100%">
  <v-app width="100%">
    <Navigation />

    <!-- Main content of the application -->
    <v-main id="background">
      <NuxtPage />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
  import Navigation from './components/navigation.vue'
  import Footer from './components/footer.vue'
</script>
