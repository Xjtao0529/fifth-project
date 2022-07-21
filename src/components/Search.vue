<template>
  <div>
    关键词 <el-input v-model="input" placeholder="Please input" />
    <el-select v-model="value" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
