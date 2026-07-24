<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },

  titleSize: {
    type: Number,
    default: 16
  },

  textSize: {
    type: Number,
    default: 14
  },

  textColor: {
    type: String,
    default: '#f5f5f5'
  },

  accordionColor: {
    type: String,
    default: '#2b2b2b'
  },

  contentColor: {
    type: String,
    default: '#3b3b3b'
  },
})

const styles = computed(() => ({
  '--accordion-text': props.textColor,
  '--accordion-header': props.accordionColor,
  '--accordion-content': props.contentColor,
  '--accordion-title-size': `${props.titleSize}px`,
  '--accordion-content-size': `${props.contentSize}px`
}))
</script>

<template>
    <v-expansion-panels :style="styles">
        <v-expansion-panel
            :title="title"
            :text="text"
        >
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<style scoped>
.v-expansion-panel {
  color: var(--accordion-text);
}

:deep(.v-expansion-panel-title) {
  background: var(--accordion-header);
  color: var(--accordion-text);
  font-size: var(--accordion-title-size);
  font-weight: 600;
}

:deep(.v-expansion-panel-text__wrapper) {
  background: var(--accordion-content);
  color: var(--accordion-text);
  font-size: var(--accordion-content-size);
  line-height: 1.6;
}
</style>