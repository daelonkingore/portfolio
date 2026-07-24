<script setup>
defineProps({
  pricing: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-container>
    <div class="pricing-section">

      <div class="pricing-header">
        {{ pricing.header }}
        <span v-if="pricing.sub" class="sub"> - {{ pricing.sub }}</span>
      </div>

      <table class="pricing-table">
        <tbody>
          <tr
            v-for="(row, i) in pricing.rows"
            :key="i"
          >
            <td>{{ row.label }}</td>
            <td>{{ row.price }}</td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="pricing.note"
        class="pricing-note"
        style="white-space: pre-line"
      >
        {{ pricing.note }}
      </div>

      <div v-if="pricing.dimensions" class="dimensions">
        <strong>{{ pricing.dimensions.title }}</strong>
        <span v-if="pricing.dimensions.sub" class="sub">
          - {{ pricing.dimensions.sub }}
        </span>

        <div
          v-for="(item, i) in pricing.dimensions.items"
          :key="i"
        >
          {{ item }}
        </div>
      </div>

      <div v-if="pricing.contact" class="contact-info" >
        <div v-if="pricing.contact.phone">
            Text:
            <b>{{ pricing.contact.phone }}</b>
        </div>

        <div v-if="pricing.contact.email">
            Email:
            <b>{{ pricing.contact.email }}</b>
        </div>
      </div>

    </div>
  </v-container>
</template>

<style scoped>


.pricing-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pricing-header {
  font-size: 18px;
  font-weight: 600;
}

.sub {
  font-weight: 400;
  opacity: 0.8;
  font-size: 14px;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}

.pricing-table td {
  padding: 12px 0;
}

.pricing-table td:last-child {
  text-align: left;
  font-weight: 600;
}

.pricing-table tr:not(:last-child) td {
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.pricing-note,
.dimensions,
.contact-info {
  line-height: 1.5;
  opacity: 0.9;
}
</style>