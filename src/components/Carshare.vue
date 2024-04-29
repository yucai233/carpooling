<template>
  <van-pull-refresh v-model="topLoading" @refresh="refresh" success-duration="1000" success-text="刷新成功" :disabled="show">
    <div class="bg-white p-4">
      <h2 class="text-gray-400 font-sans mb-2">Welcome WUT</h2>

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold font-sans">Hi! 张三同学</h1>
        <span class="text-xl font-semibold font-sans" @click="monthPick"
          >{{ months[month] }} <van-icon name="sort"
        /></span>
        <van-overlay :show="show" @click="show = false" :lock-scroll="false">
          <div class="fixed right-10 top-6 w-16 h-20 bg-white rounded-md overflow-scroll">
            <van-list>
              <van-cell
                v-for="(item, idx) in months"
                :key="item"
                :title="item"
                class="transition h-1/4 text-xl font-extrabold hover:bg-gray-300"
                @click="finish(idx)"
              />
            </van-list>
          </div>
        </van-overlay>
      </div>
    </div>
    <div class="bg-white p-4 pt-0 pb-2" ref="datePicker">
      <div class="w-full inline-flex flex-nowrap overflow-scroll scroll">
        <template v-for="(d, idx) in dateStrArr">
          <date-vue
            :date="d"
            class="flex-shrink-0"
            :is-active="idx + 1 === dateToshow"
            v-if="new Date().getMonth() !== month || idx + 1 >= date"
            @click="datePick(idx)"
          ></date-vue>
        </template>
      </div>
    </div>
    <h1 class="bg-white text-2xl font-semibold pl-4">已发布</h1>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="showCardInfo(item)"
        class="transition hover:bg-gray-200"
      >
        <span class="mr-6 text-sm text-black font-semibold"
          >{{ item.begintime.split(" ")[1] }} 出发</span
        >
        <from-to :from="item.address" :to="item.destination"></from-to>
      </van-cell>
    </van-list>
    <carshare-card
      :show-center="showCenter"
      :ticket-info="showData"
      @cls="cls"
    ></carshare-card>
    <van-button
      round
      type="primary"
      class="fixed right-1 bottom-1"
      style="position: fixed; right: 20px; bottom: 70px"
      @click="addCarshare"
      to="/addcarshare"
    >
      <van-icon name="plus" />
    </van-button>
    <van-popup
      v-model:show="showBottom"
      position="bottom"
      closeable
      round
      :style="{ height: '50%' }"
    >
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </van-popup>
  </van-pull-refresh>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import CarshareCard from "./DataShow/CarshareCard.vue";
import FromTo from "./DataShow/FromTo.vue";
import DateVue from "./DataShow/Date.vue";
import axios from "axios";
import BScroll from "@better-scroll/core";

const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const showBottom = ref(false);
const showData = ref({});
const showCenter = ref(false);
const cls = () => (showCenter.value = false);
const datePicker = ref(null);

const time = new Date();
const year = ref(time.getFullYear());
const month = ref(time.getMonth());
const date = ref(time.getDate());
const dateToshow = ref(date.value);
console.log(date);
const dayCounts = new Date(year.value, month.value + 1, 0).getDate();
const dateStrArr = ref([]);

const show = ref(false);

onBeforeMount(() => {
  loading.value = true;
  axios.get("/api/carshare/getbytime").then((res) => {
    loading.value = false;
    finished.value = true;
    list.value = res.data.data;
    console.log(list.value);
  });
  for (let i = 1; i <= dayCounts; ++i) {
    dateStrArr.value.push(new Date(year.value, month.value, i).toLocaleDateString());
  }
});
onMounted(() => {
  // const scroll = new BScroll(datePicker.value, {
  //   scrollX: true
  // })
});
const addCarshare = () => {};
const onLoad = () => {};
const showCardInfo = (item) => {
  showCenter.value = true;
  showData.value = item;
};
const datePick = (id) => {
  console.log(dateStrArr.value[id]);
  dateToshow.value = id + 1;
  let [tyear, tmonth, tday] = dateStrArr.value[id].split('/')
  console.log(tyear, tmonth);
  tmonth = tmonth.length > 1? tmonth : '0' + tmonth
  tday = tmonth.length > 1? tday : '0' + tday

  axios.get('/api/carshare/getbytime', {
    params: {
      time: [tyear, tmonth, tday].join('-')
    }
  })
    .then(res => {
      console.log(res.data.data);
      list.value = res.data.data
      console.log(list.value);
    })
};
const monthPick = () => {
  show.value = true;
};
const finish = (midx) => {
  month.value = midx;
  const counts = new Date(year.value, midx + 1, 0).getDate();
  const arr = [];
  for (let i = 1; i <= counts; ++i)
    arr.push(new Date(year.value, midx, i).toLocaleDateString());
  dateStrArr.value = arr;
  list.value = []
};

const topLoading = ref(false)
const refresh = () => {
  location.reload()
}
</script>

<style scope>
.torch {
  background-color: #f7f8fa;
}
.scroll::-webkit-scrollbar {
  width: 0;
}
</style>
