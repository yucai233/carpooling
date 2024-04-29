<script setup>
import { ref } from "vue";
const active = ref("主页");
const onClickLeft = () => history.back();
</script>

<template>
  <div id="hello">
    <RouterView></RouterView>
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="拼车" icon="location-o" to="/car">拼车</van-tabbar-item>
      <van-tabbar-item name="个人" icon="user-o" to="/self">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
