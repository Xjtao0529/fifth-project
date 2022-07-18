<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <Aside />
      </el-aside>
      <el-main>
        <TagsView></TagsView>
        <Main style="margin-top: 30px" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './Header'
import Aside from './Aside'
import Main from './Main'
import TagsView from '../components/TagsView.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-header {
    background: #4338ca;
    height: 64px;
  }

  & > .el-container {
    .el-aside {
      transition: all 0.4s;
      background: #fdfdfd;
    }

    .el-main {
      background: #f3f4f6;
    }
  }
}
</style>
