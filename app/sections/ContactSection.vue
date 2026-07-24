<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay({ mobileBreakpoint: 960 })

defineProps({
  contacts: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-container class="pa-0">
    <v-card
      :class="mobile ? 'p-text-size-sm' : 'p-text-size-md'"
      class="mx-auto pa-6 p-container p-text mt-0"
      width="100%"
      rounded="xl"
      elevation="4"
    >
      <p>
        {{ contacts.intro }}
        <a :href="contacts.facebookLink" target="_blank">
          <b>Facebook</b>
        </a>
      </p>

      <p class="bordered-text">
        <span v-if="contacts.phone">Text: <b>{{ contacts.phone }}</b></span><br>
        <span v-if="contacts.email">Email: <b>{{ contacts.email }}</b></span><br>
        <a v-if="contacts.marketplace" :href="contacts.marketplace.marketplaceLink" target="_blank">
          <b>{{ contacts.marketplace.marketplaceText }}</b>
        </a>
      </p>

      <p v-if="contacts.location">
        {{ contacts.location }}
      </p>
      <p v-if="contacts.serviceAreas">
        {{ contacts.serviceAreas }}.
      </p>

      <p v-if="contacts.youtubeLink || contacts.facebookLink">
        <br>
        {{ contacts.callToActionText }}

        <template v-if="contacts.youtubeLink">
            <a :href="contacts.youtubeLink" target="_blank">
            <b>YouTube</b>
            </a>
        </template>

        <template v-if="contacts.youtubeLink && contacts.facebookLink">
            and
        </template>

        <template v-if="contacts.facebookLink">
            <a :href="contacts.facebookLink" target="_blank">
            <b>Facebook</b>
            </a>
        </template>
      </p>
    </v-card>
  </v-container>
</template>

<style scoped>
.bordered-text {
  border: rgb(187, 187, 187) solid 2px;
  border-radius: 15px;
  display: inline-block;
  padding: 15px;
  margin: 10px;
  line-height: 28px;
}
</style>