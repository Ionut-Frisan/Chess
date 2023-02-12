<template>
  <div :class="['game-menu', {'minimized': isGamePlaying}]">
    <div class="game-menu-content">
      <div class="button play-button" @click="toggleGameState">
        <font-awesome-icon :icon="playButtonIcon"></font-awesome-icon>
        <span>{{playButtonText}}</span>
      </div>
      <div class="volume"
           @mouseenter="isVolumeSelectorOpen = true"
           @mouseleave="isVolumeSelectorOpen = false"
      >
        <span>
          <font-awesome-icon
              :icon="volumeIcon"
              @click="soundManager.toggleSound()"
          ></font-awesome-icon>
        </span>
        <volume-selector v-if="isVolumeSelectorOpen"
                         v-model="volume">
        </volume-selector>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useMainStore} from "../store/main";
import {useSoundManager} from "../composables/soundManager.js";
import {storeToRefs} from "pinia";
import VolumeSelector from "./VolumeSlider.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeHigh, faVolumeLow, faVolumeMute, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

library.add(faVolumeHigh, faVolumeLow, faVolumeMute, faPlay, faPause);

const store = useMainStore();
const soundManager = useSoundManager();
const {isGamePlaying, gameState} = storeToRefs(store);
const {volume, enabled} = soundManager;
const {startGame, pauseGame} = store;

const toggleGameState = () => {
  if(isGamePlaying.value) {
    pauseGame();
    return;
  }
  startGame();
}

const isVolumeSelectorOpen = ref(false);

const playButtonIcon = computed(() => {
  return isGamePlaying.value ? 'fa-pause' : 'fa-play';
})

const playButtonText = computed(() => {
  if(gameState.value === 'paused') return 'Continue';
  return isGamePlaying.value ? '' : 'Play';
})

const volumeIcon = computed(() => {
  if (volume.value === 0 || !enabled.value) return 'fa-volume-mute';
  if (volume.value < 0.6) return 'fa-volume-low';
  return 'fa-volume-high';
});

</script>

<style scoped>

</style>