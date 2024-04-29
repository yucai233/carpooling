<template>
  <div class="h-full">
    <van-tabs class="w-full mt-60">
      <van-tab title="登录">
        <van-form @submit="onSubmit" class="mt-10">
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
            <van-button round block plain type="primary" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册">
        <van-form @submit="onSubmit" class="mt-10">
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
            <van-field
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button size="small" type="primary">发送验证码</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block plain type="primary" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showSuccessToast, showFailToast, Toast } from 'vant';
import 'vant/es/toast/style'
import axios from "axios";



const username = ref("");
const password = ref("");
const onSubmit = () => {
  axios.post('/api/user/login', {
    Email: username.value,
    Password: password.value
  })
    .then(res => {
      document.cookie = res.data.data
      console.log(document.cookie);
      showSuccessToast('登录成功');
      location.hash = '/car'
    })
    
}
</script>

<style scope>
.title {
  color: gray;
  font-family: Open Sans, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei,
    sans-serif;
}
</style>
