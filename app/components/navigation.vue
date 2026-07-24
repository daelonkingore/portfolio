<script setup>
// logo
import logo from '@/assets/logo.png'

import { ref, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay({ mobileBreakpoint: 900 })

const drawer = ref(false)
const group = ref(null)
const tab = ref(null)

watch(group, () => {
  drawer.value = false
})

const pageConfig = {
  appBar: {
    color: '#407348',
    height: {
      mobile: 44,
      desktop: 68
    },
    logo: {
      src: logo,
      mobileWidth: 53,
      desktopWidth: 85,
      link: '/'
    }
  },
  navigation: {
    home: {
      title: 'Example Title',
      link: '/'
    },
    items: [
      { title: 'Services', link: '/services' },
      { title: 'Gallery', link: '/gallery' },
      { title: 'Contact Me', link: '/contact' }
    ]
  },
  behavior: {
    mobileBreakpoint: 900,
    drawerLocation: 'top'
  }
}

const appBarHeight = computed(() =>
  mobile.value ? pageConfig.appBar.height.mobile : pageConfig.appBar.height.desktop
)
</script>

<template>
  <v-app-bar
    :color="pageConfig.appBar.color"
    :height="appBarHeight"
  >
    <!-- MOBILE -->
    <template v-if="mobile">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      />

      <v-app-bar-title>
        <v-img
          :max-width="pageConfig.appBar.logo.mobileWidth"
          :src="pageConfig.appBar.logo.src"
          contain
        />
      </v-app-bar-title>
    </template>

    <!-- DESKTOP -->
    <v-tabs v-else v-model="tab">
      <!-- Logo tab -->
      <v-tab :to="pageConfig.appBar.logo.link">
        <v-img
          :src="pageConfig.appBar.logo.src"
          :width="pageConfig.appBar.logo.desktopWidth"
        />
      </v-tab>

      <!-- Nav items -->
      <v-tab
        v-for="(item, i) in pageConfig.navigation.items"
        :key="i"
        :to="item.link"
        :title="item.title"
        class="default-nav-text"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </v-app-bar>

  <!-- MOBILE DRAWER -->
  <v-navigation-drawer
    v-if="mobile"
    v-model="drawer"
    :location="pageConfig.behavior.drawerLocation"
    temporary
  >
    <v-list>
      <v-list-item
        :title="pageConfig.navigation.home.title"
        :to="pageConfig.navigation.home.link"
        link
      />

      <v-list-item
        v-for="(item, i) in pageConfig.navigation.items"
        :key="i"
        :to="item.link"
        :title="item.title"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.default-nav-text {
  text-transform: uppercase;
  letter-spacing: 2.5px;
  text-indent: 5px;
  font-weight: 500;
  font-size: 17px;
}
</style>