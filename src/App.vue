<script setup>
import { ref } from 'vue'
const active = ref('主页')
const onClickLeft = () => history.back()
</script>

<template>

  <RouterView></RouterView>

</template>

<style scoped>

</style>
