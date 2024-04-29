<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
  <van-button round type="primary" class="fixed right-1 bottom-1" style="position: fixed; right: 20px; bottom: 70px;"
    @click="addCarshare">
    <van-icon name="plus" />
  </van-button>
  <van-popup v-model:show="showBottom" position="bottom" closeable round :style="{ height: '50%' }">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const showBottom = ref(false)

const addCarshare = () => {
  showBottom.value = true
}
const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
}
</script>