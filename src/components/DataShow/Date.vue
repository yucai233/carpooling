<template>
  <div class="w-10 inline-block mr-2">
    <span class="text-blue-500 ml-1">{{ week }}</span>
    <span class="w-full h-10 font-semibold rounded-md text-center pt-2 inline-block" :class="{active: props.isActive && isCurrentMonth}">{{ date }}</span>
  </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount, watch } from 'vue'
const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const props = defineProps({
  date: String,
  isActive: Boolean
})
watch(() => props.date, val => {
  time = new Date(val)
  month = time.getMonth()
  week = map[time.getDay()]
  date = time.getDate()
})
watch(() => props.isActive, val => {
  isCurrentMonth.value = true
})
let time = new Date(props.date)
let month = time.getMonth()
let week = map[time.getDay()]
let date = time.getDate()
let isCurrentMonth = ref(new Date().getMonth() === month)
</script>

<style scope>
.active {
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
  color: white;
}
</style>