<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Objects browser
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Github',
    caption: 'Open source',
    icon: 'code',
    link: 'https://github.com/Tampacz/v-props-to-models-view-3d'
  },
  {
    title: 'RAGE Multiplayer Discord',
    caption: 'Join the best discord',
    icon: 'chat',
    link: 'https://discord.gg/tChBaeu'
  },
  {
    title: 'GTA WORLD Discord',
    caption: 'Join the best text-based roleplay',
    icon: 'chat',
    link: 'https://discord.gg/bJGJEA9'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
