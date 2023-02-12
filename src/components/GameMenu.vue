<template>
  <div class="game-menu">
    asdadasdas
    <div class="volume">
      <font-awesome-icon icon="fa-volume-off"></font-awesome-icon>
      <volume-selector v-model="volume"></volume-selector>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useMainStore} from "../store/main";
import VolumeSelector from "./VolumeSlider.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

library.add(faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeMute);

const store = useMainStore();
const volume = ref(1);
</script>

<style scoped>

</style>