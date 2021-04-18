<template>
  <q-page class="flex flex-center">
    <div class='row q-col-gutter-sm q-ma-lg'>
      <div 
          v-for='(entry, index) in objects'
          :key='index'
          class='col-12 col-lg-4 col-md-4 col-sm-4'
      >
        <q-card 
            flat
            bordered
        >
          <q-card-section style='height: 415px'>
              <model-viewer
                  :src='"https://tampacz.github.io/example/assets/glb/" + entry.name + ".glb"'
                  class="fit"         
                  auto-rotate
                  camera-controls
                  interaction-policy="allow-when-focused"
              />
          </q-card-section>

          <q-separator />

          <q-card-section class='col text-center ellipsis'>
              {{ entry.name }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import '@google/model-viewer';
export default {
  computed: {
    ...mapGetters({
        'objects': 'Objects/objects'
    })
  }
}
</script>
