<template>
  <div class="text-black justify-between items-center px-4 w-2/3 h-12 bg-gray-300 rounded-md shadow-2xl inline-flex">
    <span class="text-black font-semibold">{{ props.from }}</span>
    <van-icon name="play-circle" />
    <span class="text-black font-semibold">{{ props.to }}</span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  from: String,
  to: String
})
</script>
