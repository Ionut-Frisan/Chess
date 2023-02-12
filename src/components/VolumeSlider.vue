<template>
  <div class="volume-selector">
    <span @click="emitUpdateEvent(0.2)" :class="{'plain': modelValue < 0.2}"></span>
    <span @click="emitUpdateEvent(0.4)" :class="[{'plain': modelValue < 0.4}]"></span>
    <span @click="emitUpdateEvent(0.6)" :class="[{'plain': modelValue < 0.6}]"></span>
    <span @click="emitUpdateEvent(0.8)" :class="[{'plain': modelValue < 0.8}]"></span>
    <span @click="emitUpdateEvent(1)" :class="{'plain': modelValue < 1}"></span>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue']);
const emitUpdateEvent = (value) => {
  emits('update:modelValue', value);
}
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  }
})

</script>

<style lang="scss">
.volume-selector {
  display: flex;
  align-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  & > .plain {
    background-color: #d9dedd;
  }

  & :hover {
    cursor: pointer;
  }

  & > * {
    background-color: #009970;
    width: 20%;
    margin: 0 2%;
  }

  & :nth-child(1) {
    height: 20%;
  }

  & :nth-child(2) {
    height: 40%;
  }

  & :nth-child(3) {
    height: 60%;
  }

  & :nth-child(4) {
    height: 80%;
  }

  & :nth-child(5) {
    height: 100%;
  }
}
</style>