<template>
  <div class="image-selector">
    <div v-for="alias in aliases" class="image-option">
      <piece
        :alias="alias"
        :team="props.team"
        @click="emits('update:modelValue', alias)"
      ></piece>
    </div>
  </div>
</template>

<script setup>
import Piece from "./Piece.vue";
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  team: String,
});

const aliases = ["queen", "knight", "bishop", "rook"];

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss">
.image-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: absolute;
  z-index: 999;
  height: 20%;
  width: 50%;
  right: 25%;
  top: 40%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.image-option {
  border: 1px solid #009970;
  border-radius: 5%;
  background-color: #d9dedd;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
</style>
