<template>
  <img :src="path" class="piece-icon" />
</template>

<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  team: String,
  alias: String,
});

const path = computed(() => {
  return `Pieces/${props.team.toLowerCase()}-${props.alias}-1.png`;
});
</script>

<style>
.piece-icon {
  margin: auto;
  max-width: 100%;
}
</style>
