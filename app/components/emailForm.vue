<script setup>
import { ref } from 'vue'

const formRef = ref(null)

const emailRules = [
  v => !!v || 'Email is required',
  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Must be a valid email'
]

const messageRules = [
  v => !!v || 'Message is required',
  v => v.length >= 10 || 'Message must be at least 10 characters',
  v => v.length < 1000 || 'Message must be less than 1000 characters'
]

const form = ref({
  email: '',
  message: '',
  'bot-field': ''
})

const loading = ref(false)
const status = ref(null) // null | success | error

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const clearStatusAfterDelay = () => {
  setTimeout(() => {
    status.value = null
  }, 6000) // 6 seconds
}

const submittedAt = ref(Date.now())

const submitForm = async () => {
  if (Date.now() - submittedAt.value < 4000) {  // if submit in under 4 sec
    return // likely bot (submitted too fast)
  }

  if (form.value['bot-field']) return

  const { valid } = await formRef.value.validate()

  if (!valid) return

  loading.value = true
  status.value = null

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...form.value
      })
    })

    if (!response.ok) throw new Error("Network response was not ok")

    status.value = "success"
    form.value.email = ''
    form.value.message = ''
    form.value['bot-field'] = ''
    formRef.value.resetValidation()
  } catch (error) {
    console.error(error)
    status.value = "error"
  } finally {
    loading.value = false
    clearStatusAfterDelay()
  }
}

</script>

<template>
  <v-container class="py-10 px-0">
    <v-card class="email-form mx-auto pa-6">
      <v-card-title>Contact Me</v-card-title>
      <v-card-text>
        Use this to easily send me an email to set a milling appointment, ask a question, or to visit my location and see what I have to offer!
      </v-card-text>
      <v-form
        ref="formRef"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        @submit.prevent="submitForm"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p style="display:none;">
          <label>
            Don't fill this out if you're human:
            <input v-model="form['bot-field']" name="bot-field" />
          </label>
        </p>

        <v-text-field
          v-model="form.email"
          name="email"
          label="Your Email Address"
          type="email"
          :rules="emailRules"
          required
        />

        <v-textarea
          v-model="form.message"
          name="message"
          label="Your Message"
          rows="7"
          :rules="messageRules"
          required
        />

        <v-btn class="submit-button"
          type="submit"
          :loading="loading"
        >
          Send Message
        </v-btn>

        <!-- Success / Error Messages -->
        <v-fade-transition>
          <v-alert
            v-if="status === 'success'"
            type="success"
            class="mt-4"
            density="comfortable"
          >
            Message sent successfully!
          </v-alert>
        </v-fade-transition>

        <v-fade-transition>
          <v-alert
            v-if="status === 'error'"
            type="error"
            class="mt-4"
            density="comfortable"
          >
            Message failed. Please try again.
          </v-alert>
        </v-fade-transition>

      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
    .email-form {
        width: 100%;
        background-color: rgba(26, 17, 8, 0.6);
    }

    .submit-button {
        background-color: #294e2e;
    }
</style>