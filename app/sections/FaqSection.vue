<script setup>
defineProps({
  faq: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <v-container class="p-text-size p-text-line-height">
        <span class="textbox-title">{{ faq.title }}</span>
        <hr>
        <div v-for="(faq, i) in faq.faqs" :key="i">
            <b>{{ faq.q }}</b>
                <br>
            {{ faq.a }}
                <br><br>
        </div>
    </v-container>
</template>