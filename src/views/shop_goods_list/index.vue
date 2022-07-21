<template>
  <div>
    <Drawer></Drawer>
    <el-tabs v-model="activeName.tab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.label"
        :name="item.name"
      >
        <el-card>
          <div class="search">
            <div style="display: flex">
              <p>
                关键词<el-input
                  size="small"
                  v-model="input"
                  placeholder="商品名称"
                  style="width: 200px"
                />
              </p>
              <p>
                商品分类
                <el-select
                  v-model="query"
                  class="m-2"
                  placeholder="请选择商品分类"
                  size="small"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :value="item.name"
                  />
                </el-select>
              </p>
            </div>
            <div class="btn">
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
              <el-button
                >收起 <el-icon class="el-icon--right"><Upload /></el-icon>
              </el-button>
            </div>
            <div class="right"></div>
          </div>
          <Table :data="goodsList" :cols="cols">
            <template #content="{ row }">
              <div class="content">
                <img
                  style="width: 50px; height: 50px; margin-top: 5px"
                  :src="row.cover"
                  alt=""
                />
                <div class="item">
                  <p style="padding: 0px">{{ row.title }}</p>
                  <span style="color: red">￥{{ row.min_price }} </span>
                  <span style="color: #dcdfe6; margin: 0 5px">|</span>
                  <span style="font-size: 10px">￥{{ row.min_oprice }} </span>
                  <p style="color: #9ca3af; font-size: 10px">
                    分类:{{
                      row.category && row.category.name ? row.category.name : ''
                    }}
                  </p>
                  <p style="color: #9ca3af; font-size: 10px">
                    创建时间：{{ row.create_time }}
                  </p>
                </div>
              </div>
            </template>
            <template v-slot:status="{ row }">
              <!-- {{ row }} -->
              <el-tag
                style="padding: 0 10px"
                class="ml-2"
                :type="row.status === 1 ? 'success' : 'danger'"
              >
                {{ row.status === 1 ? '仓库' : '上架' }}
              </el-tag>
            </template>
            <template #audit="{ row }">
              <span> {{ row.ischeck === 1 ? '通过' : '拒绝' }} </span>
            </template>
          </Table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import cols from './cols'
import Table from '../../components/Table.vue'
import Drawer from '../../components/Drawer.vue'
import { goodsListAPI } from '../../api/goods'
import { Upload } from '@element-plus/icons-vue'
const input = reactive('')
const query = reactive('')
const current = ref(1)
const goodsList = ref([])
const options = ref([])
const activeName = reactive({
  tab: 'all',
  title: '',
  cat_id: ''
})
const tabList = reactive([
  { label: '全部', name: 'all' },
  { label: '审核中', name: 'checking' },
  { label: '出售中', name: 'saling' },
  { label: '已下架', name: 'off' },
  { label: '库存预警', name: 'min_stock' },
  { label: '回收站', name: 'delete' }
])

const getGoodsList = async () => {
  const { list, totalCount, cates } = await goodsListAPI(
    current.value,
    activeName
  )
  goodsList.value = list
  console.log(list, totalCount, cates, 'res')
  options.value = cates
}
getGoodsList()
const handleClick = ({ props: { name } }) => {
  console.log(name)
  activeName.tab = name
  getGoodsList()
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.content {
  display: flex;
  .item {
    margin-left: 5px;
  }
  img {
    border-radius: 5px;
  }
}
.search {
  display: flex;
  justify-content: space-between;
  p{
    margin-left: 40px;
  }
  .btn {
    margin-right: 0px;
  }
}
</style>
