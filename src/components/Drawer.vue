<template>
  <div>
    <el-drawer
      v-model="drawer"
      :z-index="99"
      title="I am the title"
      :with-header="true"
    >
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const drawer = reactive(false)
</script>

<style lang="scss" scoped></style>
