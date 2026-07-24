<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  maxWidth: {
    type: String,
    default: "800px"
  },
  aspectRatio: {
    type: [String, Number],
    default: 16/9
  }
})
</script>

<template>
  <v-container>
    <v-card class="mx-auto" :max-width="maxWidth">
      <!-- v-responsive with a 16:9 aspect ratio -->
      <v-responsive :aspect-ratio="aspectRatio">
        <iframe
          :src="url"
          width="100%"
          height="100%"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-responsive>
    </v-card>
  </v-container>
</template>