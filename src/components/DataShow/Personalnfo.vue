<template>
  <div class="bg-white p-3 h-full pt-8">
    <van-image
      round
      width="5rem"
      height="5rem"
      fit="cover"
      :block="false"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div class="inline-block mr-44 mt-2 float-right">
      <h1 class="text-2xl">张三同学</h1>
      <h2 class="text-blue-600">年级：大一</h2>
    </div>
    <h1 class="text-2xl font-semibold text-black mt-4">进行中</h1>
    <van-list
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in carSharing"
        :key="item.id"
        class="transition hover:bg-gray-200"
      >
        <span class="mr-6 text-sm text-black font-semibold"
          >{{ item.begintime.split(" ")[0] }}</span
        >
        <from-to :from="item.address" :to="item.destination"></from-to>
      </van-cell>
    </van-list>
    <h1 class="text-2xl font-semibold text-black mt-4">历史记录</h1>
    <van-list
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in carShared"
        :key="item.id"
        class="transition hover:bg-gray-200"
      >
        <span class="mr-6 text-sm text-black font-semibold"
          >{{ item.begintime.split(" ")[0] }}</span
        >
        <from-to :from="item.address" :to="item.destination"></from-to>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import dayjs from 'dayjs'

const carShareHistory = ref([]);
const carSharing = ref([])
const carShared = ref([])
onBeforeMount(() => {
  axios
    .get("/api/user/carshare/getbyuser", {
      headers: {
        Authorization: `Bearer ${document.cookie}`,
      },
    })
    .then((res) => {
      carShareHistory.value = res.data.data;
      console.log(carShareHistory.value);
      carSharing.value = carShareHistory.value.filter(item => dayjs(item.begintime).isAfter(dayjs(new Date())))
      carShared.value = carShareHistory.value.filter(item => dayjs(item.begintime).isBefore(dayjs(new Date())))
    });
});
</script>
