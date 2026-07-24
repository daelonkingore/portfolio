<script setup>
import { ref, watch, watchEffect, computed, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'

/* =========================================================
 * Display / Responsive
 * =======================================================*/
const { mobile, smAndDown } = useDisplay()

/* =========================================================
 * Props
 * =======================================================*/
const props = defineProps({
  foldersEndpoint: { type: String, default: '/api/cloudinary-folders' },
  imagesEndpoint: { type: String, default: '/api/cloudinary-images' },

  showSelector: { type: Boolean, default: true },
  gridCols: { type: [Number, String], default: 3 },
  mobileCols: { type: [Number, String], default: 1 },

  imageHeight: { type: String, default: '250px' },
  contain: { type: Boolean, default: true }
})

/* =========================================================
 * State
 * =======================================================*/
const selectedFolder = ref(null)

// dialog
const dialogVisible = ref(false)
const imgForDialog = ref(null)
const currentIndex = ref(0)

// pagination
const BATCH_SIZE = 12
const visibleCount = ref(BATCH_SIZE)
const loadingMore = ref(false)

// observer
const sentinel = ref(null)
let observer

/* =========================================================
 * Fetching
 * =======================================================*/
const { data: folders } = await useFetch(props.foldersEndpoint)

const { data: images, refresh } = await useFetch(
  () =>
    selectedFolder.value
      ? `${props.imagesEndpoint}?folder=${selectedFolder.value}`
      : null,
  { immediate: false }
)

/* =========================================================
 * Watchers
 * =======================================================*/
// load images when folder changes
watch(selectedFolder, () => {
  if (selectedFolder.value) {
    refresh()
    visibleCount.value = BATCH_SIZE
  }
})

// set default folder
watchEffect(() => {
  if (folders.value?.length && !selectedFolder.value) {
    selectedFolder.value = folders.value[0]
  }
})

/* =========================================================
 * Computed
 * =======================================================*/
const cols = computed(() =>
  mobile.value ? props.mobileCols : props.gridCols
)

const dialogClass = computed(() =>
  smAndDown.value ? 'dialog-small' : 'dialog-big'
)

const folderLabels = {
  'logs-to-mill': 'Logs to Mill',
  'background-imgs': 'Background Images'
}

const formattedFolders = computed(() =>
  (folders.value || []).map(folder => ({
    title: folderLabels[folder] || folder,
    value: folder
  }))
)

const visibleImages = computed(() =>
  images.value?.slice(0, visibleCount.value) || []
)

/* =========================================================
 * Image Navigation / Dialog
 * =======================================================*/
const optimizedImageMax = 1200

function showDialog(image) {
  const index = images.value.findIndex(
    img => getImageUrl(img) === getImageUrl(image)
  )

  currentIndex.value = index
  updateDialogImage()
  dialogVisible.value = true
}

function updateDialogImage() {
  const img = images.value[currentIndex.value]
  imgForDialog.value = optimize(getImageUrl(img), optimizedImageMax)
}

function nextImage() {
  if (!images.value?.length) return
  currentIndex.value = (currentIndex.value + 1) % images.value.length
  updateDialogImage()
}

function prevImage() {
  if (!images.value?.length) return
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length
  updateDialogImage()
}

function handleKeys(e) {
  if (!dialogVisible.value) return

  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'Escape') dialogVisible.value = false
}

/* =========================================================
 * Pagination (Infinite Scroll)
 * =======================================================*/
function loadMore() {
  if (!images.value || loadingMore.value) return
  if (visibleCount.value >= images.value.length) return

  loadingMore.value = true
  visibleCount.value += BATCH_SIZE

  setTimeout(() => {
    loadingMore.value = false
  }, 150)
}

/* =========================================================
 * Lifecycle
 * =======================================================*/
onMounted(() => {
  // keyboard
  window.addEventListener('keydown', handleKeys)

  // intersection observer
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) loadMore()
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0
    }
  )

  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeys)

  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
})

/* =========================================================
 * Helpers
 * =======================================================*/
function optimize(url, width = 800, quality = 'auto') {
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_${quality},w_${width}/`
  )
}

function getImageUrl(img) {
  return img?.url || img?.secure_url || img
}
</script>

<template>
  <!-- ===== Folder Selector ===== -->
  <v-select
    v-if="showSelector"
    v-model="selectedFolder"
    :items="formattedFolders"
    item-title="title"
    item-value="value"
    label="Select Gallery"
  />

  <!-- ===== Image Grid ===== -->
  <v-container fluid class="pa-0">
    <v-row density="comfortable" class="ma-0">
      <v-col
        v-for="(img, index) in visibleImages || []"
        :key="index"
        :cols="12"
        :md="12 / cols"
      >
        <v-card elevation="3" rounded="lg">
            <v-img
                class="cursor-pointer"
                :src="optimize(getImageUrl(img), 800)"
                :lazy-src="optimize(getImageUrl(img), 50, 30)"
                aspect-ratio="1"
                cover
                loading="lazy"
                @click="showDialog(getImageUrl(img), index)"
            />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    <!-- Infinite scroll sentinel -->
    <div ref="sentinel" style="height: 1px;"></div>

    <!-- optional loading indicator -->
    <div v-if="loadingMore" class="text-center py-4">
        <v-progress-circular indeterminate />
    </div>
  <v-dialog v-model="dialogVisible" :class="dialogClass">
    <div class="d-flex align-center">
        <div class="d-flex flex-column">
            <v-btn icon="mdi-chevron-left" @click.stop="prevImage" />
        </div>
        <v-img
        height="90vh"
        :src="imgForDialog"
        contain
        eager
        @click="dialogVisible = false"
        class="rounded-lg"
        />
        <div class="d-flex flex-column">
            <v-btn icon="mdi-chevron-right" @click.stop="nextImage" />
        </div>
    </div>
  </v-dialog>
</template>