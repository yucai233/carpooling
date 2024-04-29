<template>
  <van-nav-bar
    title=""
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  />

  <van-form @submit="onSubmit" class="pt-4">
    <h1 class="text-xl text-gray-500 ml-4 b-4 mb-4">添加拼车信息</h1>
    <van-cell-group inset>
      <van-field
        v-model="address"
        name="地址"
        label="地址"
        placeholder="请输入地址"
        :rules="[{ required: true, message: '请填写地址' }]"
      />
      <van-field
        v-model="destination"
        name="目的地"
        label="目的地"
        placeholder="请输入目的地"
        :rules="[{ required: true, message: '请填写目的地' }]"
      />
      
      <van-cell title="最大人数">
        <van-stepper v-model="maxNum" />
      </van-cell>
      <van-cell title="行李箱个数">
        <van-stepper v-model="boxNum" />
      </van-cell>
      <van-cell title="行李包个数">
        <van-stepper v-model="bagNum" />
      </van-cell>
      <van-field
        v-model="contactWay"
        name="联系方式"
        label="联系方式"
        placeholder="请输入联系方式"
      />
      <van-field
        v-model="contactPerson"
        name="联系人"
        label="联系人"
        placeholder="请输入联系人"
      />
      <van-cell title="时间" is-link @click="pickTime" :value="dateAtime" />
    </van-cell-group>
    <van-popup
      v-model:show="showBottom"
      round
      closeable
      close-icon=""
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker-group
        title="预约日期"
        :tabs="['选择日期', '选择时间']"
        next-step-text="下一步"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="date" />
        <van-time-picker v-model="time" />
      </van-picker-group>
    </van-popup>

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { showToast, Toast } from 'vant'
import "vant/es/toast/style"

const address = ref("");
const destination = ref("");
const maxNum = ref(4);
const boxNum = ref(1);
const bagNum = ref(1);
const contactWay = ref("");
const contactPerson = ref("")
const date = ref(["", "", ""]);
const time = ref(["", ""]);
const dateAtime = computed(
  () =>
    date.value.reduce((a, b) => a + "-" + b) +
    " " +
    time.value.reduce((a, b) => a + ":" + b)
);
const showBottom = ref(false);

const pickTime = () => {
  showBottom.value = true;
};
const onCancel = () => (showBottom.value = false);
const onConfirm = () => {
  showBottom.value = false;

};
const onClickLeft = () => location.hash = '/car'
const onSubmit = () => {
    axios.post("/api/user/carshare/add", {
    "Destination": destination.value,
    "Address": address.value,
    "Begintime": dateAtime.value,
    "Maxnum": maxNum.value,
    "Num": 0,
    "Contact": contactWay.value,
    "Box": boxNum.value,
    "Bag": bagNum.value,
    "Username": contactPerson.value
  }, {
    headers: { Authorization: `Bearer ${document.cookie}` }
  })
    .then(res => {
      console.log(res.data);
      showToast('发布成功！')
      location.hash = '/car'
    })
    .catch(err => {
      showToast('提交失败！');
    })
}
</script>

<style>
/* .particulars-detail-popup {
  background: rgba(0, 0, 0, 0.7) !important;
} */
</style>
