<template>
  <van-popup
    v-model:show="props.showCenter"
    round
    :style="{ height: '55%', width: '80%' }"
    @click-overlay="cls"
  >
    <div class="h-1/6 w-full bg-blue-500 text-white p-4 mb-4">
      <h3>{{ new Date(props.ticketInfo.begintime.split(' ')[0]).getFullYear() }}年</h3>
      <div class="flex justify-between font-semibold">
        <span>{{ new Date(props.ticketInfo.begintime.split(' ')[0]).getMonth() + 1 }} 月 {{ new Date(props.ticketInfo.begintime.split(' ')[0]).getDate() }} 日</span> 
        <span>{{ map[new Date(props.ticketInfo.begintime.split(' ')[0]).getDay()] }}</span>
      </div>
    </div>
    <div class="flex justify-between items-center px-16">
      <span class="text-black font-semibold">{{ props.ticketInfo.address }}</span>
      <van-icon name="play-circle" />
      <span class="text-black font-semibold">{{ props.ticketInfo.destination }}</span>
    </div>
    <div class="text-black px-10 py-4">
      <div class="pb-2">
        <p class="text-gray-500">出发时间</p>
        <p class="font-semibold text-xl">{{ props.ticketInfo.begintime.split(' ')[1] }}</p>
      </div>
      <div class="pb-2">
        <p class="text-gray-500">人数情况</p>
        <p class="font-semibold text-xl">{{ props.ticketInfo.num }}/{{ props.ticketInfo.maxnum }}</p>
      </div>
      <div class="pb-2">
        <p class="text-gray-500">联系人</p>
        <p class="font-semibold text-xl">{{ props.ticketInfo.username }}</p>
      </div>
      <div class="pb-2">
        <p class="text-gray-500">联系方式</p>
        <p class="font-semibold text-xl">{{ props.ticketInfo.contact }}</p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <van-button round type="primary" class="w-1/2">加入拼车 <van-icon name="friends-o" @click="joinCarshare"/></van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from "vue";
const props = defineProps({
  showCenter: Boolean,
  ticketInfo: Object
});
const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const emit = defineEmits(["cls"]);
const cls = () => emit('cls')
onBeforeMount(() => {

})
const joinCarshare = () => {
  
}
</script>
